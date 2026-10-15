# AWCLEAN – kontext projektu

Ověřeno čtením zdrojů 15. 10. 2026. Tento soubor je stručný pracovní přehled;
aktuální kód má přednost před historickými poznámkami v README/UPGRADE-NOTES.
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
  průvodce, skupiny zákazníků a CTA. Obsah je lokální TypeScript, nikoli databáze.
- `src/components/`: prezentační sekce, galerie, před/po, formulář, navigace,
  souhlas a DR Fasáda; `layout/` drobečky/úvody, `services/` společné CTA.
- `src/hooks/`: viditelnost, animace, carousel, omezení pohybu, čítače,
  aktualizace let zkušeností a chování maskota.
- CSS se načítá v pořadí styles → home → refinements → conversion → upgrade;
  MascotWidget má vlastní lazy CSS. Tokeny jsou v tailwind.config.ts.
- `public/images/`: originály projects, optimalizované realizace,
  fasady-nove, vozy, press, responsive, logo a favicony.
- `public/mascot/dr-fasada.png`: hotový maskot; neobnovovat jej generováním.
- `public/documents/osvedceni-awclean.pdf`: zachovaný historický soubor bez odkazu v UI.
- `scripts/`: generate-images, generate-favicon, verify-build (vše TypeScript).
- `dist/`: generovaný statický web, ignorovaný Gitem.
- README, CONTENT-NOTES, ASSETS, UPGRADE-NOTES: návody, podklady a chybějící obsah.
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

Home: Hero → TrustBar → BeforeAfterSlider → ServiceGrid (včetně AudienceNavigator)
→ About → WhyUs → Process → Press → ContactForm.
Hero střídá 3 snímky po **5000 ms**; zastaví se mimo viewport, při fokusu,
skryté kartě, ruční pauze a reduced motion. Není zde video.
Reference mají 25 položek, filtry `?typ=...`, lightbox a vyhledávání firem.
Před/po má 3 porovnání, pointer/klávesnici a alternativu dvou snímků.

DR Fasáda je pevný průvodce, ne AI: objekt → povrch → problém → služba.
FAQ má 9 odpovědí, kategorie a vyhledávání bez diakritiky. Maskot je vpravo,
šipkou se zasouvá a vrací; stav seen/hidden ukládá sessionStorage
`awclean-mascot-v1`. Dialog má Escape, návrat fokusu a focus trap.
Preference souhlasu se ukládají do localStorage `awclean-consent-v1` na 180 dní.
Žádná analytika ani reklamní skripty nejsou připojené; přepínače je nespouštějí.
Počet zkušeností je aktuální rok minus 2001, aktualizovaný hookem i bez nového buildu.

## Formulář a integrace

Jediná aplikační env proměnná: `VITE_CONTACT_ENDPOINT` (viz .env.example).
Při auditu nebyl přítomen žádný místní .env kromě .env.example s prázdnou hodnotou.
Nastavit před buildem; VITE_* jsou veřejné a nesmí obsahovat tajné klíče.
Formulář má klientskou validaci name/phone/email/message, české chyby,
odesílání/úspěch/chybu, blokování opakovaného odeslání a 15s timeout.
POST JSON jde přímo z prohlížeče na endpoint; jakákoli 2xx odpověď znamená úspěch.
Bez endpointu zobrazí chybu a mailto fallback, ne falešný úspěch.
Data formuláře jsou pouze ve stavu komponenty, lokálně se trvale neukládají.
URL parametry sluzba/vzorek se nyní do odesílaného payloadu nepřenášejí.

Backend, e-mailový provider, databáze, Supabase, CMS/admin, účty, autentizace,
rezervace, platby ani CRM v projektu nejsou. Facebook/YouTube jsou pouze odkazy.
Backend musí teprve zajistit serverovou validaci, ochranu proti spamu a doručení.

## Příkazy a nasazení

```sh
npm ci
npm run dev             # localhost:5173, pouze 127.0.0.1
npm test
npm run build           # tsc --noEmit + Vite + statické HTML
npm run check:build     # čte již vytvořený dist
npm run preview
npm run images          # POZOR: zapisuje varianty a src/data/imageVariants.ts
```

Build generuje HTML všech tras, aliasy, 404, sitemap, `_redirects` a `.htaccess`.
Nasazuje se celý dist včetně skrytého .htaccess na vhodný statický hosting/Apache.
Pro jiný server je nutné nastavit odpovídající indexy, 301 a 404.
SEO doména je pevně https://www.awclean.cz (canonical, OG, Twitter, sitemap, JSON-LD).
Konfigurace konkrétního hostingu ani CI/CD workflow v repozitáři nejsou.
GitHub remote: https://github.com/RehaJakub/AWclean.git.

## Stav auditu 15. 10. 2026

- `tsc --noEmit`: bez chyb.
- Aktuální src: 53 testů v 5 souborech prošlo příkazem
  `npm test -- --no-cache --configLoader runner --exclude 'backups/**'`.
- Bez explicitního vyloučení se lokálně spouštějí i testy odmítnuté kopie
  v backups (106 testů/10 souborů). Doporučení: omezit test discovery na src.
- `npm run check:build`: existující sestavení všech 23 adres prošlo.
  Nový build nebyl při tomto auditu spuštěn, aby se nepřepsal dist.
- Nebyl proveden nový úplný audit prohlížečů, WCAG, výkonu ani bezpečnosti závislostí.
- V prohledaných aplikačních zdrojích nebyly nalezeny běžné signatury tajných klíčů.
  Nejde o záruku bezpečnosti ani audit externího serveru.

Před produkcí: připojit a ověřit doručení formuláře; potvrdit obsahové údaje
a podmínky záruk; ověřit ostrý hosting, HTTPS, redirecty/404 a reálný mobil.
FAQ TODO: délka čištění, ochrana zeleně/přípravky, podmínky záruk 5/10/20 let, ceník.
Chybí vlastní fotky dopravního značení (gallery prázdná, source prázdný,
ilustrační foto), dokumentace nano impregnace, ověřené detaily zakázek a některé
originály ve vyšším rozlišení. Viz CONTENT-NOTES.md.

Další dluh: historické README obsahuje zastaralé údaje (2,5 s, 18 fotek,
47 testů, wave varianta); index.html obsahuje starých 24+ let, produkční metadata
se při buildu přepisují. Footer a období referencí používají přímo Date,
takže při hydrataci starého buildu v novém roce hrozí nesoulad (na rozdíl od hooku let).
Více vrstev CSS (~6169 řádků včetně maskota), nepoužívané Stats, References,
SampleBanner a useParallax. Public má ~198 MiB včetně historických assetů;
nejde o objem stažený při jedné návštěvě. Hlavní existující JS má ~465 kB bez komprese.

## Konvence a práce s Gitem

Zachovat logo, kontakty, skutečné fotografie, adresy a React + TS strict.
Fakta pouze z projektu/awclean.cz; nevymýšlet recenze, ceny, místa ani garance.
Slovenský správce údajů (IČO 50823272, Topoľčany) je výslovná volba uživatele;
česká kontaktní adresa je Chotětov. Bez zadání neměnit.
main je schválený stav; výchozí commit 9a0a330, tag stable-before-taste-2026-10-15.
Změny do feature/* nebo fix/*, kontrolovat git status, commitovat jen vlastní změny.
Nezavádět nový design bez zadání. Nevytvářet další ZIP/TAR zálohy,
nemazat historické backups, nepoužívat reset --hard/clean/force push bez výslovného pokynu.
