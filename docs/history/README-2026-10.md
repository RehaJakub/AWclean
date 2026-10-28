# AWCLEAN – redesign webu

Vícestránkový web v Reactu, TypeScriptu (strict), Vite a Tailwind CSS 4. Obsahuje 23 samostatných adres a 12 služeb. Logo, kontakty a identita AWCLEAN zůstávají zachované. Obsahové odkazy vedou na aktuální doménu, při vývoji na localhost.

## Spuštění

Node.js 22.18+; ověřeno na Node.js 24.18.1.

```bash
npm install
npm run dev
npm run build
npm run preview
npm test
npm run check:build
```

Vývoj: **http://localhost:5173/**. Je-li server již spuštěný, není nutné spouštět druhý. Build kontroluje TypeScript a vytvoří `dist/`. Kontrola buildu se spouští po sestavení.

## DR Fasáda – FAQ pomocník

`src/components/MascotWidget.tsx` se načítá přes React.lazy až na klientovi, s vlastní oddělenou CSS/JS částí. Za 3 s se objeví celá figurka u pravého spodního okraje (dle následného upřesnění uživatele), bublina zmizí po dalších 6 s. Na desktopu reaguje na hover, na dotyk kliknutím otevírá FAQ. Při omezeném pohybu je statický.

Panel obsahuje 9 typovaných FAQ, 4 kategorie, hledání bez diakritiky a accordion. Jedná se o pevné odpovědi, ne AI chat. JSON-LD FAQPage se generuje ze stejných dat do výsledného HTML. Desktop používá drawer do 420 px, mobil bottom sheet do 85dvh. Nativní dialog zajišťuje inertní pozadí, doplněný focus trap, Escape, zavření mimo panel a návrat fokusu.

Šipka doprava zasune postavu za pravý okraj; viditelná část figurky zůstává klikací. FAQ zůstává dostupné. Křížek v panelu pouze zavře panel. SessionStorage `awclean-mascot-v1` ukládá otevření (`seen`) nebo zasunutí (`hidden`, zachovaný název kvůli kompatibilitě); zasunutí zůstane i po obnovení stránky. Kliknutí na vykukující část vysune celou figurku, dalším kliknutím se otevře FAQ; bublina se neopakuje. Hledání se neukládá. Maskot je vpravo; na mobilu nad volacím tlačítkem, aby se nepřekrývaly.

Uživatel dodal screenshot a následně schválil odstranění okolí pomocí imagegen. Výsledné průhledné PNG je `public/mascot/dr-fasada.png`, 655 × 800 px, 144 688 bajtů; v UI se zobrazuje maximálně 215 px vysoké (na mobilu 147 px). Samostatný snímek mávnutí nebyl dodán. Pokud se objeví `dr-fasada-wave.png`, widget ho použije během pozdravu; jinak pracuje pouze s CSS transformacemi. PNG je pod doporučeným limitem 150 kB. Při případné náhradě větším souborem je vhodná WebP verze s průhledností.

TODO v `src/data/faq.ts`: potvrdit délku realizací, konkrétní ochranu zeleně a přípravky, přesné podmínky záruk a případný ceník. Zatím nejsou slibované konkrétní ceny ani termíny.

Ověřeno v Safari: desktop a mobilní rozložení pomocí zoomu, hledání, accordion, Escape, zavření mimo, návrat fokusu, zmenšení a opětovné otevření i po reloadu. Fyzický dotykový telefon nebyl k dispozici.

## Automatický počet let zkušeností – 9. 10. 2026

Počet se počítá jako aktuální rok minus 2001: 2026 → 25, 2027 → 26. Společný hook aktualizuje oba bloky zkušeností i komponentu milníků. Aktualizace funguje i bez nového nasazení a při otevřené stránce kontroluje změnu roku každou minutu a při návratu na stránku. Předvykreslené HTML uchovává rok sestavení kvůli správné hydrataci; prohlížeč následně použije aktuální rok.

## Úpravy 8. 10. 2026

- Úvod má stálý nadpis „Čištění fasád, střech a dlažeb od roku 2001.“, konkrétní popis a slabší směrový překryv fotografie. Ztmavení je soustředěné pod textem. Nadpis se při střídání fotografií nehýbe.
- Tři fotografie se střídají po 2,5 s bez ručních šipek a čísel. Automatika se pozastaví mimo viewport, při skryté kartě, při fokusu a tlačítkem pauzy. Omezený pohyb ji vypne. Nejde o video.
- Jednotná tlačítka s 10px zaoblením: „Chci ukázku čištění zdarma“ pro fasády, střechy a dlažby, jinde „Nezávazně poptat“. Nabídky se odvozují z `src/data/offers.ts`; zdroje jsou v `CONTENT-NOTES.md`.
- Hned po úvodu a pruhu důvěry následuje porovnání před/po. Tři dvojice zobrazují stejné objekty. Rozdílný úhel záběru je uvedený u příslušné realizace. Táhlo podporuje pointer i klávesnici.
- Čtyři hlavní služby mají fotografie 4:3 a krátké popisy. Dalších osm služeb je v kompaktním přehledu. Všechny podstránky zůstávají dostupné z navigace.
- Reference mají jeden úvod, filtry a 18 vybraných fotografií. Na počítači jsou filtry tlačítka, na mobilu nativní výběr. Galerie zobrazuje nejprve šest větších snímků; další lze rozbalit. Firemní seznam je samostatně rozbalovací s obdobím 2001–aktuální rok.
- Menší rozestupy, jemnější stíny, sjednocené 14px rámečky fotografií; odstraněný parallax a dekorativní vlna u kontaktu. Animace respektují `prefers-reduced-motion`.
- Fotografie mají popisné názvy, auditované alternativní texty, viditelné popisky, rozměry a responzivní WebP varianty. Původní obrazové URL zůstávají dostupné. Impregnace fasád a střech má fotografii střechy.
- Celý obsah všech stránek se předvykreslí při buildu. Vyhledávač dostane nadpisy i fotografie v HTML; React je následně hydratuje. První úvodní snímek se načítá prioritně, ostatní obsahové fotografie odloženě. Skrytý lightbox se nenačítá před otevřením.

## Struktura

```text
src/
  components/       # Navigace, hero, služby, galerie, kontakt, footer, souhlas
  components/services/ServiceCTA.tsx
  data/pages/       # Typované podstránky služeb
  data/offers.ts    # Dostupnost ukázky zdarma a společné CTA
  data/referenceWorks.ts # Vybrané realizace a kategorie filtrů
  data/photos.ts   # Konkrétní alt texty a mapování na původní snímky
  data/imageVariants.ts # Generovaný manifest rozměrů a srcset
  hooks/           # useInView, useCountUp, useCarousel, useReducedMotion
  pages/           # Sdílené šablony stránek
  lib/             # Routing, validace, souhlas a testy
  App.tsx
  main.tsx         # Klientské spuštění/hydratace
  entry-server.tsx # Předvykreslení při sestavení
  styles.css, home.css, refinements.css, conversion.css
public/
  images/realizace/ # Optimalizované fotografie s popisnými názvy
  images/responsive/ # Varianty 480/960/1440 px podle zdroje
  images/projects/ # Původní soubory zachované kvůli stávajícím URL
  images/press/    # Čtyři strany reportáže
  documents/osvedceni-awclean.pdf # Zachované PDF bez odkazů v UI
scripts/
  generate-images.ts
  verify-build.ts
```

Úplný strom a obsah textových souborů jsou v `SOURCE.md`. Distribuční archiv je `awclean-redesign.zip`. Aplikační kód, skripty a konfigurace používají TypeScript bez `any`; JavaScript vzniká pouze jako výstup produkčního sestavení.

## Navigace a adresy

Úvod · Čištění · Nátěry · Ostatní služby · Reference · Kontakt · telefon. Čištění obsahuje osm služeb ve dvou sloupcích, nátěry dva přímé odkazy na sekce společné stránky, ostatní služby tři položky. Mobil používá stejné typované podklady a rozbalovací sekce. Tab, šipky a Escape fungují v dropdownu; Escape vrací fokus.

Katalogy jsou `/sluzby/` a `/ostatni-sluzby/`. Hlavní služby mají adresy `/cisteni-fasad/`, `/cisteni-strech/`, `/cisteni-dlazeb/`, `/cisteni-prumyslovych-objektu/`. Dále jsou dostupné světlíky, hliníkové a historické fasády, pomníky, impregnace, nano impregnace, nátěry a odstraňování dopravního značení. Zachované jsou reference včetně tří detailů, kontakt, reportáž, odborné posouzení a zásady ochrany údajů.

Staré `/ostatni-sluzby/natery-fasad/` a `/ostatni-sluzby/natery-strech/` mají 301 na `/natery-strech-a-fasad/`; staré graffiti na `/ostatni-sluzby/odstranovani-dopravniho-znaceni/`. Další aliasy jsou v `src/lib/routes.ts`. Mytí oken bylo odstraněné v předchozí úpravě. Běžné odkazy podporují nové panely, zpět/vpřed i obnovení stránky.

## Produkční sestavení a SEO

Vite generuje 23 předvykreslených stránek, přesměrování, `404.html`, sitemap a pravidla pro Apache i hostingy podporující `_redirects`. Každá stránka má jedinečný title, description, canonical, Open Graph a Twitter metadata. JSON-LD LocalBusiness zachovává českou adresu, všechny telefony, e-maily a provozní dobu. SEO doména je `https://www.awclean.cz`; interní odkazy jsou relativní.

Na hosting se nahrává celý `dist/`, včetně `.htaccess` pro Apache. Pro Nginx je potřeba obsluha adresářových indexů, ekvivalent `try_files $uri $uri/ =404;`, vlastní 404 a 301 podle `routeAliases`. Publikování nebylo provedeno.

`npm run images` znovu vytvoří responzivní varianty používaných fotografií pomocí Sharp. Originály se nenahrazují ani nezvětšují nad původní rozlišení. Mapování na zdroje je v `src/data/photos.ts`, zdrojové odkazy v `ASSETS.md`.

## Formulář a soukromí

Povinné jméno (2+ znaky), telefon (9–15 číslic), e-mail a zpráva (10+ znaků). České chyby, fokus na první chybu, stavy odesílání/úspěch/chyba, timeout 15 s a ochrana před dvojím odesláním. Zpráva se automaticky nepředvyplňuje a neukládá se do localStorage.

Pro doručování nastavte `.env` podle `.env.example`:

```dotenv
VITE_CONTACT_ENDPOINT=https://vase-api.example.cz/contact
```

Endpoint přijímá POST JSON s poli `name`, `phone`, `email`, `message`; 2xx vrací až po přijetí poptávky. Backend musí zajistit validaci, omezení četnosti a doručování. Přístupy ani endpoint nebyly dodány. Bez endpointu formulář nesimuluje úspěch a nabídne otevření zprávy v e-mailovém klientovi. `VITE_` proměnné jsou veřejné a nesmějí obsahovat tajné klíče.

Správce osobních údajů zůstává podle zadání původní slovenská společnost AWCLEAN s.r.o., IČO 50823272, Čsl. armády 1457, Topoľčany. Česká kontaktní adresa zůstává beze změny.

„Spravovat souhlas“ otevírá dialog se záložkami, kategoriemi a volbami Odmítnout / Povolit výběr / Povolit vše. Předvolby se ukládají na 180 dní v localStorage. Výchozí volitelné kategorie jsou vypnuté; žádné analytické ani reklamní skripty nejsou připojené. Fonty a obrázky jsou lokální.

## Barvy a font

Tokeny jsou v `tailwind.config.ts`, finální vizuální úpravy v `src/conversion.css`. Bílá `#FFFFFF`, tmavá modrá `#122B4D`, azurový akcent loga `#00AEEF`, jeho kontrastní textová varianta `#00749D`, světle modré plochy `#EAF5FC`. Původní logo je nezměněné. Inter Variable je hostovaný lokálně, ikony Lucide. Světlý azur se nepoužívá jako malý text na bílé; accent.ink/bílá má kontrast 5,27:1 a accent/navy 5,61:1.

## Ověření a zálohy

### Git od 15. 10. 2026

Obnovená verze před odmítnutým Taste redesignem je výchozím stavem větve `main`
a je označená tagem `stable-before-taste-2026-10-15`. Další změny patří do
samostatných větví a commitů; běžné verzování už nepoužívá kopie celého projektu.
Pravidla jsou v `AGENTS.md`.

```bash
git status
git log --oneline --decorate -10
git switch -c feature/nazev-upravy
```

Stabilní verzi lze při čistém pracovním stromu otevřít pomocí `git switch main`.
Pokud jsou rozpracované změny, nejprve je bezpečně uložte na jejich vlastní větvi.
`git reset --hard` není běžný způsob návratu. Před přepnutím kontrolujte `git status`.

Sledují se zdroje i obrázky v `public/`. `node_modules`, `dist`, místní `.env`,
staré zálohy a generované exporty jsou ignorované. Historické archivy zůstávají
na disku. Místní commit ještě není záloha na GitHubu; připojení ověříte pomocí
`git remote -v` a vzdálená historie vzniká až po úspěšném pushi.

- `npm run build`, všech 47 testů a `npm run check:build` prošly.
- Kontrola všech 23 tras: jeden H1, unikátní metadata, OG/Twitter/JSON-LD, existující fotografie s alt/rozměry, 404 a zachované PDF.
- Safari: desktop a užší rozložení pomocí zoomu (tablet/mobil), filtry v obou variantách, galerie se šipkami a Escape, návrat fokusu, mobilní dropdown, slider klávesnicí a validace prázdného formuláře. Produkční HTML i následné interakce byly ověřené. Fyzický dotykový telefon a úplný audit WCAG nebyly součástí kontroly.
- Doručení e-mailu vyžaduje reálný backend. Chybějící obsah je popsaný v `CONTENT-NOTES.md`.

Předchozí stav je uložený v `backups/awclean-pred-upravou-poptavek-2026-10-08.zip` s SHA-256. Starší zálohy zůstávají zachované. Pro návrat rozbalte vybranou zálohu do nové složky a spusťte `npm install` a `npm run dev`. Zálohy nejsou vložené do distribučního ZIPu.
