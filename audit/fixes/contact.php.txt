<?php
// Endpoint kontaktního formuláře AWCLEAN (public/contact.php → dist/contact.php → webroot).
// config.php, PHPMailer a rate-limit soubor leží v private/ o úroveň výš, nebo v private/ ve webrootu
// chráněném vlastním .htaccess ("Require all denied").
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const PHONE_HINT = 'Zavolejte nám prosím na +420 773 196 097 nebo napište na info@awclean.cz.';
// Krátké názvy služeb = shortTitle ze src/data/pages/*.ts. Jiné hodnoty se tiše zahodí.
const SERVICES = [
    'Čištění fasád', 'Čištění střech', 'Čištění dlažeb', 'Čištění průmyslových objektů',
    'Čištění světlíků', 'Hliníkové fasády', 'Historické fasády', 'Čištění pomníků',
    'Nátěry střech a fasád (airless)', 'Impregnace fasád a střech', 'Nano impregnace',
    'Odstraňování dopravního značení',
];

$isJson = str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json');
$cfg = null;

/** Ukončí request: JSON pro fetch, jinak 303 na Kontakt nebo jednoduchá HTML stránka. */
function finish(int $status, array $errors = [], array $headers = []): never
{
    global $isJson, $cfg;
    foreach ($headers as $h) header($h);
    if ($isJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($status === 200 ? ['ok' => true] : ['ok' => false, 'errors' => $errors], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($status === 200) {
        header('Location: ' . $cfg['success_url'], true, 303);
        exit;
    }
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    $items = implode('', array_map(fn ($e) => '<li>' . htmlspecialchars($e, ENT_QUOTES, 'UTF-8') . '</li>', $errors));
    echo '<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex"><title>Poptávku se nepodařilo odeslat | AWCLEAN</title>'
        . '<body><h1>Poptávku se nepodařilo odeslat</h1><ul>' . $items . '</ul>'
        . '<p><a href="/kontakt/#kontakt">Zpět na formulář</a> nebo nám zavolejte na <a href="tel:+420773196097">+420 773 196 097</a>.</p></body></html>';
    exit;
}

/** Otevře rate-limit soubor se zámkem, předá data callbacku a uloží je. */
function withLimits(callable $fn): mixed
{
    global $cfg;
    $fh = fopen($cfg['ratelimit_file'], 'c+');
    if ($fh === false || !flock($fh, LOCK_EX)) finish(503, ['form' => 'Formulář je dočasně nedostupný. ' . PHONE_HINT]);
    $data = json_decode((string) stream_get_contents($fh), true);
    $data = ['ip' => (array) ($data['ip'] ?? []), 'sent' => (array) ($data['sent'] ?? [])];
    $result = $fn($data);
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($data));
    flock($fh, LOCK_UN);
    fclose($fh);
    return $result;
}

foreach ([__DIR__ . '/../private/config.php', __DIR__ . '/private/config.php'] as $path) {
    if (is_file($path)) {
        $cfg = require $path;
        break;
    }
}
if (!is_array($cfg)) {
    error_log('contact.php: config.php not found');
    finish(503, ['form' => 'Formulář je dočasně nedostupný. ' . PHONE_HINT]);
}
require $cfg['phpmailer_dir'] . '/Exception.php';
require $cfg['phpmailer_dir'] . '/PHPMailer.php';
require $cfg['phpmailer_dir'] . '/SMTP.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    finish(405, ['form' => 'Použijte prosím formulář na stránce Kontakt.'], ['Allow: POST']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $cfg['allowed_origins'], true)) {
    finish(403, ['form' => 'Požadavek nepochází z webu AWCLEAN.']);
}

$maxBytes = 16 * 1024;
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > $maxBytes) {
    finish(413, ['form' => 'Zpráva je příliš dlouhá.']);
}

if ($isJson) {
    $raw = (string) stream_get_contents(fopen('php://input', 'rb'), $maxBytes + 1);
    if (strlen($raw) > $maxBytes) finish(413, ['form' => 'Zpráva je příliš dlouhá.']);
    $input = json_decode($raw, true, 4);
    if (!is_array($input)) finish(400, ['form' => 'Neplatná data formuláře.']);
} elseif (str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/x-www-form-urlencoded')) {
    $input = $_POST; // klasický POST bez JavaScriptu
} else {
    finish(415, ['form' => 'Nepodporovaný formát dat.']);
}

$field = static fn (string $k): string => is_string($input[$k] ?? null) ? $input[$k] : '';
$values = [
    'name' => trim($field('name')),
    'phone' => trim($field('phone')),
    'email' => trim($field('email')),
    'message' => trim($field('message')),
];
$service = in_array($field('service'), SERVICES, true) ? $field('service') : '';
$sample = $field('sample') === '1';

// Honeypot: bot dostane stejnou odpověď jako člověk, e-mail se ale neodešle.
if ($field('website') !== '') finish(200);

// Doba vyplnění měřená v prohlížeči (fillMs = rozdíl dvou časů klienta) → posunuté hodiny nevadí.
// Bez JS (klasický POST) údaj chybí, tam chrání honeypot, limit a případně Turnstile.
$fillMs = $input['fillMs'] ?? null;
if ($isJson && (!is_int($fillMs) || $fillMs < $cfg['min_fill_seconds'] * 1000 || $fillMs > 86_400_000)) {
    finish(422, ['form' => 'Formulář byl odeslán příliš rychle. Počkejte prosím chvíli a odešlete ho znovu.']);
}

// Limit pokusů na IP (IP jen jako HMAC). Denní strop níže počítá jen skutečně odeslané e-maily.
// ponytail: jeden soubor s globálním zámkem, pro desítky poptávek denně stačí; při vyšším provozu Redis/DB.
$ip = (string) ($_SERVER[$cfg['client_ip_server_key']] ?? '');
$ipKey = substr(hash_hmac('sha256', $ip, $cfg['secret']), 0, 32);
$now = time();
[$ipLimited, $capReached] = withLimits(static function (array &$data) use ($ipKey, $now, $cfg): array {
    $data['ip'] = array_filter(array_map(
        static fn ($list) => array_values(array_filter((array) $list, static fn ($t) => $t > $now - $cfg['rate_window_seconds'])),
        $data['ip'],
    ));
    $data['sent'] = array_values(array_filter($data['sent'], static fn ($t) => $t > $now - 86400));
    $ipLimited = count($data['ip'][$ipKey] ?? []) >= $cfg['rate_max_per_ip'];
    if (!$ipLimited) $data['ip'][$ipKey][] = $now;
    return [$ipLimited, count($data['sent']) >= $cfg['rate_max_per_day']];
});
if ($ipLimited) {
    finish(429, ['form' => 'Odeslali jste příliš mnoho poptávek za krátkou dobu. Zkuste to prosím později nebo nám zavolejte.'], ['Retry-After: ' . $cfg['rate_window_seconds']]);
}

// Stejná pravidla jako src/lib/contact.ts validateContact + limity délek z formuláře.
$errors = [];
$len = static fn (string $s): int => mb_strlen($s, 'UTF-8');
if ($len($values['name']) < 2 || $len($values['name']) > 200)
    $errors['name'] = 'Vyplňte prosím jméno (alespoň 2 znaky).';
if (!preg_match('/^\+?[\d\s()-]+$/u', $values['phone']) || !preg_match('/^[0-9]{9,15}$/', preg_replace('/\D/', '', $values['phone'])) || $len($values['phone']) > 30)
    $errors['phone'] = 'Zadejte platný telefon, například +420 773 196 097.';
if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u', $values['email']) || $len($values['email']) > 200 || !PHPMailer::validateAddress($values['email']))
    $errors['email'] = 'Zadejte platnou e-mailovou adresu.';
if ($len($values['message']) < 10 || $len($values['message']) > 5000)
    $errors['message'] = 'Popište prosím svůj požadavek alespoň 10 znaky.';
foreach (['name', 'phone', 'email'] as $k) {
    // CR/LF a řídicí znaky v jednořádkových polích = pokus o header injection.
    if (preg_match('/[\x00-\x1F\x7F]/', $values[$k])) $errors[$k] = 'Pole obsahuje nepovolené znaky.';
}
if (!mb_check_encoding(implode('', $values), 'UTF-8')) $errors['form'] = 'Neplatné kódování textu.';
if ($errors) finish(422, $errors);

if ($capReached) {
    error_log('contact.php: daily cap reached');
    finish(503, ['form' => 'Poptávku teď nelze odeslat formulářem. ' . PHONE_HINT]);
}

if ($cfg['turnstile']['enabled']) {
    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $cfg['turnstile']['secret'],
            'response' => $field('cf-turnstile-response'),
            'remoteip' => $ip,
        ]),
    ]);
    $verdict = json_decode((string) curl_exec($ch), true);
    if (($verdict['success'] ?? false) !== true) finish(422, ['form' => 'Ověření, že nejste robot, se nezdařilo. Zkuste to prosím znovu.']);
}

$context = trim(($service !== '' ? " – $service" : '') . ($sample ? ' (ukázka zdarma)' : ''));
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $cfg['smtp']['host'];
    $mail->Port = $cfg['smtp']['port'];
    $mail->SMTPSecure = $cfg['smtp']['secure'];
    $mail->SMTPAutoTLS = $cfg['smtp']['secure'] !== '';
    $mail->SMTPAuth = $cfg['smtp']['user'] !== '';
    $mail->Username = $cfg['smtp']['user'];
    $mail->Password = $cfg['smtp']['pass'];
    $mail->Timeout = 10;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Encoding = PHPMailer::ENCODING_QUOTED_PRINTABLE;
    $mail->setFrom($cfg['mail_from'], $cfg['mail_from_name'], false);
    $mail->addAddress($cfg['mail_to']);
    $mail->addReplyTo($values['email'], $values['name']);
    $mail->Subject = 'Poptávka z webu: ' . $values['name'] . ($context !== '' ? ' ' . $context : '');
    $mail->isHTML(false);
    $mail->Body = "Nová poptávka z formuláře na www.awclean.cz\n\n"
        . ($service !== '' ? "Služba: $service\n" : '')
        . ($sample ? "Ukázka čištění zdarma: ano\n" : '')
        . "Jméno: {$values['name']}\nTelefon: {$values['phone']}\nE-mail: {$values['email']}\n\n"
        . "Zpráva:\n{$values['message']}\n\n"
        . '-- Odpovědí na tento e-mail odpovíte přímo zákazníkovi.';
    $mail->send();
} catch (MailException) {
    // Do logu jen technická chyba, žádné údaje z formuláře.
    error_log('contact.php: SMTP send failed: ' . $mail->ErrorInfo);
    finish(502, ['form' => 'Poptávku se nepodařilo odeslat. ' . PHONE_HINT]);
}
withLimits(static function (array &$data) use ($now): void {
    $data['sent'][] = $now;
});
finish(200);
