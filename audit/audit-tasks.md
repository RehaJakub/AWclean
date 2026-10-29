# Úkoly z auditu webu (27. 10. 2026)

Checklist všech nálezů auditu webu, seřazený podle roadmapy. `[x]` hotovo, `[~]` částečně (co zbývá je u položky). Stav k 28. 10. 2026. Odškrtávejte po opravě a ověření
(postup ověření je u každého nálezu v reportu).

- Report: https://claude.ai/artifact/RTtC3nah1XuyxPbp4aU362 (stránky `<oblast>.html#<ID>`, hotové snippety na stránce `fixes.html`).
- Auditovaný commit: `33c79c3` (main). Čísla řádků v reportu platí pro tento commit; po dalších změnách
  (např. formátování podle CODE-9) se mohou posunout – hledejte podle citovaného kódu.
- Závažnost: Critical / High / Medium / Low / Info. Pracnost: S ≤ 2 h, M 2–8 h, L > 8 h.
- Dílčí nálezy, které řeší jiný nález, tu samostatně nejsou (najdete je v reportu u hlavního nálezu).

## W1 před spuštěním

- [x] OPS-1 · High · S 2 h · Generovaný `.htaccess` nemá hlavičky, kompresi, cache, kanonickou doménu ani ochranu souborů → `ops-deploy.html#OPS-1`
- [ ] OPS-4 · High · M 3 h příprava + 1 h přepnutí · Přechod z dnešního hostingu (Smartweb) nemá plán; HSTS 1 rok a e-mail u Smartwebu z něj dělají rizikovou operaci → `ops-deploy.html#OPS-4`
- [~] SEC-3 · High · M 4 h · Formulář nemá funkční ani chráněný backend – hotový contact.php (PHPMailer, antispam, rate limit, kontext služby) → `security.html#SEC-3` — částečně: kód hotový (public/contact.php, deploy/), čeká na hosting, SMTP a ověření doručení
- [x] A11Y-1 · Medium · S 0 h navíc · Telefonní odkazy: přístupné jméno bez čísla → `accessibility.html#A11Y-1`
- [x] A11Y-2 · Medium · S 0,1 h · CTA banner 4,37 : 1 → `accessibility.html#A11Y-2`
- [x] A11Y-5 · Medium · S 0,5 h · Focus prstenec je na modrém CTA banneru neviditelný a v patičce pod 3 : 1 → `accessibility.html#A11Y-5`
- [x] A11Y-7 · Medium · S 0 h navíc · Fokus končí pod maskotem (Focus Not Obscured) → `accessibility.html#A11Y-7`
- [x] CONT-1 · Medium · S 0,5 h + potvrzení firmy · Chyby v seznamu firemních referencí (prohozené státy, duplicity) → `content.html#CONT-1`
- [x] CONT-2 · Medium · S 2 h · Nabídka zdarma má 9 názvů a historické fasády slibují ukázku, kterou CTA nenabízí → `content.html#CONT-2`
- [x] CRO-1 · Medium · S 2 h · Volba služby a „ukázky zdarma“ se z CTA do poptávky nepřenese → `business-cro.html#CRO-1`
- [ ] CRO-3 · Medium · M 4–6 h · Nejsilnější důvěryhodné podklady pro SVJ a firmy jsou schované nebo chybí → `business-cro.html#CRO-3`
- [~] LEGAL-1 · Medium · S 1 h · Neúplná a nepřesná identifikace provozovatele → `legal.html#LEGAL-1` — částečně: hotové kromě adresy příslušného inspektorátu SOI
- [~] LEGAL-2 · Medium · M 3 h · Zásady ochrany údajů nesplňují čl. 13 GDPR → `legal.html#LEGAL-2` — částečně: text hotový bez zástupných údajů, nutná kontrola právníkem
- [~] LEGAL-3 · Medium · S 0,5 h · Záruka „5 / 10 / 20 let“ jako fakt bez podmínek → `legal.html#LEGAL-3` — částečně: na webu „až 20 let – podmínky v nabídce“; firma dodá písemné podmínky
- [ ] LEGAL-4 · Medium · M 2 h + uzavření DPA · Plánovaný formulář: zpracovatelé a předání do USA nejsou popsané → `legal.html#LEGAL-4`
- [x] LEGAL-8 · Medium · S 0,5 h · Na webu chybí informace o mimosoudním řešení spotřebitelských sporů → `legal.html#LEGAL-8`
- [x] OPS-2 · Medium · S 0,5 h · Předvykreslený `style="--split:50%"` v hero: s přísnou CSP porušení a rozbitý první dojem → `ops-deploy.html#OPS-2`
- [~] OPS-3 · Medium · M 4 h · Chybí CI/CD; ruční FTP upload 1 497 souborů je nespolehlivý a nemá rollback → `ops-deploy.html#OPS-3` — částečně: CI a deploy workflow hotové, chybí přístupy k hostingu (secrets)
- [~] OPS-5 · Medium · S 1,5 h · Žádný monitoring: výpadek, expirace certifikátu ani nefunkční formulář nikdo nezjistí → `ops-deploy.html#OPS-5` — částečně: workflow hotový, zapnout MONITOR_ENABLED po spuštění; externí uptime monitor zřídit
- [ ] OPS-6 · Medium · S 2 h · Přístupy a vlastnictví nejsou zdokumentované; domény spravuje agentura → `ops-deploy.html#OPS-6`
- [x] SEC-6 · Medium · S 0,5 h · Odeslání formuláře před hydratací posílá osobní údaje v URL (GET) → `security.html#SEC-6`
- [x] SEC-7 · Medium · S 1 h · 45 fotografií v buildu nese GPS souřadnice zakázek (38 je přímo na webu) → `security.html#SEC-7`
- [x] SEO-1 · Medium · S 2 h · FAQPage JSON-LD na 28 stránkách neodpovídá viditelnému obsahu → `seo.html#SEO-1`
- [ ] SEO-2 · Medium · S 1 h rozhodnutí + hreflang; L · 40–60 h plná SK verze · SK trh: awclean.sk je samostatný slovenský web, nový web s ním nepočítá a hreflang je na obou doménách chybně → `seo.html#SEO-2`
- [x] SEO-5 · Medium · S 1 h · Migrace: indexovaná `/ostatni-sluzby/myti-oken/`, certifikát PDF a ~170 obrázků skončí na 404 → `seo.html#SEO-5`
- [ ] SEO-7 · Medium · S 2 h v kódu + M · 4–6 h katalogy a GBP · NAP se při migraci mění a není jednotný napříč weby (CZ produkce, SK web, nový web) → `seo.html#SEO-7`
- [x] UX-2 · Medium · S 0,5 h · Tři telefonní čísla bez viditelného označení země → `ux.html#UX-2`
- [~] UX-6 · Medium · M 3 h · Maskot DR Fasáda zakrývá ovládací prvky na první obrazovce, na 404 i v patičce → `ux.html#UX-6` — částečně: kroky 1–2 hotové + zasunutí při fokusu; na mobilu na výšku zůstává vidět (volba vlastníka)
- [x] CODE-4 · Low · M 5 h · Dokumentace neodpovídá kódu a chybí návod k architektuře, nasazení a úpravám obsahu → `code.html#CODE-4`
- [~] CRO-7 · Low · S 1–2 h · Kontaktní cesty: čísla bez země, telefon v patičce skrytý na homepage, chybí rychlý kanál → `business-cro.html#CRO-7` — částečně: čísla se zemí a telefon v patičce hotové; rychlý kanál (WhatsApp apod.) čeká na firmu
- [x] LEGAL-5 · Low · S 0,25 h · Okno cookies tvrdí, že DR Fasáda ukládá do úložiště relace → `legal.html#LEGAL-5`
- [~] LEGAL-10 · Low · S 0,25 h · Informační věta u formuláře nejmenuje správce ani účel zpracování údajů → `legal.html#LEGAL-10` — částečně: hotové, kontrola právníkem
- [x] SEO-3 · Low · S 1 h · LocalBusiness: obecný typ, chybí právní identita, areaServed a oddělení sídla od provozovny → `seo.html#SEO-3`

## W2 do 30 dní

- [x] A11Y-6 · Medium · S 1 h · Po otevření mobilního menu jde Tab za menu do obsahu stránky → `accessibility.html#A11Y-6`
- [x] A11Y-8 · Medium · S 0,25 h · Po zavření dialogu DR Fasády se fokus často ztratí na `body` → `accessibility.html#A11Y-8`
- [x] A11Y-9 · Medium · S 1 h · Po odeslání formuláře (úspěch i chyba) se fokus ztratí na `body` → `accessibility.html#A11Y-9`
- [x] A11Y-10 · Medium · S 0,25 h · Kontrast: odkaz v dialogu cookies 1,92 : 1, placeholder hledání firem 3,97 : 1 → `accessibility.html#A11Y-10`
- [x] CODE-2 · Medium · S 1 h · Rok v patičce a referencích rozbije hydrataci od 1. ledna → `code.html#CODE-2`
- [~] CONT-5 · Medium · S 1 h + fotky od firmy · Stránka Čištění historických fasád nemá vlastní obsah ani fotky historických budov → `content.html#CONT-5` — částečně: hliníkové fotky odstraněny, ukázka se neslibuje; chybí fotky historických zakázek
- [ ] CONT-8 · Medium · L 8–12 h + podklady · Chybějící stránky: postup spolupráce, o firmě, ceník/orientace, SVJ; lokální stránky až s doloženými zakázkami → `content.html#CONT-8`
- [ ] CRO-4 · Medium · M 3 h + podklady · Námitky „kolik to stojí, jak dlouho, co zeleň, jaká záruka“ zůstávají bez odpovědi → `business-cro.html#CRO-4`
- [ ] CRO-5 · Medium · M 4–6 h · Web nemluví k SVJ a firmám; formulář nesbírá údaje, které firma potřebuje k nabídce → `business-cro.html#CRO-5`
- [ ] CRO-6 · Medium · M 3 h + podklady · Detaily realizací nejsou případové studie → `business-cro.html#CRO-6`
- [ ] OPS-7 · Medium · S 2 h · Analytika a měření konverzí chybí; souhlas „analytics“ nic nespouští → `ops-deploy.html#OPS-7`
- [ ] PERF-1 · Medium · M 4 h · Mobilní LCP 2,5–4,9 s i po kompresi; brzdou je souběh stahování v kritickém okně, ne render delay → `performance.html#PERF-1`
- [~] PERF-4 · Medium · M 5 h · Karty a náhledy stahují 2–7× větší obrázky, než zobrazují (432–875 KiB na stránku na mobilu); hero naopak malý → `performance.html#PERF-4` — částečně: sizes na homepage opraveny; menší varianty 160/320/640 zbývají
- [x] PERF-7 · Medium · S 1 h · CLS 0,135–0,176 na mobilu: drobečková navigace se po načtení fontu Inter zalomí na 2 řádky → `performance.html#PERF-7`
- [ ] SEC-8 · Medium · S 1 h práce + 2–6 týdnů sledování reportů · E-mailová autentizace domén je neúplná (DMARC p=none bez reportů, .cz bez DKIM, .sk SPF ?all, DKIM 1024 bit) → `security.html#SEC-8`
- [x] UX-7 · Medium · S 1 h · Mega menu na desktopu: najetí myší otevře, následný klik na stejnou položku zavře → `ux.html#UX-7`
- [x] VIS-1 · Medium · S 0,5 h · Dlaždice „Co vyčistíme“ na 320–410 px: šipka vyjede z karty a ořízne se, titulek naráží na okraj → `visual-qa.html#VIS-1`
- [ ] VIS-4 · Medium · M 2 h · Šest fotek má originál jen 284–462 px: na stránkách služeb jsou rozmazané i na běžném monitoru → `visual-qa.html#VIS-4`
- [x] A11Y-3 · Low · S 0,25 h · Pořadí nadpisů → `accessibility.html#A11Y-3`
- [x] CODE-5 · Low · S 2 h · Webroot obsahuje 359 osiřelých obrázků (31 MiB) a interní soubory → `code.html#CODE-5`
- [x] CODE-7 · Low · S 1,5 h · Telefon a adresa natvrdo na šesti místech → `code.html#CODE-7`
- [x] CODE-8 · Low · S 0,5 h · Manifest obrázků neodpovídá generátoru – 4 fotky bez srcset → `code.html#CODE-8`
- [~] CODE-9 · Low · S 2 h · Chybí linter a formátovač → `code.html#CODE-9` — částečně: ESLint hotový; Prettier a hromadné formátování zatím ne
- [x] CODE-13 · Low · S 0,5 h · Mrtvý TypeScript kód: `audiences.ts` a export `footerServices` → `code.html#CODE-13`
- [x] CODE-15 · Low · S 0,5 h · Konfigurace repa: `.gitignore`, `.env.example`, verze Node a skript faviconu → `code.html#CODE-15`
- [~] CONT-3 · Low · S 1,5 h · Pravopis, typografie a drobné stylistické chyby → `content.html#CONT-3` — částečně: nanoimpregnace, střechy, formulář, pomlčky, FAQ hotové; tečky v nadpisech ponechány (styl návrhu)
- [x] CONT-4 · Low · S 1,5 h · Interní a obranné formulace v textech pro zákazníky; prefix „Doktor radí:“ mimo maskota → `content.html#CONT-4`
- [x] CONT-6 · Low · S 0,5 h · Duplicitní fotky v referencích pod různými popisy a kategoriemi → `content.html#CONT-6`
- [ ] LEGAL-6 · Low · M 4 h · Spotřebitelské informace jen česky, i pro slovenské zákazníky → `legal.html#LEGAL-6`
- [x] LEGAL-7 · Low · S 1 h · Volitelné kategorie souhlasu nic neřídí → `legal.html#LEGAL-7`
- [ ] LEGAL-9 · Low · M 2–4 h · Spotřebitelské smlouvy mimo provozovnu / na dálku – povinnosti mimo web → `legal.html#LEGAL-9`
- [ ] LEGAL-11 · Low · S 1 h · Práva k reportáži „Dům a Byt“ a k postavě DR Fasáda nejsou doložená → `legal.html#LEGAL-11`
- [~] LEGAL-13 · Low · S 0,5 h · „AWCLEAN s.r.o. · od roku 2001“ vs. zápis společnosti v roce 2017 → `legal.html#LEGAL-13` — částečně: patička „zkušenosti s čištěním od roku 2001“; firma potvrdí historii 2001–2017
- [x] PERF-5 · Low · S 1 h · LCP obrázek je `loading="lazy"` na /reference/, /sluzby/, /ostatni-sluzby/, /kontakt/ a 404 → `performance.html#PERF-5`
- [x] PERF-6 · Low · S 1,5 h · Maskot DR Fasáda: 142 KiB PNG 655×800 zobrazovaný nejvýš 280 px vysoko → `performance.html#PERF-6`
- [ ] SEC-9 · Low · S 0,5 h · Chybí CAA a DNSSEC → `security.html#SEC-9`
- [x] SEC-10 · Low · S 0,5 h · Do produkce se nahrávají interní soubory (README, manifest, _redirects, PDF s autorem) → `security.html#SEC-10`
- [x] SEC-11 · Low · S 1 h · Supply chain: bez automatických aktualizací, neschválené install skripty, vite/TS o major pozadu → `security.html#SEC-11`
- [x] SEO-4 · Low · M 3 h · OG obrázky: WebP bez rozměrů a alt textu, 2× 284×284 px, 6× na výšku → `seo.html#SEO-4`
- [x] SEO-8 · Low · S 2 h · Title služeb a H1 homepage nevyužívají klíčová slova a benefit → `seo.html#SEO-8`
- [x] SEO-9 · Low · S 1 h · Drobnosti: canonical 404 na neexistující /404/, sitemap bez lastmod, cookie dialog v outline → `seo.html#SEO-9`
- [x] UX-4 · Low · S 0,5 h · Nekonzistentní dostupnost a působnost → `ux.html#UX-4`
- [x] UX-5 · Low · S 0,5 h · Formulář na Kontaktu až pod fotkou dodávek → `ux.html#UX-5`
- [x] VIS-2 · Low · S 0,5 h · Plovoucí „Nezávazná poptávka“ na telefonu na šířku zakrývá první obrazovku → `visual-qa.html#VIS-2`
- [x] VIS-5 · Low · S 0,5 h · Atribut `sizes` u velkých dlaždic homepage podhodnocuje šířku: prohlížeč stáhne 480w variantu do boxu 670 px → `visual-qa.html#VIS-5`
- [x] VIS-8 · Low · S 0,25 h · „Rozdíl je vidět“ na 680–990 px: tři realizace jako 2 + 1 s prázdnou polovinou řádku → `visual-qa.html#VIS-8`
- [x] CODE-14 · Info · S 0,25 h · `public/.htaccess` a `public/_redirects` se při buildu vždy přepíší → `code.html#CODE-14`

## W3 dlouhodobě

- [x] A11Y-4 · Low · S 0,25 h · Horní lišta mimo landmarky → `accessibility.html#A11Y-4`
- [x] A11Y-11 · Low · S 0,5 h · Upovídaná jména odkazů v „Rozdíl je vidět“, neoznačené ikony → `accessibility.html#A11Y-11`
- [~] CODE-3 · Low · M 6 h · Testy nepokrývají interakce (formulář, dialogy, menu) → `code.html#CODE-3` — částečně: testy formuláře (chyby, úspěch, chyba sítě, bez endpointu) hotové; dialogy a menu zbývají
- [~] CODE-6 · Low · M 4 h · Závislosti o major verzi pozadu → `code.html#CODE-6` — částečně: patch verze (React 19.3.1, Vitest 5.0.5) a Dependabot; Vite 8/TS 7 samostatně
- [~] CODE-11 · Low · L 12 h · Sedm vrstvených CSS souborů s přepisy → `code.html#CODE-11` — částečně: mrtvá pravidla smazána; slučování CSS vrstev zbývá
- [ ] PERF-3 · Low · M 4 h · Jeden JS bundle 476 kB; code split podle trasy ušetří jen ~17,5 kB gzip → `performance.html#PERF-3`
- [ ] PERF-8 · Low · M 6 h · Bez AVIF: fotky jsou o 6–46 % (medián 21 %) větší, než musí → `performance.html#PERF-8`
- [x] UX-8 · Low · S 0,5 h · Hlavička na 320 px: tlačítko menu se smrskne na 24 px → `ux.html#UX-8`
- [ ] UX-10 · Low · M 6 h · Dvě paralelní sady design tokenů a tlačítek → `ux.html#UX-10`
- [x] UX-11 · Low · S 1 h · Tisk: chybí tiskový styl, homepage tiskne prázdnou kontaktní sekci → `ux.html#UX-11`
- [x] VIS-3 · Low · M 3 h · Chybí nezlomitelné mezery: jednopísmenné předložky a spojky zůstávají na konci řádku → `visual-qa.html#VIS-3`
- [ ] VIS-6 · Low · L 10 h · Velikosti písma jsou jen v px: nastavení velikosti písma v prohlížeči se ignoruje → `visual-qa.html#VIS-6`
- [ ] CODE-12 · Info · L 16 h+ · Obsah upraví jen vývojář → `code.html#CODE-12`
- [ ] LEGAL-12 · Info · S 0,5 h · EAA – pravděpodobně se nevztahuje (mikropodnik, web není e-shop) → `legal.html#LEGAL-12`
- [ ] OPS-9 · Info · S 0,25 h · Server/TRACE: hlavičky serveru nejdou upravit v `.htaccess` → `ops-deploy.html#OPS-9`
- [x] SEC-12 · Info · S 0 h · Zbytečné informace o verzích v bundlu → `security.html#SEC-12`
- [x] SEO-11 · Info · S 1 h · Reference: ze 156 fotografií je v serverovém HTML jen 18 → `seo.html#SEO-11`
- [x] VIS-7 · Info · S 0,25 h · Bez `overflow-wrap`: dlouhé slovo nebo adresa v nadpisu se na mobilu tiše ořízne → `visual-qa.html#VIS-7`

## Quick wins (podmnožina výše)

- OPS-1 · Generovaný `.htaccess` nemá hlavičky, kompresi, cache, kanonickou doménu ani ochranu souborů
- A11Y-1 · Telefonní odkazy: přístupné jméno bez čísla
- A11Y-2 · CTA banner 4,37 : 1
- A11Y-5 · Focus prstenec je na modrém CTA banneru neviditelný a v patičce pod 3 : 1
- A11Y-7 · Fokus končí pod maskotem (Focus Not Obscured)
- CONT-1 · Chyby v seznamu firemních referencí (prohozené státy, duplicity)
- CONT-2 · Nabídka zdarma má 9 názvů a historické fasády slibují ukázku, kterou CTA nenabízí
- CRO-1 · Volba služby a „ukázky zdarma“ se z CTA do poptávky nepřenese
- LEGAL-1 · Neúplná a nepřesná identifikace provozovatele
- LEGAL-3 · Záruka „5 / 10 / 20 let“ jako fakt bez podmínek
- LEGAL-8 · Na webu chybí informace o mimosoudním řešení spotřebitelských sporů
- OPS-2 · Předvykreslený `style="--split:50%"` v hero: s přísnou CSP porušení a rozbitý první dojem
- OPS-5 · Žádný monitoring: výpadek, expirace certifikátu ani nefunkční formulář nikdo nezjistí
- OPS-6 · Přístupy a vlastnictví nejsou zdokumentované; domény spravuje agentura
- SEC-6 · Odeslání formuláře před hydratací posílá osobní údaje v URL (GET)
- SEC-7 · 45 fotografií v buildu nese GPS souřadnice zakázek (38 je přímo na webu)
- SEO-1 · FAQPage JSON-LD na 28 stránkách neodpovídá viditelnému obsahu
- SEO-2 · SK trh: awclean.sk je samostatný slovenský web, nový web s ním nepočítá a hreflang je na obou doménách chybně
- SEO-5 · Migrace: indexovaná `/ostatni-sluzby/myti-oken/`, certifikát PDF a ~170 obrázků skončí na 404
- SEO-7 · NAP se při migraci mění a není jednotný napříč weby (CZ produkce, SK web, nový web)
- UX-2 · Tři telefonní čísla bez viditelného označení země
- A11Y-6 · Po otevření mobilního menu jde Tab za menu do obsahu stránky
- A11Y-8 · Po zavření dialogu DR Fasády se fokus často ztratí na `body`
- A11Y-9 · Po odeslání formuláře (úspěch i chyba) se fokus ztratí na `body`
- A11Y-10 · Kontrast: odkaz v dialogu cookies 1,92 : 1, placeholder hledání firem 3,97 : 1
- CODE-2 · Rok v patičce a referencích rozbije hydrataci od 1. ledna
- CONT-5 · Stránka Čištění historických fasád nemá vlastní obsah ani fotky historických budov
- OPS-7 · Analytika a měření konverzí chybí; souhlas „analytics“ nic nespouští
- PERF-7 · CLS 0,135–0,176 na mobilu: drobečková navigace se po načtení fontu Inter zalomí na 2 řádky
- SEC-8 · E-mailová autentizace domén je neúplná (DMARC p=none bez reportů, .cz bez DKIM, .sk SPF ?all, DKIM 1024 bit)
- UX-7 · Mega menu na desktopu: najetí myší otevře, následný klik na stejnou položku zavře
- VIS-1 · Dlaždice „Co vyčistíme“ na 320–410 px: šipka vyjede z karty a ořízne se, titulek naráží na okraj
