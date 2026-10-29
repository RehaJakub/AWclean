# Architektura

## Trasy a stránky

- `src/lib/routes.ts` – seznam všech adres (8 obecných, 12 služeb, 3 realizace), aliasy starých adres
  (`routeAliases`) a metadata (title, description, obrázek pro sdílení přes `shareImage`).
- Nejde o React Router: odkazy jsou běžné `<a href>`, každá adresa je samostatný HTML dokument.
- `src/App.tsx` vybere stránku podle `resolveRoute`, vykreslí Navbar, Footer a líně načte maskota DR Fasáda.

## Předvykreslení (build)

`vite.config.ts` obsahuje pluginy:

- `staticPages` – po buildu vykreslí `src/entry-server.tsx` pro každou trasu a zapíše `dist/<adresa>/index.html`,
  metadata (title, OG, Twitter, canonical), přesměrovací HTML pro aliasy, `404.html` (noindex, bez canonical),
  `sitemap.xml` (včetně fotek referencí), `_redirects` a `.htaccess` ze šablony `deploy/htaccess.template`,
  a obrázky pro sdílení 1200×630 do `dist/images/og/`.
- `businessMetadata` – JSON-LD firmy (`src/data/seo.ts`) do `<head>`.
- Rok v patičce a referencích čte při hydrataci `data-render-year` (`src/hooks/useCurrentYear.ts`).

Předvykreslené HTML nesmí obsahovat atribut `style=""` (CSP `style-src 'self'`); hlídá to `scripts/verify-build.ts`.

## Data

Veškerý obsah je v TypeScriptu v `src/data/` (žádná databáze ani CMS):

- `pages/*.ts` – 12 služeb (typ `ServicePageData`), `services.ts` – menu a katalog,
- `faq.ts` – FAQ DR Fasády, `guide.ts` – průvodce výběrem služby,
- `projects.ts`, `referenceWorks.ts`, `referenceExtras.ts`, `clients.ts` – reference,
- `photos.ts` (alt texty), `imageVariants.ts` (generovaný manifest srcset),
- `contacts.ts` – telefony, e-maily, adresa (jediný zdroj), `privacy.ts` – zásady ochrany údajů,
- `offers.ts` – kde se nabízí ukázka čištění zdarma.

## Komponenty

`src/components/`: Navbar (mega menu), Footer, Hero (posuvník před/po), Gallery (lightbox), ContactForm,
ConsentManager, MascotWidget + ServiceGuide, JsonLd, ResponsiveImage. `src/pages/` – šablony stránek.

## CSS

Pořadí: `styles.css` → `home.css` → `refinements.css` → `conversion.css` → `upgrade.css` → `redesign.css`.
Aktuální vzhled je v `redesign.css` (třídy `rd-*`, `svc-*`, `home-*`) a přebíjí starší vrstvy.
Opravy z auditu jsou na konci `redesign.css` v bloku „Opravy z auditu“. Maskot má vlastní `MascotWidget.css`.

## Souhlas s cookies

`src/lib/consent.ts`. Žádné volitelné skripty nejsou připojené. Každý budoucí volitelný skript
se smí spustit jen po `hasConsent("analytics" | "marketing" | "personalized")`.
