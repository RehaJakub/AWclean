# Obsahové podklady a položky k doplnění

## Ověřená nabídka

Údaje o působení od roku 2001, rozsahu služeb, 2,5 mil. m² a oblasti ČR/SR vycházejí z původního webu https://www.awclean.cz/ a stávajících firemních podkladů. Nové statistiky, recenze ani lokality nebyly doplněny.

Ukázka zdarma byla 8. 10. 2026 ověřena na těchto stránkách:

- https://www.awclean.cz/cisteni-fasad/
- https://www.awclean.cz/cisteni-strech/
- https://www.awclean.cz/cisteni-dlazeb/

U průmyslu a ostatních služeb není samostatná dostupnost bezplatného vzorku dostatečně doložená, proto mají CTA „Nezávazně poptat“. Záruky zůstávají podmíněné vybraným ošetřením.

## Co doplnit od firmy

- Vlastní fotografie odstraňování dopravního značení. Stávající stránka používá zřetelně označenou ilustrační fotografii zpevněného povrchu; nedokládá realizaci této služby.
- Samostatnou fotodokumentaci nano impregnace, ideálně aplikaci a účinek na stejném povrchu. Současný detail s vodou je z dodaných podkladů k impregnaci a nevydává se za novou zakázku.
- Ověřené lokality, rozsah prací a případně datum/délku konkrétních zakázek. Aktuální popisky popisují viditelný povrch a činnost; neodhadují město ani počet dnů.
- Původní fotografie ve vyšším rozlišení pro některé starší, malé snímky. Komprese ani přejmenování nezvýší jejich obrazovou kvalitu. Současné varianty se nezvětšují nad originál.
- Backendový endpoint a ověření skutečného doručení poptávky do firemního e-mailu. Validace a chybové stavy fungují; bez endpointu se nabídne e-mailový klient.

## Fotografie a jejich návaznost

`public/images/realizace/` obsahuje optimalizované kopie s popisnými názvy. `src/data/photos.ts` mapuje každou kopii na původní soubor a konkrétní alt. Originální soubory zůstávají dostupné, takže změna názvů neruší staré obrazové URL. Varianty v `public/images/responsive/` vytváří `npm run images`.

Fotografie nejsou generované ani retušované tak, aby předstíraly výsledek. Porovnání používá reálné dvojice stejného objektu; některé záběry se liší úhlem, což je u příslušné dvojice uvedeno. Popisné názvy, alt a viditelné popisky pomáhají porozumění obsahu, samy nezaručují pozice ve vyhledávání.

## FAQ DR Fasáda

Odpovědi jsou v `src/data/faq.ts`. Firma má zkontrolovat zejména orientační délku čištění, ochranu okolní zeleně a omezení přípravků, rozsah/výluky záruk 5/10/20 let a případný ceník. Tyto body mají komentář TODO. Současné formulace neslibují konkrétní částky, termíny ani univerzální bezrizikovost chemie. Nabídka vzorku zdarma je výslovně omezená na fasády, střechy a dlažby.
