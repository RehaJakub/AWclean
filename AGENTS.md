# Práce v projektu AWCLEAN

## Verzování

- Používej Git jako primární historii změn. Nevytvářej další ZIP/TAR zálohy projektu pro běžné úpravy.
- Nejdřív zkontroluj `git status` a aktuální větev. Nezahrnuj nesouvisející změny uživatele do svých commitů.
- Novou úpravu nebo redesign začínej v samostatné větvi `feature/<popis>` nebo `fix/<popis>` z aktuální schválené verze. `main` ponech jako schválený stav.
- Před rozsáhlou změnou musí být výchozí stav dohledatelný commitem; při nejasném rozpracovaném stavu nepřepisuj práci uživatele.
- Změny ukládej do srozumitelných commitů. Před dokončením spusť kontroly odpovídající změně; pro úpravy webu `npm test`, `npm run build` a `npm run check:build`.
- Pro návrat použij příslušnou větev nebo `git revert`; nepoužívej `git reset --hard`, `git clean` ani force push bez výslovného požadavku.
- Před připojením vzdáleného repozitáře ověř přesnou URL. GitHub profil sám neurčuje cílový repozitář.
- Existující archivy v `backups/` jsou historické, ignorované Gitem a nemají se bez pokynu mazat.

## Web

- Zachovej React + TypeScript strict; bez `any` a bez zdrojových `.js` souborů.
- Obchodní informace čerpej jen z aktuálního obsahu projektu a z awclean.cz. Nevymýšlej reference, lokality, ceny ani garance.
- Logo, kontakty, skutečné fotografie a existující funkční adresy zachovej, pokud uživatel výslovně nezadá změnu.
- Volitelné skripty (analytika, marketing, personalizace) spouštěj jen po kontrole `hasConsent(...)` ze `src/lib/consent.ts`; bez platné volby se nesmí načíst nic volitelného.
- Konfiguraci serveru upravuj v `deploy/htaccess.template` (build z ní generuje `dist/.htaccess`), ne v `dist/` ani na FTP.
