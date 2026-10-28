// Návrh náhrady src/data/privacy.ts (LEGAL-2/4/5). Technický návrh, ne právní rada.
// [DOPLNIT: …] musí doplnit nebo potvrdit firma; před nasazením projít s právníkem/DPO.
// Skutečnosti o webu odpovídají kódu commitu 33c79c3; údaje o firmě ORSR/RÚZ/VIES k 27. 10. 2026.
import type { ContentSection } from "./pages/types";
export const privacySections: ContentSection[] = [
  {
    title: "Kdo je správce",
    paragraphs: [
      "Správcem osobních údajů je AWCLEAN s.r.o., IČO 50823272, se sídlem Čsl. armády 1457/2A, 955 01 Topoľčany, Slovenská republika, zapsaná v Obchodnom registri Okresného súdu Nitra, oddiel Sro, vložka č. 43001/N.",
      "Kontakt pro otázky k osobním údajům: info@awclean.cz, telefon +420 773 196 097. Kontaktní adresa v České republice: Na Výsluní 298, 294 28 Chotětov.",
      "Pověřence pro ochranu osobních údajů jsme nejmenovali. [DOPLNIT: potvrdit, že pověřenec není jmenován; pokud ano, uvést jeho kontakt.]",
    ],
  },
  {
    title: "Jaké údaje, proč a na jakém právním základě",
    paragraphs: [
      "Zpracováváme jen údaje, které nám sami pošlete formulářem, e-mailem nebo sdělíte telefonicky, a údaje vzniklé při plnění zakázky.",
    ],
    bullets: [
      "Vyřízení poptávky a příprava nabídky (jméno a příjmení, telefon, e-mail, obsah zprávy, případně adresa a popis objektu). Právní základ: provedení opatření před uzavřením smlouvy na vaši žádost, čl. 6 odst. 1 písm. b) GDPR.",
      "Uzavření a plnění smlouvy, včetně ukázky čištění na místě, realizace a komunikace k zakázce (identifikační a kontaktní údaje, adresa realizace, fakturační údaje). Právní základ: plnění smlouvy, čl. 6 odst. 1 písm. b) GDPR.",
      "Vedení účetnictví a daňové povinnosti (údaje na fakturách a účetních dokladech). Právní základ: plnění právní povinnosti, čl. 6 odst. 1 písm. c) GDPR. [DOPLNIT: předpisy, podle kterých firma doklady uchovává.]",
      "Uplatnění a obhajoba právních nároků, zejména z odpovědnosti za vady a ze záruky (údaje o zakázce a komunikace). Právní základ: oprávněný zájem správce na ochraně svých práv, čl. 6 odst. 1 písm. f) GDPR.",
      "Ochrana formuláře před spamem a zneužitím (technické údaje o požadavku, např. IP adresa a údaje o prohlížeči). Právní základ: oprávněný zájem správce na bezpečném provozu webu, čl. 6 odst. 1 písm. f) GDPR. [DOPLNIT: jen pokud bude nasazen Cloudflare Turnstile nebo jiná ochrana; jinak odstranit.]",
    ],
  },
  {
    title: "Oprávněné zájmy",
    paragraphs: [
      "Tam, kde zpracování zakládáme na oprávněném zájmu, jde o zájem doložit, co bylo se zákazníkem dohodnuto a provedeno, uplatnit nebo bránit své nároky a chránit web a schránku před spamem a útoky. Proti takovému zpracování můžete kdykoli vznést námitku (viz Vaše práva).",
    ],
  },
  {
    title: "Musíte nám údaje poskytnout?",
    paragraphs: [
      "Poskytnutí údajů ve formuláři je dobrovolné. Bez jména, kontaktu a popisu požadavku ale poptávku nedokážeme vyřídit ani připravit nabídku. Údaje potřebné k uzavření smlouvy a vystavení dokladu jsou smluvním požadavkem; bez nich smlouvu uzavřít nelze.",
    ],
  },
  {
    title: "Kdo k údajům má přístup",
    paragraphs: [
      "Údaje nikomu neprodáváme a nepoužíváme je k reklamě. Zpracovávají je naši pracovníci, kteří poptávku vyřizují. Dále mohou mít k údajům přístup tito zpracovatelé a příjemci:",
    ],
    bullets: [
      "Poskytovatel webhostingu, na kterém běží web a skript formuláře: [DOPLNIT: název, sídlo, země serverů].",
      "Poskytovatel e-mailových schránek a odesílání pošty (SMTP): [DOPLNIT: název, sídlo, země serverů].",
      "Cloudflare, Inc., USA – služba Turnstile pro ochranu formuláře před roboty. [DOPLNIT: jen pokud bude nasazena; sídlo podle aktuální DPA Cloudflare.]",
      "Účetní nebo daňový poradce: [DOPLNIT: název nebo kategorie].",
      "Orgány veřejné moci, pokud nám to ukládá právní předpis.",
    ],
  },
  {
    title: "Předávání mimo EU",
    paragraphs: [
      "Údaje zpracováváme v Evropské unii. [DOPLNIT podle skutečnosti: pokud hosting i e-mail běží v EU a Turnstile se nepoužije, ponechat jen tuto větu.]",
      "Při použití služby Cloudflare Turnstile mohou být technické údaje o požadavku předány společnosti Cloudflare, Inc. v USA. Předání se opírá o rozhodnutí Evropské komise o odpovídající ochraně podle rámce EU–USA pro ochranu osobních údajů (EU-U.S. Data Privacy Framework, prováděcí rozhodnutí (EU) 2023/1795), u něhož je Cloudflare certifikována, a doplňkově o standardní smluvní doložky. Kopii záruk vám na požádání poskytneme. [DOPLNIT: ověřit aktuální certifikaci Cloudflare na dataprivacyframework.gov před nasazením.]",
    ],
  },
  {
    title: "Jak dlouho údaje uchováváme",
    bullets: [
      "Poptávka, ze které nevznikne zakázka: [DOPLNIT: např. 12 měsíců] od posledního kontaktu, poté ji smažeme.",
      "Údaje ze smlouvy a komunikace k zakázce: po dobu trvání smlouvy a dále po dobu, kdy lze uplatnit práva z vad a ze záruky, nejdéle [DOPLNIT: lhůta podle nejdelší poskytnuté záruky a promlčení].",
      "Účetní a daňové doklady: po dobu stanovenou právními předpisy. [DOPLNIT: konkrétní lhůty a předpisy.]",
      "Technické údaje ochrany formuláře: [DOPLNIT: podle nastavení hostingu a Cloudflare].",
    ],
    paragraphs: [],
  },
  {
    title: "Vaše práva",
    paragraphs: [
      "Máte tato práva podle čl. 15 až 21 GDPR. Žádost pošlete na info@awclean.cz; odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.",
    ],
    bullets: [
      "Právo na přístup k osobním údajům a na kopii",
      "Právo na opravu nepřesných nebo doplnění neúplných údajů",
      "Právo na výmaz, pokud údaje už nepotřebujeme a nebrání tomu zákonná povinnost",
      "Právo na omezení zpracování",
      "Právo vznést námitku proti zpracování založenému na oprávněném zájmu",
      "Právo na přenositelnost údajů, které jste nám poskytli a které zpracováváme automatizovaně na základě smlouvy",
    ],
  },
  {
    title: "Stížnost u dozorového úřadu",
    paragraphs: [
      "Pokud se domníváte, že zpracováním porušujeme předpisy, můžete podat stížnost u dozorového úřadu, zejména v členském státě svého bydliště, místa výkonu práce nebo místa údajného porušení (čl. 77 GDPR).",
      "Úřad sídla správce: Úrad na ochranu osobných údajov Slovenskej republiky, Galvaniho Business Centrum II, Galvaniho 7/B, 821 04 Bratislava, https://dataprotection.gov.sk.",
      "Pro osoby z České republiky: Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, https://uoou.gov.cz.",
    ],
  },
  {
    title: "Automatizované rozhodování",
    paragraphs: [
      "Nerozhodujeme o vás automatizovaně a neprovádíme profilování.",
    ],
  },
  {
    title: "Cookies a místní úložiště",
    paragraphs: [
      "Web nepoužívá analytické ani reklamní cookies, měřicí kódy ani reklamní pixely. Fotografie a písma se načítají z našeho serveru. Facebook a YouTube jsou pouze odkazy; po kliknutí přecházíte do externí služby s vlastními pravidly.",
      "Jediné, co web ukládá do vašeho prohlížeče, je vaše volba v okně Spravovat souhlas: kategorie a datum uložení pod klíčem awclean-consent-v1 v místním úložišti, na 180 dní. Nikam ji neodesíláme.",
      "Údaje rozepsané ve formuláři se do prohlížeče neukládají. Pomocník DR Fasáda si nic neukládá; hledané výrazy se neukládají ani neodesílají.",
      "Při použití služby Cloudflare Turnstile se kvůli ochraně formuláře zpracují technické údaje o prohlížeči a požadavku. [DOPLNIT: jen pokud bude nasazena; ověřit, zda Turnstile ukládá data do koncového zařízení.]",
      "Cookies a data webu můžete smazat v nastavení prohlížeče.",
    ],
  },
  {
    title: "Změny zásad",
    paragraphs: [
      "Tyto zásady platí od [DOPLNIT: datum]. Změny zveřejníme na této stránce.",
    ],
  },
];
