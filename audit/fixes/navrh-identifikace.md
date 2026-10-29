# Návrh: identifikace provozovatele (LEGAL-1, LEGAL-8)

Údaje ověřené v ORSR, RÚZ a VIES 27. 10. 2026 (viz `evidence/legal/rejstriky.md`).
Placeholdery `[DOPLNIT: …]` musí potvrdit firma. Není to právní rada; formu ověřit s právníkem.

## 1. Patička (src/components/Footer.tsx, nahradit `<address>` na ř. 84–88)

```tsx
<address>
  AWCLEAN s.r.o., Čsl. armády 1457/2A, 955 01 Topoľčany, Slovensko
  <br />
  IČO 50823272 · IČ DPH SK2120488458
  <br />
  Zapsaná v Obchodnom registri Okresného súdu Nitra, oddiel Sro, vložka č. 43001/N
  <br />
  Kontaktní adresa v ČR: Na Výsluní 298, 294 28 Chotětov
  <br />
  <a href="mailto:info@awclean.cz">info@awclean.cz</a>
</address>
```

Do spodní lišty (ř. 110–112) případně odkaz „Údaje o společnosti“ → `/kontakt/#provozovatel`.

## 2. Kontakt (src/pages/ContactPage.tsx) – nový blok za `rd-contact-details` (ř. 21–51)

```tsx
<section className="rd-wrap rd-legal-info" id="provozovatel" aria-labelledby="provozovatel-title">
  <h2 id="provozovatel-title">Provozovatel webu a poskytovatel služeb</h2>
  <p>
    <strong>AWCLEAN s.r.o.</strong>, sídlo Čsl. armády 1457/2A, 955 01 Topoľčany, Slovenská republika.
    IČO 50823272, DIČ 2120488458, IČ DPH SK2120488458.
    Zapsaná v Obchodnom registri Okresného súdu Nitra, oddiel Sro, vložka č. 43001/N.
  </p>
  <p>
    Kontaktní adresa pro Českou republiku: Na Výsluní 298, 294 28 Chotětov.
    [DOPLNIT, jen pokud existuje: odštěpný závod / provozovna v ČR, IČO, zápis.]
    E-mail info@awclean.cz, info@awclean.sk, telefon +420 773 196 097.
  </p>
  <p>
    Orgán dozoru (SR): Slovenská obchodná inšpekcia, [DOPLNIT: příslušný inšpektorát SOI pro sídlo
    (Topoľčany) a jeho adresa, ověřit na www.soi.sk]. Orgán dozoru (ČR): Česká obchodní inspekce, www.coi.cz.
  </p>
  <h3>Mimosoudní řešení spotřebitelských sporů</h3>
  <p>
    Spotřebitel z České republiky se může obrátit na Českou obchodní inspekci,
    která je věcně příslušným subjektem mimosoudního řešení spotřebitelských sporů: https://adr.coi.cz.
  </p>
  <p>
    Spotřebitel zo Slovenskej republiky sa môže obrátiť na Slovenskú obchodnú inšpekciu
    alebo iný subjekt alternatívneho riešenia spotrebiteľských sporov zapísaný v zozname
    Ministerstva hospodárstva SR:
    https://www.mhsr.sk/obchod/ochrana-spotrebitela/alternativne-riesenie-spotrebitelskych-sporov-1/zoznam-subjektov-alternativneho-riesenia-spotrebitelskych-sporov-1
  </p>
</section>
```

Poznámka: řádek se slovenským textem o ARS je záměrně slovensky (SK spotřebitel, § 4 ods. 1 písm. g) zák. 108/2024 Z.z.).
Odkazy https://adr.coi.cz a stránka MH SR „Zoznam subjektov ARS“ odpovídaly HTTP 200 dne 27. 10. 2026.
Věcná příslušnost: ČOI podle § 20e písm. d) zák. 634/1992 Sb., SOI podle § 3 ods. 2 písm. c) zák. 391/2015 Z.z.
Adresu příslušného inšpektorátu SOI jsem neověřil (soi.sk/kontakty vrátilo 404) – proto `[DOPLNIT]`.

## 3. Ochrana údajů (src/data/privacy.ts:6)
Opravit „Čsl. armády 1457“ → „Čsl. armády 1457/2A“ (shoda s ORSR). Hotový text je v `navrh-zasady-ou.md`.

## 4. „Od roku 2001“ (LEGAL-13)
Patička: `© {rok} AWCLEAN s.r.o. · od roku 2001` spojuje s.r.o. (zapsaná 7. 4. 2017) s rokem 2001.
Pokud zkušenost pochází od předchůdce/zakladatele: „© {rok} AWCLEAN s.r.o. · zkušenosti s čištěním od roku 2001“
nebo „značka AWCLEAN od roku 2001“ – [DOPLNIT: kdo činnost vykonával 2001–2017].
