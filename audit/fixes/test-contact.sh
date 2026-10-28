#!/bin/sh
# Testy contact.php proti lokálnímu php:8.3-apache (kontejner aw-sec-php, 8095) + Mailpit (18025).
# Config v kontejneru: /var/www/private/config.php (kopie config.mailpit-test.php).
B=${B:-http://127.0.0.1:8095}; M=${M:-http://127.0.0.1:18025}; C=aw-sec-php
O="Origin: $B"; J="Content-Type: application/json"
req() { echo "### $1"; shift; curl -s -o /tmp/aw-body -w 'HTTP %{http_code}\n' -D /tmp/aw-hdr "$@"; grep -iE '^(location|retry-after|allow|content-type|cache-control):' /tmp/aw-hdr; head -c 300 /tmp/aw-body; echo; }
reset_rl() { docker exec $C sh -c 'echo "{}" > /var/www/private/var/ratelimit.json'; }
json() { echo "{\"name\":\"$1\",\"phone\":\"773196097\",\"email\":\"$2\",\"message\":\"Testovací zpráva dost dlouhá.\",\"fillMs\":${3:-5000}${4:+,$4}}"; }
curl -s -X DELETE $M/api/v1/messages >/dev/null; reset_rl
req "1 platný JSON request" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name":"Jan Novák","phone":"+420 773 196 097","email":"jan.novak@example.cz","message":"Prosím o nabídku čištění fasády rodinného domu v Ostravě.","website":"","fillMs":5000}'
req "2 header injection v e-mailu (CRLF + Bcc)" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Útočník 'a@example.cz\\r\\nBcc: obet@example.com')"
req "3 header injection ve jméně" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json 'Jan\\nBcc: obet@example.com' a@example.cz)"
req "4 honeypot vyplněný (předstírá úspěch, nic neodešle)" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Bot bot@example.cz 5000 '"website":"http://spam.example"')"
req "5 příliš rychlé odeslání (fillMs 500)" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Rychlík r@example.cz 500)"
req "5b posunuté hodiny klienta (fillMs 5000, startedAt o 2 h napřed – server ho ignoruje) → projde" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Posun posun@example.cz 5000 "\"startedAt\":$(( ($(date +%s) + 7200) * 1000 ))")"
req "5c fillMs nad 24 h" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Dlouho d@example.cz 90000000)"
req "5d fillMs jako desetinné číslo" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Float f@example.cz 5000.5)"
req "6 chybějící fillMs v JSON" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name":"Jan","phone":"773196097","email":"r@example.cz","message":"Zpráva dost dlouhá."}'
reset_rl
req "7 nevalidní JSON" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name": "Jan",'
req "8 ne-string hodnoty" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name":["x"],"phone":773196097,"email":{},"message":true,"fillMs":5000}'
head -c 20000 /dev/zero | tr '\0' 'a' > /tmp/aw-big
req "9 velké tělo (20 kB)" -X POST $B/contact.php -H "$O" -H "$J" --data-binary @/tmp/aw-big
req "10 GET" $B/contact.php
req "11 špatný Content-Type (text/plain)" -X POST $B/contact.php -H "$O" -H "Content-Type: text/plain" --data 'name=x'
req "12 cizí Origin" -X POST $B/contact.php -H "Origin: https://evil.example" -H "$J" --data "$(json 'Jan Novák' jan@example.cz)"
reset_rl
req "13 HTML/XSS v textu (projde jako prostý text)" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name":"<b>Jan</b> <img src=x onerror=alert(1)>","phone":"773196097","email":"xss@example.cz","message":"<script>alert(1)</script> <a href=\"http://evil.example\">klikni</a>","fillMs":5000}'
req "14 služba + ukázka zdarma (známá služba)" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json 'Eva Služba' sluzba@example.cz 5000 '"service":"Čištění fasád","sample":"1"')"
req "15 neznámá služba a vzorek=ano (tiše zahozeno)" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json 'Petr Neznámý' neznamy@example.cz 5000 '"service":"Hacking<script>","sample":"ano"')"
reset_rl
req "16 klasický POST bez JS → 303 (se službou)" -X POST $B/contact.php -H "$O" --data-urlencode "name=Marie Svobodová" --data-urlencode "phone=+420 603 000 000" --data-urlencode "email=marie@example.cz" --data-urlencode "message=Poptávka odeslaná bez JavaScriptu, čištění střechy." --data-urlencode "website=" --data-urlencode "service=Čištění střech" --data-urlencode "sample=1"
req "17 klasický POST bez JS s chybou → HTML 422" -X POST $B/contact.php -H "$O" --data-urlencode "name=M" --data-urlencode "phone=12" --data-urlencode "email=x" --data-urlencode "message=krátce"
req "18 JSON 422 (telefon, zpráva)" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name":"Jan","phone":"123","email":"jan@example.cz","message":"krátce","fillMs":5000}'
echo "### 19 limit na IP (reset, 7× platný request)"; reset_rl
for i in 1 2 3 4 5 6 7; do curl -s -o /dev/null -w "$i: %{http_code}\n" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json "Limit $i" limit$i@example.cz)"; done
echo "### rate-limit soubor (HMAC IP + časy, sent = odeslané e-maily)"; docker exec $C cat /var/www/private/var/ratelimit.json | head -c 400; echo
echo "### 20 denní strop: rate_max_per_day=2, rate_max_per_ip=100; 10× 422, pak 3× platný"
docker exec $C sh -c "cp /var/www/private/config.php /tmp/config.bak && sed -i \"s/'rate_max_per_day' => [0-9]*/'rate_max_per_day' => 2/; s/'rate_max_per_ip' => [0-9]*/'rate_max_per_ip' => 100/\" /var/www/private/config.php && echo '{}' > /var/www/private/var/ratelimit.json && sleep 3"  # opcache revaliduje soubory po 2 s
for i in 1 2 3 4 5 6 7 8 9 10; do curl -s -o /dev/null -w "422-pokus $i: %{http_code}\n" -X POST $B/contact.php -H "$O" -H "$J" --data '{"name":"J","phone":"1","email":"x","message":"x","fillMs":5000}'; done
for i in 1 2 3; do req "platný po 422 č. $i" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json "Strop $i" strop$i@example.cz)"; done
docker exec $C sh -c 'cp /tmp/config.bak /var/www/private/config.php && sleep 3'; reset_rl
echo "### strop v logu"; docker logs $C 2>&1 | grep -c 'daily cap reached'
echo "### 21 config/private/vendor přes web"; for p in /../private/config.php /private/config.php /config.php /vendor/ /composer.json; do curl -s -o /dev/null -w "$p %{http_code}\n" --path-as-is $B$p; done
echo "### 22 chybějící config.php → 503"
docker exec $C sh -c 'mv /var/www/private/config.php /tmp/config.moved'
req "bez configu" -X POST $B/contact.php -H "$O" -H "$J" --data "$(json Bez bez@example.cz)"
docker exec $C sh -c 'mv /tmp/config.moved /var/www/private/config.php'
echo "### Apache/PHP log (žádné osobní údaje, jen technické hlášky)"; docker logs $C 2>&1 | grep -E "contact.php" | grep -vE '"(POST|GET) ' | head -5; docker logs $C 2>&1 | grep -ciE "novák|example\.cz|773196097"
reset_rl
