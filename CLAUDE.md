# AWCLEAN – kontext projektu

Ověřeno čtením zdrojů 15. 10. 2026, aktualizováno po redesignu 16. 10. 2026. Tento soubor je stručný pracovní přehled;
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
Reference mají 3 karty detailů, 156 fotek (25 původních + 131 z galerií služeb
v `referenceExtras.ts`, bez tmavých/duplicitních záběrů), filtry `?typ=...`, lightbox a vyhledávání firem.
Ochrana údajů má obsah vlevo (sticky) a text vpravo.
Čisté fasády: původní článek + vyhledávání v FAQ DR Fasády; plovoucí maskot se tam nezobrazuje.

DR Fasáda je pevný průvodce, ne AI: objekt → povrch → problém → služba.
FAQ má 9 odpovědí, kategorie a vyhledávání bez diakritiky. Maskot je vpravo,
šipkou se zasouvá a vrací, ale při každém načtení stránky je vždy vidět
(nic se neukládá, bez automatického schování při scrollu). Dialog má Escape, návrat fokusu a focus trap.
Preference souhlasu se ukládají do localStorage `awclean-consent-v1` na 180 dní.
Žádná analytika ani reklamní skripty nejsou připojené; přepínače je nespouštějí.
Primární modrá tlačítek je #0a74b0 (návrhová #0b8fd6 nesplňuje kontrast AA).

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

## Stav ověření 16. 10. 2026 (po redesignu)

- `tsc --noEmit`: bez chyb.
- Aktuální src: 53 testů v 5 souborech prošlo příkazem
  `npm test -- --no-cache --configLoader runner --exclude 'backups/**'`.
- Bez explicitního vyloučení se lokálně spouštějí i testy odmítnuté kopie
  v backups (106 testů/10 souborů). Doporučení: omezit test discovery na src.
- `npm run build` a `npm run check:build`: všech 23 adres prošlo.
  verify-build kontroluje na homepage existenci `#pred-a-po` a `#sluzby`.
- Stránky vyfoceny v Brave (1440 a 390 px) skriptem taste skillu; nebyl proveden
  úplný audit prohlížečů, WCAG, výkonu ani bezpečnosti závislostí.
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
takže při hydrataci starého buildu v novém roce hrozí nesoulad.
CSS má ~7270 řádků v 7 souborech; starší vrstvy obsahují pravidla pro smazané
komponenty (cinema-hero, trust, process, stats…), která čekají na vyčištění.
`audiences.ts` používá už jen guide.test.ts. Public má ~198 MiB včetně
historických assetů. Hlavní JS má ~453 kB bez komprese.

## Konvence a práce s Gitem

Zachovat logo, kontakty, skutečné fotografie, adresy a React + TS strict.
Fakta pouze z projektu/awclean.cz; nevymýšlet recenze, ceny, místa ani garance.
Slovenský správce údajů (IČO 50823272, Topoľčany) je výslovná volba uživatele;
česká kontaktní adresa je Chotětov. Bez zadání neměnit.
main je schválený stav; výchozí stav je tag stable-before-taste-2026-10-15.
Změny do feature/* nebo fix/*, do main jen přes PR; kontrolovat git status, commitovat jen vlastní změny.
Autor i committer je jen Jakub Řeha <jakubos.reha@gmail.com>; žádné Co-Authored-By ani
atribuce Claude/Codex. Commit zprávy ve formátu feat:/fix:/style:/refactor:/docs:/chore:/build:/test:.
Nezavádět nový design bez zadání. Taste skill (`.claude/skills/`, design-taste-frontend
a redesign-existing-projects) je hodnotitel, ne zákon: stock fotky a vymyšlená videa
jsou zakázané. Nevytvářet další ZIP/TAR zálohy,
nemazat historické backups, nepoužívat reset --hard/clean/force push bez výslovného pokynu.
