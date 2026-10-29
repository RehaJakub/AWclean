# AWCLEAN – web

Firemní web AWCLEAN (čištění a ošetřování povrchů v ČR a SR). React 19, TypeScript strict,
Vite 6, Tailwind CSS 4. Build předvykreslí 23 adres do statického HTML, React je pak hydratuje.

## Rychlý start

Node.js 22.18+ (`.nvmrc`).

```bash
npm ci
npm run dev          # http://localhost:5173
npm test             # Vitest (jen src/)
npm run lint         # ESLint
npm run build        # tsc + Vite + statické HTML, .htaccess, sitemap, 404, obrázky pro sdílení
npm run check:build  # kontrola dist/ (metadata, JSON-LD, CSP, obrázky bez GPS)
npm run preview
```

Další skripty: `npm run images` (responzivní varianty fotek, nepřekódovává existující a maže
nepoužívané), `npm run strip:gps` (bezeztrátově odstraní EXIF/GPS z fotek v `public/`),
`npm run favicon`.

## Dokumentace

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) – jak web funguje (trasy, předvykreslení, data, CSS).
- [docs/DEPLOY.md](docs/DEPLOY.md) – nasazení, formulář (`contact.php`), server, monitoring.
- [docs/CONTENT.md](docs/CONTENT.md) – jak upravit texty, služby, FAQ a fotky.
- [CONTENT-NOTES.md](CONTENT-NOTES.md) – co má firma ještě dodat.
- [ASSETS.md](ASSETS.md) – původ fotografií.
- [audit/](audit/) – audit z 27. 10. 2026 a checklist `audit-tasks.md`.
- `AGENTS.md`, `CLAUDE.md` – pravidla a kontext pro AI asistenty.
- `docs/history/` – historické poznámky (neodpovídají aktuálnímu kódu).
