# Nasazení

## Statický web

`npm run build && npm run check:build`, pak nahrát celý `dist/` včetně skrytého `.htaccess`
do webrootu (Apache/LiteSpeed). `.htaccess` generuje build z `deploy/htaccess.template`
(komprese, cache, CSP a další hlavičky, kanonická doména www, 301 starých adres, 410 pro mytí oken).
Upravuje se jen šablona, nikdy `dist/` ani soubor na FTP.

Automaticky: `.github/workflows/deploy.yml` (push tagu `v*` nebo ruční spuštění; rollback = ruční
spuštění s předchozím tagem) volá `scripts/deploy.sh` (lftp, SFTP/FTPS). Potřebné proměnné a tajemství
v GitHub prostředí `production`: `VITE_CONTACT_ENDPOINT`, `DEPLOY_PROTOCOL`, `DEPLOY_PORT`, `DEPLOY_PATH`,
`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PASSWORD` nebo `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`.
`.github/workflows/ci.yml` kontroluje každý pull request (lint, testy, build, audit závislostí).

## Formulář poptávky

1. Na hosting nahrát `dist/contact.php` (je v buildu z `public/contact.php`).
2. O úroveň výš než webroot (nebo do `private/` s `deploy/private.htaccess`) dát `config.php`
   podle `deploy/config.example.php` (SMTP, cílový e-mail, tajný klíč) a nainstalovat PHPMailer:
   `composer install` s `deploy/composer.json`. Vytvořit zapisovatelný adresář `var/`.
3. Build spustit s `VITE_CONTACT_ENDPOINT=/contact.php`.
4. Ověřit odeslání skutečné poptávky a její doručení.

Bez endpointu formulář nic neodešle, ukáže chybu a odkaz na e-mail.

## Přechod ze starého hostingu (Smartweb)

Postup je v auditu (`ops-deploy.html#OPS-4`): předem připravit certifikát, zachovat MX/e-mail,
přepnout DNS, ověřit `curl -sI` přesměrování a 404. HSTS je na doméně už rok, web musí běžet na HTTPS
od první minuty.

## Google Analytics 4 (cookies)

1. V Google Analytics vytvořit službu (property) a datový stream pro web, zkopírovat měřicí ID `G-…`.
2. V GA: Správce → Nastavení dat → Uchovávání dat → **14 měsíců** (zásady ochrany údajů to uvádějí).
   Google signály a propojení s reklamou nechat vypnuté.
3. Build spustit s `VITE_GA_ID=G-…` (lokálně v `.env`, v GitHub prostředí `production` jako proměnná).
4. Po nasazení se návštěvníkovi zobrazí lišta „Můžeme měřit návštěvnost?“. GA se načte až po „Povolit“;
   po odvolání souhlasu se cookies `_ga*` smažou. Měří se i události `click_phone`, `click_email`,
   `click_inquiry` a `generate_lead` (odeslaná poptávka) – v GA je lze označit jako klíčové události.

Bez `VITE_GA_ID` web nic neměří, lišta se nezobrazí a texty o cookies to tak i uvádějí.

## Monitoring

`.github/workflows/monitor.yml` denně kontroluje certifikát, expiraci domén a klíčové stránky.
Zapne se proměnnou repozitáře `MONITOR_ENABLED=true` (po spuštění nového webu).
