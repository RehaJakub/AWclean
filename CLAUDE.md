# AWCLEAN – kontext projektu

Ověřeno čtením zdrojů 15. 10. 2026, aktualizováno po redesignu 16. 10. 2026. Tento soubor je stručný pracovní přehled;
aktuální kód má přednost před historickými poznámkami v docs/history/.
Pravidla práce jsou v `AGENTS.md`.

## Účel a stack

Česká firemní prezentace AWCLEAN pro čištění a ošetřování povrchů v ČR/SR.
Cílem je ukázat služby a skutečné výsledky a získat telefonickou/e-mailovou poptávku.
23 kanonických adres: 8 obecných stránek, 12 služeb a 3 detaily realizací.

Požadavky v package.json: React/React DOM ^19.0.0, TypeScript ~5.7.3,
Vite ^6.2.0, Tailwind a @tailwindcss/vite ^4.1.0, Lucide ^0.468.0,
lokální Inter Variable ^5.3.0, @vitejs/plugin-react ^4.4.0, Sharp ^0.35.5,
Vitest ^5.0.3. Lockfile nyní obsahuje React 19.3.0, Vite 6.4.4 a Tailwind 4.3.3.
TypeScript strict, noUnusedLocals/noUnusedParameters. Bez zdrojových .js a any.
Ověřeno s Node 24.18.1; README uvádí Node 22.18+.

## Struktura a tok dat

- `src/main.tsx`: importy fontu/CSS, klientské aliasy, createRoot/hydrateRoot.
- `src/App.tsx`: vlastní resolver tras, společné Navbar/Footer, SEO, lazy MascotWidget.
- `src/entry-server.tsx`: renderToString pro předvykreslení při buildu.
- `src/lib/routes.ts`: centrální trasy a 5 aliasů; nejde o React Router.
  Navigace používá běžné odkazy a načtení dalšího HTML dokumentu.
- `src/pages/`: Home, Service, Services, References, Project, Contact, Press,
  Privacy, CleanFacades (poradenství), NotFound.
- `src/data/pages/`: 12 typovaných služeb; sdílená šablona ServicePage.
- `src/data/services.ts`: odvozené menu, kategorie, katalog a footer.
  Kategorie cisteni/natery/ostatni mají 8/1/3 služeb. Nátěry mají dva odkazy na kotvy.
- `src/data/`: fotografie, srcset manifest, realizace, kontakty, SEO, FAQ,
  průvodce, skupiny zákazníků, CTA a `serviceVisuals.ts` (fotky bloků služeb,
  náhledy menu, výběr FAQ ke službě). Obsah je lokální TypeScript, nikoli databáze.
- `src/components/`: Navbar (mega menu), Footer, Hero (před/po), Gallery,
  ContactForm, ConsentManager, MascotWidget + ServiceGuide (DR Fasáda);
  `home/HomeSections.tsx` sekce homepage, `layout/` drobečky, `services/` CTA banner.
- `src/hooks/`: useInView (Section) a useWidgetVisibility (maskot).
- CSS se načítá v pořadí styles → home → refinements → conversion → upgrade
  → redesign; `redesign.css` je aktuální vzhled (třídy `rd-*`, `svc-*`, `home-*`)
  a přebíjí starší vrstvy. MascotWidget má vlastní lazy CSS.
- `public/images/`: originály projects, optimalizované realizace,
  fasady-nove, vozy, press, responsive, logo a favicony.
- `public/mascot/dr-fasada.png`: hotový maskot; neobnovovat jej generováním.
- `public/documents/osvedceni-awclean.pdf`: zachovaný historický soubor bez odkazu v UI.
- `scripts/`: generate-images, generate-favicon, verify-build, check-gps, strip-gps, deploy.sh.
- `deploy/`: šablona .htaccess, config.example.php a composer.json pro contact.php.
- `docs/`: ARCHITECTURE, DEPLOY, CONTENT, history/.
- `dist/`: generovaný statický web, ignorovaný Gitem.
- README, CONTENT-NOTES, ASSETS: návody, podklady a chybějící obsah; aktuální v README a docs/.
- `backups/`, SOURCE.md a awclean-redesign.zip jsou historické/ignorované, ne aktuální zdroj.

## Adresy

Obecné: `/`, `/sluzby/`, `/ostatni-sluzby/`, `/reference/`, `/kontakt/`,
`/psali-o-nas/`, `/privacy-policy/`, `/ciste-fasady/`.

Služby: `/cisteni-fasad/`, `/cisteni-strech/`, `/cisteni-dlazeb/`,
`/cisteni-prumyslovych-objektu/`, `/cisteni-svetliku/`,
`/cisteni-hlinikovych-fasad/`, `/cisteni-historickych-fasad/`,
`/ostatni-sluzby/cisteni-pomniku/`, `/natery-strech-a-fasad/`,
`/impregnace-fasad-a-strech/`, `/ostatni-sluzby/nano-impregnace/`,
`/ostatni-sluzby/odstranovani-dopravniho-znaceni/`.

Realizace pod `/reference/`: `fasada-v-puvodnich-barvach/`,
`novy-vzhled-bytoveho-domu/`, `cistota-az-do-posledniho-metru/`.
Neznámé adresy mají NotFound; build generuje 404.html s noindex.
Původní nátěry, graffiti, historické fasády a ochrana údajů mají aliasy v routes.ts.

## Chování

Vzhled vychází z návrhu Claude Design (16. 10. 2026, větev
`feature/redesign-claude-design`). Z návrhu se přebírá vzhled a výběr skutečných
fotek; texty zůstávají ze stávajících dat ověřených proti awclean.cz.

Home: Hero → Co vyčistíme (8 služeb + 4 další) → Rozdíl je vidět (3 realizace)
→ O nás (fotka dodávek, fakta z awclean.cz) → Ukázka čištění zdarma (DR Fasáda)
→ Reference (+ Dům a Byt) → ContactForm. Fotka dodávek je i u formuláře na Kontaktu. Hero je posuvné porovnání cihlové fasády před/po (myš, dotyk,
šipky přes skrytý range input). Slideshow ani video na homepage nejsou.
„Rozdíl je vidět“ používá jen fotky z dat dané realizace (projects.ts).
Plovoucí tlačítko vlevo dole „Nezávazná poptávka“ vede na `#kontakt`
(homepage/kontakt) nebo `/kontakt/#kontakt`; skryje se, když je formulář vidět.
Navigace: mega menu Čištění (8 služeb s náhledy), menší nabídky Nátěry
a Ostatní služby, na desktopu hover i klik/klávesnice, mobilní menu s rozbalením.
Šablona služby: úvod s fotkou → bloky s fotkami → Realizace (4 + rozbalení,
lightbox) → Časté otázky → CTA banner → Související služby.
Reference mají 3 karty detailů, 154 fotek (25 původních + 129 z galerií služeb
v `referenceExtras.ts`, bez tmavých/duplicitních záběrů), filtry `?typ=...`, lightbox a vyhledávání firem.
Ochrana údajů má obsah vlevo (sticky) a text vpravo.
Čisté fasády: původní článek + vyhledávání v FAQ DR Fasády; plovoucí maskot se tam nezobrazuje.

DR Fasáda je pevný průvodce, ne AI: objekt → povrch → problém → služba.
FAQ má 9 odpovědí, kategorie a vyhledávání bez diakritiky; „Doktor radí:“ přidává jen maskot.
Výsledek průvodce má kroky „Co bude dál?“, Zavolat a Napsat přes formulář. Maskot je vpravo,
šipkou se zasouvá a vrací, při načtení je vidět (nic se neukládá). Sám se zasune nad formulářem,
patičkou, sekcí ukázky zdarma, když je pod ním fokus, a na nízkém viewportu (≤ 560 px výšky)
přijede zasunutý. Dialog má Escape, návrat fokusu a focus trap.
Preference souhlasu se ukládají do localStorage `awclean-consent-v1` na 180 dní.
Google Analytics 4 (`src/lib/analytics.ts`) se zapíná proměnnou `VITE_GA_ID`: pak se při první návštěvě
zobrazí lišta souhlasu (Odmítnout / Nastavení / Povolit) a GA se načte jen po souhlasu s analytikou;
odvolání smaže cookies `_ga*`. Události: click_phone, click_email, click_inquiry, generate_lead.
Bez `VITE_GA_ID` se nic neměří ani nezobrazuje. Reklamní skripty nejsou; volitelný skript jen přes `hasConsent()`.
Primární modrá tlačítek je #0a74b0 (návrhová #0b8fd6 nesplňuje kontrast AA).

## Formulář a integrace

Aplikační env proměnné: `VITE_CONTACT_ENDPOINT` a `VITE_GA_ID` (viz .env.example).
Při auditu nebyl přítomen žádný místní .env kromě .env.example s prázdnou hodnotou.
Nastavit před buildem; VITE_* jsou veřejné a nesmí obsahovat tajné klíče.
Formulář má klientskou validaci name/phone/email/message, české chyby,
odesílání/úspěch/chybu, blokování opakovaného odeslání a 15s timeout.
POST JSON jde z prohlížeče na endpoint (s honeypotem `website`, `fillMs`, `service`, `sample`
z URL ?sluzba=&vzorek=1); jakákoli 2xx odpověď znamená úspěch. Formulář má method=post/action,
takže ani bez JS nejdou údaje do URL. Po odeslání jde fokus na stavovou zprávu.
Bez endpointu zobrazí chybu a mailto fallback, ne falešný úspěch.
Data formuláře jsou pouze ve stavu komponenty, lokálně se trvale neukládají.

Backend: `public/contact.php` (PHPMailer, validace, honeypot, limity na IP a den, volitelně Turnstile),
konfigurace podle `deploy/config.example.php` mimo webroot; postup v docs/DEPLOY.md.
Endpoint ani SMTP zatím nejsou nasazené. Databáze, CMS/admin, účty, platby ani CRM nejsou.
Facebook/YouTube jsou pouze odkazy.

## Příkazy a nasazení

```sh
npm ci
npm run dev             # localhost:5173, pouze 127.0.0.1
npm test                # jen src/**/*.test.ts(x)
npm run lint            # ESLint
npm run build           # tsc --noEmit + Vite + statické HTML + og obrázky
npm run check:build     # čte již vytvořený dist (+ kontrola GPS v obrázcích)
npm run preview
npm run images          # nové varianty + manifest, maže nepoužívané varianty
npm run strip:gps       # bezeztrátově odstraní EXIF/GPS z public/
```

Build generuje HTML všech tras, aliasy, 404, sitemap (s fotkami referencí), `_redirects`,
obrázky pro sdílení 1200×630 a `.htaccess` ze šablony `deploy/htaccess.template` (CSP, cache, 301, 410 mytí oken).
Nasazuje se celý dist včetně skrytého .htaccess na vhodný statický hosting/Apache.
Pro jiný server je nutné nastavit odpovídající indexy, 301 a 404.
SEO doména je pevně https://www.awclean.cz (canonical, OG, Twitter, sitemap, JSON-LD).
CI: `.github/workflows/ci.yml`; nasazení `deploy.yml` + `scripts/deploy.sh` (tag v*, lftp);
monitoring `monitor.yml` (zapnout proměnnou MONITOR_ENABLED). Hosting zatím není vybraný.
GitHub remote: https://github.com/RehaJakub/AWclean.git.

## Stav ověření 28. 10. 2026 (po opravách z auditu)

Audit 27. 10. 2026 je v `audit/` (checklist `audit/audit-tasks.md`, navržené opravy v `audit/fixes/`).

- `tsc --noEmit`, `npm run lint`: bez chyb.
- `npm test`: 56 testů v 5 souborech (vite.config omezuje testy na src).
- `npm run build` a `npm run check:build`: všech 23 adres prošlo.
  verify-build kontroluje na homepage existenci `#pred-a-po` a `#sluzby`.
- Stránky vyfoceny v Brave (1440 a 390 px) skriptem taste skillu; nebyl proveden
  úplný audit prohlížečů, WCAG, výkonu ani bezpečnosti závislostí.
- V prohledaných aplikačních zdrojích nebyly nalezeny běžné signatury tajných klíčů.
  Nejde o záruku bezpečnosti ani audit externího serveru.

Před produkcí: připojit a ověřit doručení formuláře; potvrdit obsahové údaje
a podmínky záruk; ověřit ostrý hosting, HTTPS, redirecty/404 a reálný mobil.
FAQ TODO: délka čištění, ochrana zeleně/přípravky, podmínky záruk 5/10/20 let, ceník.
Na homepage je záruka „až 20 let – podmínky v nabídce“, dokud firma nedodá podmínky.
Chybí vlastní fotky dopravního značení (gallery prázdná, source prázdný,
ilustrační foto), dokumentace nano impregnace, ověřené detaily zakázek a některé
originály ve vyšším rozlišení. Viz CONTENT-NOTES.md.

Další dluh: CSS má ~7270 řádků v 7 souborech; starší vrstvy obsahují pravidla pro smazané
komponenty, dvě sady tokenů/tlačítek (UX-10) a písmo jen v px (VIS-6). Bez AVIF (PERF-8).
Public má ~130 MiB; nepoužité originály jsou v `assets-source/` (mimo build).
Historické README a UPGRADE-NOTES jsou v `docs/history/`. Hlavní JS má ~453 kB bez komprese.
Texty v src/data používají nezlomitelné mezery (U+00A0) za jednopísmennými předložkami.

## Konvence a práce s Gitem

Zachovat logo, kontakty, skutečné fotografie, adresy a React + TS strict.
Fakta pouze z projektu/awclean.cz; nevymýšlet recenze, ceny, místa ani garance.
Slovenský správce údajů (IČO 50823272, Topoľčany) je výslovná volba uživatele;
česká kontaktní adresa je Chotětov. Bez zadání neměnit.
main je schválený stav; výchozí commit 9a0a330, tag stable-before-taste-2026-10-15.
Změny do feature/* nebo fix/*, kontrolovat git status, commitovat jen vlastní změny.
Nezavádět nový design bez zadání. Taste skill (`.claude/skills/`, design-taste-frontend
a redesign-existing-projects) je hodnotitel, ne zákon: stock fotky a vymyšlená videa
jsou zakázané. Nevytvářet další ZIP/TAR zálohy,
nemazat historické backups, nepoužívat reset --hard/clean/force push bez výslovného pokynu.
