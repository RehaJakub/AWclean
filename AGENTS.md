# Práce v projektu AWCLEAN

## Verzování

- Používej Git jako primární historii změn. Nevytvářej další ZIP/TAR zálohy projektu pro běžné úpravy.
- Nejdřív zkontroluj `git status` a aktuální větev. Nezahrnuj nesouvisející změny uživatele do svých commitů.
- Novou úpravu nebo redesign začínej v samostatné větvi `feature/<popis>` nebo `fix/<popis>` z aktuální schválené verze. `main` ponech jako schválený stav.
- Před rozsáhlou změnou musí být výchozí stav dohledatelný commitem; při nejasném rozpracovaném stavu nepřepisuj práci uživatele.
- Jediným autorem i committerem commitů je `Jakub Řeha <jakubos.reha@gmail.com>`. Do commitů ani PR nepřidávej `Co-Authored-By`, odkazy na session ani jinou atribuci AI nástrojů (Claude, Codex apod.).
- Commit zprávy piš strukturovaně ve formátu Conventional Commits: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`, `build:`, `test:` (volitelně se scope, např. `feat(ui): ...`).
- Do `main` se nepushuje přímo; změny jdou z větve `feature/*` nebo `fix/*` přes pull request a merge po úspěšných kontrolách.
- Změny ukládej do srozumitelných commitů. Před dokončením spusť kontroly odpovídající změně; pro úpravy webu `npm test`, `npm run build` a `npm run check:build`.
- Pro návrat použij příslušnou větev nebo `git revert`; nepoužívej `git reset --hard`, `git clean` ani force push bez výslovného požadavku.
- Před připojením vzdáleného repozitáře ověř přesnou URL. GitHub profil sám neurčuje cílový repozitář.
- Existující archivy v `backups/` jsou historické, ignorované Gitem a nemají se bez pokynu mazat.

## Web

- Zachovej React + TypeScript strict; bez `any` a bez zdrojových `.js` souborů.
- Obchodní informace čerpej jen z aktuálního obsahu projektu a z awclean.cz. Nevymýšlej reference, lokality, ceny ani garance.
- Logo, kontakty, skutečné fotografie a existující funkční adresy zachovej, pokud uživatel výslovně nezadá změnu.
