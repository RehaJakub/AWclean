#!/bin/sh
# Nasazení dist/ na sdílený hosting přes lftp (SFTP, záložně FTPS) ve 4 krocích,
# aby web během nahrávání nikdy neodkazoval na soubor, který ještě/už neexistuje:
#   1. assets/  – hashované JS/CSS/fonty, jen přidat (staré zůstávají pro otevřené záložky)
#   2. ostatní statické soubory (obrázky, maskot, PDF, favicony) – jen přidat
#   3. HTML, .htaccess, sitemap, robots – vždy všechny (--transfer-all: stejná velikost i čas neznamená
#      stejný obsah, hash v názvu assetu má pevnou délku), každý do dočasného souboru a přejmenovat
#   4. smazat zastaralé soubory mimo assets/ a mimo chráněné cesty (private/, vendor/…; contact.php je v dist z public/)
# Proměnné: DEPLOY_PROTOCOL=sftp|ftps, DEPLOY_HOST, DEPLOY_PORT, DEPLOY_USER, LFTP_PASSWORD,
#   DEPLOY_PATH (např. /www, /public_html, domains/awclean.cz/public_html),
#   volitelně DEPLOY_KEY_FILE (SFTP klíč), DEPLOY_KNOWN_HOSTS (soubor), PRUNE_ASSETS=1, DIST=dist
set -eu
DIST=${DIST:-dist}
: "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}" "${DEPLOY_PATH:?}"
PROTO=${DEPLOY_PROTOCOL:-sftp}
if [ ! -f "$DIST/index.html" ] || [ ! -f "$DIST/.htaccess" ]; then echo "Chybí $DIST/index.html nebo .htaccess" >&2; exit 1; fi

# Soubory na serveru, které deploy nikdy nesmaže ani nepřepíše (backend formuláře, hosting, ACME).
PROTECT="-x ^contact-config\.php$ -x ^vendor/ -x ^private/ -x ^\.well-known/ -x ^\.user\.ini$ -x ^cgi-bin/ -x ^domains/ -x ^subdom/ -x ^logs?/ -x ^stats/"
M="mirror --reverse --no-perms --parallel=4 --verbose=1"

if [ "$PROTO" = sftp ]; then
  SSH="ssh -a -x -o StrictHostKeyChecking=yes -o UserKnownHostsFile=${DEPLOY_KNOWN_HOSTS:-$HOME/.ssh/known_hosts}"
  if [ -n "${DEPLOY_KEY_FILE:-}" ]; then SSH="$SSH -i $DEPLOY_KEY_FILE"; fi
  SETUP="set sftp:connect-program \"$SSH\"; set net:max-retries 3; set net:timeout 30"
  URL="sftp://$DEPLOY_HOST:${DEPLOY_PORT:-22}"
else
  # FTPS (explicit TLS). Certifikát sdíleného hostingu bývá na jméno serveru, ne domény – DEPLOY_HOST = jméno serveru.
  SETUP="set ftp:ssl-force true; set ftp:ssl-protect-data true; set ssl:verify-certificate true; set ftp:passive-mode true; set ftp:list-options -a; set net:max-retries 3; set net:timeout 30"
  URL="ftp://$DEPLOY_HOST:${DEPLOY_PORT:-21}"
fi
# Prázdné heslo je u přihlášení klíčem v pořádku; --env-password čte LFTP_PASSWORD, heslo není v argv.
export LFTP_PASSWORD="${LFTP_PASSWORD:-}"

PRUNE_ASSETS_CMD=""
if [ "${PRUNE_ASSETS:-0}" = 1 ]; then PRUNE_ASSETS_CMD="$M --delete --ignore-time $DIST/assets assets"; fi

lftp -c "
$SETUP
set xfer:use-temp-file yes
set xfer:temp-file-name .in.*
open --env-password -u $DEPLOY_USER $URL
mkdir -pf $DEPLOY_PATH
cd $DEPLOY_PATH
echo '== 1/4 assets'
$M --ignore-time $DIST/assets assets
echo '== 2/4 statické soubory'
$M --ignore-time -x ^assets/ -x \.html$ -x ^\.htaccess$ -x ^sitemap\.xml$ -x ^robots\.txt$ $PROTECT $DIST .
echo '== 3/4 HTML a konfigurace'
$M --transfer-all -i \.html$ -i ^\.htaccess$ -i ^sitemap\.xml$ -i ^robots\.txt$ -x ^assets/ $PROTECT $DIST .
echo '== 4/4 úklid'
$M --delete --ignore-time -x ^assets/ -x '(^|/)\.in\.' $PROTECT $DIST .
$PRUNE_ASSETS_CMD
"
echo "Nasazeno: $DIST → $DEPLOY_HOST:$DEPLOY_PATH"
