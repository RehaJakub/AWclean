<?php
// Zkopírovat jako config.php do adresáře o úroveň výš než webroot (NE do www/).
// Soubor obsahuje heslo k SMTP: necommitovat, práva 600 (nebo 640 dle hostingu).
return [
    'mail_to' => 'info@awclean.cz',
    'mail_from' => 'web@awclean.cz',          // existující schránka na vlastní doméně (SPF/DKIM)
    'mail_from_name' => 'Web AWCLEAN',
    'smtp' => [
        'host' => 'smtp.example.invalid',     // SMTP server hostingu
        'port' => 587,
        'secure' => 'tls',                    // 'tls' = STARTTLS (587), 'ssl' = SMTPS (465)
        'user' => 'web@awclean.cz',
        'pass' => 'ZMENIT',
    ],
    'allowed_origins' => ['https://www.awclean.cz', 'https://awclean.cz'],
    'success_url' => '/kontakt/?odeslano=1#kontakt',
    'secret' => 'ZMENIT-nahodny-retezec-64-znaku',   // php -r "echo bin2hex(random_bytes(32));"
    'client_ip_server_key' => 'REMOTE_ADDR',  // za reverzní proxy ověřit, že nejde o IP proxy
    'min_fill_seconds' => 3,
    'rate_window_seconds' => 600,
    'rate_max_per_ip' => 5,                   // 5 požadavků / 10 min / IP
    'rate_max_per_day' => 100,                // strop odeslaných e-mailů za 24 h (neúspěšné pokusy se nepočítají)
    'ratelimit_file' => __DIR__ . '/var/ratelimit.json',   // adresář var/ musí být zapisovatelný pro PHP
    'phpmailer_dir' => __DIR__ . '/vendor/phpmailer/phpmailer/src',
    'turnstile' => [
        'enabled' => false,
        'secret' => '',
    ],
];
