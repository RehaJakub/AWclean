# Upgrade AWCLEAN — 12. 10. 2026

## Návrat k původní verzi

Kompletní stav před úpravami je uložen v `backups/pre-upgrade-2026-10-12/awclean-complete.tar.gz` (397 MiB). Návod k bezpečnému obnovení a kontrolní součet jsou v [README zálohy](backups/pre-upgrade-2026-10-12/README.md). Archiv obsahuje i původní fotografie, obsah, konfiguraci a sestavení; závislosti lze obnovit přes `npm ci`. Návrat tedy neobnovuje jen CSS.

## Provedené změny

- **Úvod:** fotografie, nadpis a doprovodná věta se nyní vztahují ke stejné službě. První snímek zachovává „Čistá fasáda. Nový dojem.“. Střídání po 5 sekundách, tlačítko pozastavení a dosavadní pozastavení mimo viewport / při omezeném pohybu. Doplněný stručný přehled služeb; upravené ztmavení pod textem a mobilní výřez.
- **Typografie a rozestupy:** klidnější velikosti H2 a úvodů podstránek, společné mezery a ovládací prvky. Tmavší akcent pro malé texty na světlém pozadí; cyan zůstává dekorativním a velkým akcentem na tmavé ploše.
- **O AWCLEAN:** dominantní fotografie dodávek v přirozeném poměru 4:3, dvě stejně řešené statistiky. Fotografii práce na laně využívá sekce „Proč AWCLEAN“. Počet let nadále vychází z aktuálního roku minus 2001.
- **Výběr podle objektu:** Rodinný dům / SVJ a bytový dům / Firma a průmysl. Nabízí odkazy na existující služby a filtrované reference.
- **Reference:** úvodních šest fotografií zastupuje více oblastí práce, další kategorie jsou pod tlačítkem „Další“. Mobil používá výběrové pole. Filtrovaný přehled lze otevřít přímo přes `?typ=fasady` apod. Všechny původní fotografie zůstávají dostupné.
- **Karta proměny (A):** první srovnání na úvodu odkazuje na rozšířený detail červené fasády. Tři existující detaily realizací mají faktické údaje o povrchu/objektu, doložené práci, dokumentaci a viditelném výsledku. U červené fasády jsou samostatné fotografie před a po. Žádné domyšlené místo, termín, plocha nebo použitý přípravek.
- **Porovnání:** přepnutí mezi posuvným porovnáním a dvěma samostatnými snímky; na malém mobilu jsou pod sebou. Galerie na mobilu respektuje výšku dodaných fotografií a koláží.
- **DR Fasáda (B):** průvodce povrch → problém → objekt, odkazy na související služby a skutečné fotografie. Původní FAQ, vyhledávání a kontakty zůstávají ve druhé záložce. Není to automatický technický posudek ani cenová kalkulačka. Nepodložené kombinace odkazují na konzultaci.
- **Chování maskota:** při čtení se zasune k pravému okraji, šipka ho vrací. Menu a jiný otevřený dialog ho dočasně skryjí; při vyplňování formuláře se zasune. Zachovány celá postava, session preference a možnost opětovného otevření. Odstraněn neúspěšný požadavek na neexistující variantu `dr-fasada-wave.png`.
- **Pohyb a přístupnost:** krátký nástup nadpisu a linky, menší posuny sekcí, omezený počet opakování pohybu maskota, respektování `prefers-reduced-motion`, viditelný focus a větší dotykové ovladače. Průvodce přesouvá focus na název kroku, dialog zachovává fokus uvnitř a zavírání Escape.

Formulář, jeho validace a odesílání nebyly měněny. Logo, kontakty, adresy stránek, stávající obsah služeb a fotografie zůstávají zachované. Nepřibyla žádná závislost ani externí služba. Žádné zdrojové `.js` soubory nebo `any`. Starý ZIP a `SOURCE.md` nejsou novým exportem; aktuální je projekt `src/` a nový `dist/`.

## Co jsem bez dalších podkladů nedoplnil

1. **Přesné srovnání záruk 5 / 10 / 20 let (podrobná část bodu 10):** chybí písemné přiřazení k jednotlivým ošetřením, předmět záruky, podmínky, údržba a výluky. Dosavadní obecná informace zůstává, nové smluvní sliby nepřibyly.
2. **Kompletní případové studie s čísly:** pro konkrétní fotografie chybí ověřená lokalita, rok zakázky, plocha v m², trvání práce, konkrétní technologie/ošetření a souhlas se zveřejněním těchto údajů. Karty nyní uvádějí pouze informace doložené současnými daty a fotografiemi.
3. **Technicky přesnější doporučení doktora:** pro přesné doporučování impregnací, nátěrů a chemie je potřeba pravidlová tabulka firmy podle materiálu, stavu a problému; zejména omezení a ochrana okolní zeleně. Stávající obecné FAQ s TODO nebylo rozšiřováno o neověřená tvrzení.
4. **Autentická zákaznická hodnocení:** nebyly dodány konkrétní citace s identifikovaným zdrojem a svolením. Žádné nové recenze, hvězdičky ani údaj o spokojenosti nebyly vytvořeny.

## Použité podklady

- Stávající `src/data/pages/`, `projects.ts`, `references.ts`, `referenceWorks.ts`, `facadePhotos.ts`, `photos.ts`, `heroSlides.ts`, `faq.ts` a lokální fotografie v `public/`.
- [Čištění fasád AWCLEAN](https://www.awclean.cz/cisteni-fasad/) — rodinné a bytové domy, odstranění nečistot, ukázka a posouzení.
- [Impregnace fasád a střech AWCLEAN](https://www.awclean.cz/impregnace-fasad-a-strech/) — existence služby pro tyto povrchy.
- [Čištění průmyslových objektů AWCLEAN](https://www.awclean.cz/cisteni-prumyslovych-objektu/) — oblast průmyslového čištění.

Obsah konkurence nebyl do webu převzat. Technická a vizuální rozhodnutí (rozvržení, velikosti, animace) nejsou tvrzeními o realizacích firmy.

## Kontrola

- `npm test`: testy současného webu a nové testy všech 48 kombinací průvodce, cílových adres, kotev nátěrů, výběru služeb a zachování fotografií při novém řazení.
- `npm run build`: TypeScript strict, produkční Vite a předgenerované HTML jednotlivých adres.
- `npm run check:build`: lokální odkazy/obrázky, metadata, nadpisy, schema a zachování stávajících adres.
- Vizuální kontrola v Safari na desktopu a v náhledech 390 × 844 a 768 × 900 CSS px: úvod, rozbalovací menu, fotografie dodávek a statistiky. Ručně ověřen průchod průvodcem, FAQ bez diakritiky, zasunutí a vrácení postavy a Escape. Náhledy nejsou testem na fyzickém telefonu ani měřením Core Web Vitals.
