# Návrh: informační věta u formuláře (LEGAL-10)

Současný stav – src/components/ContactForm.tsx:204–207:

> Odesláním nás žádáte o zpracování poptávky. Více o ochraně osobních údajů.

## Posouzení
- Právní titul pro vyřízení poptávky je čl. 6 odst. 1 písm. b) GDPR (opatření přijatá před uzavřením smlouvy na žádost subjektu údajů).
  Souhlas (písm. a) by byl nevhodný: šel by kdykoli odvolat, ale poptávku stejně musíme vyřídit, a checkbox by uživatele mátl.
  **Checkbox „souhlasím se zpracováním“ nepřidávat.**
- Čl. 13 GDPR se splní „v okamžiku získání“ údajů. Úplné informace mohou být ve vrstvené podobě na stránce zásad,
  krátká věta má ale uvést aspoň **správce, účel a odkaz** (vrstvený přístup doporučují pokyny WP29 k transparentnosti WP260 rev.01, převzaté EDPB: https://www.edpb.europa.eu/system/files/2023-09/wp260rev01_en.pdf – k ověření s právníkem/DPO).
- Současná věta nejmenuje správce a „žádáte o zpracování poptávky“ je spíš popis akce než informace o zpracování údajů.

## Navržené znění (CZ)

```tsx
<p className="privacy-note">
  Údaje z formuláře zpracuje AWCLEAN s.r.o. (IČO 50823272) jen k vyřízení vaší poptávky
  a přípravě nabídky. Podrobnosti, doba uložení a vaše práva jsou v{" "}
  <a href={privacyUrl}>zásadách ochrany osobních údajů</a>.
</p>
```

Varianta, až bude zapnutý Cloudflare Turnstile (LEGAL-4):

```tsx
<p className="privacy-note">
  Údaje z formuláře zpracuje AWCLEAN s.r.o. (IČO 50823272) jen k vyřízení vaší poptávky
  a přípravě nabídky. Formulář chrání před spamem služba Cloudflare Turnstile.
  Podrobnosti, doba uložení a vaše práva jsou v{" "}
  <a href={privacyUrl}>zásadách ochrany osobních údajů</a>.
</p>
```

Volitelná slovenská varianta (pokud bude SK verze webu):

> Údaje z formulára spracuje AWCLEAN s.r.o. (IČO 50823272) iba na vybavenie vášho dopytu a prípravu ponuky.
> Podrobnosti, dobu uchovávania a vaše práva nájdete v zásadách ochrany osobných údajov.

Po odeslání se nic nemění: data se dál ukládají jen ve stavu komponenty (ověřeno, viz LEGAL-5 – žádné local/sessionStorage mimo ConsentManager).
