# Úpravy obsahu

Texty jsou v `src/data/`. Po úpravě spusťte `npm test && npm run build && npm run check:build`.
Na GitHubu jde soubor upravit i v prohlížeči (ikona tužky); CI pak změnu zkontroluje.

| Co | Kde |
| --- | --- |
| Text služby, bloky, galerie, FAQ ke službě | `src/data/pages/<sluzba>.ts`, výběr FAQ v `src/data/serviceVisuals.ts` |
| Otázky DR Fasády | `src/data/faq.ts` (odpověď bez „Doktor radí:“, maskot ho přidá sám) |
| Průvodce výběrem služby | `src/data/guide.ts` |
| Telefon, e-mail, adresa | `src/data/contacts.ts` |
| Firemní reference | `src/data/clients.ts` |
| Fotky referencí | `src/data/referenceExtras.ts`, `referenceWorks.ts`, alt texty v `photos.ts` |
| Zásady ochrany údajů | `src/data/privacy.ts` |
| Titulky a popisy stránek | `src/lib/routes.ts`, u služby volitelně `seoTitle` |

## Typografie

Za jednopísmenné předložky a spojky (v, k, s, z, o, u, a, i) píšeme nezlomitelnou mezeru (U+00A0),
aby nezůstaly na konci řádku.

## Nová fotka

1. Uložit WebP do `public/images/realizace/` s popisným názvem.
2. `npm run strip:gps` (odstraní polohu z EXIF), pak `npm run images` (varianty a manifest).
3. Přidat alt text do `src/data/photos.ts` a fotku do příslušných dat.

Fotky musí být skutečné z realizací AWCLEAN; stock fotky ani generované obrázky se nepoužívají.
