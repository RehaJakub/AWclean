import type { ContentSection } from "./pages/types";
import { analyticsEnabled } from "../lib/analytics";
// Texty o Google Analytics se zobrazí jen v buildu s nastaveným VITE_GA_ID.
const ga = <T,>(...items: T[]): T[] => (analyticsEnabled ? items : []);
export const privacySections: ContentSection[] = [
  {
    title: "Kdo je správce",
    paragraphs: [
      "Správcem osobních údajů je AWCLEAN s.r.o., IČO 50823272, se sídlem Čsl. armády 1457/2A, 955 01 Topoľčany, Slovenská republika, zapsaná v Obchodnom registri Okresného súdu Nitra, oddiel Sro, vložka č. 43001/N.",
      "Kontakt pro otázky k osobním údajům: info@awclean.cz, telefon +420 773 196 097. Kontaktní adresa v České republice: Na Výsluní 298, 294 28 Chotětov.",
         ],
  },
  {
    title: "Jaké údaje, proč a na jakém právním základě",
    paragraphs: [
      "Zpracováváme jen údaje, které nám sami pošlete formulářem, e-mailem nebo sdělíte telefonicky, a údaje vzniklé při plnění zakázky.",
    ],
    bullets: [
      "Vyřízení poptávky a příprava nabídky (jméno a příjmení, telefon, e-mail, obsah zprávy, případně adresa a popis objektu). Právní základ: provedení opatření před uzavřením smlouvy na vaši žádost, čl. 6 odst. 1 písm. b) GDPR.",
      "Uzavření a plnění smlouvy, včetně ukázky čištění na místě, realizace a komunikace k zakázce (identifikační a kontaktní údaje, adresa realizace, fakturační údaje). Právní základ: plnění smlouvy, čl. 6 odst. 1 písm. b) GDPR.",
      "Vedení účetnictví a daňové povinnosti (údaje na fakturách a účetních dokladech). Právní základ: plnění právní povinnosti, čl. 6 odst. 1 písm. c) GDPR.",
      "Uplatnění a obhajoba právních nároků, zejména z odpovědnosti za vady a ze záruky (údaje o zakázce a komunikace). Právní základ: oprávněný zájem správce na ochraně svých práv, čl. 6 odst. 1 písm. f) GDPR.",
      "Ochrana formuláře před spamem a zneužitím (technické údaje o požadavku, zejména IP adresa uložená jen jako jednosměrný otisk pro omezení počtu odeslání). Právní základ: oprávněný zájem správce na bezpečném provozu webu, čl. 6 odst. 1 písm. f) GDPR.",
      ...ga("Měření návštěvnosti webu přes Google Analytics 4 (údaje o zařízení a prohlížeči, navštívené stránky, přibližná poloha odvozená z IP adresy, identifikátory v cookies, odeslání poptávky bez jejího obsahu). Právní základ: váš souhlas, čl. 6 odst. 1 písm. a) GDPR. Souhlas můžete kdykoli odvolat tlačítkem Spravovat souhlas v patičce."),
    ],
  },
  {
    title: "Oprávněné zájmy",
    paragraphs: [
      "Tam, kde zpracování zakládáme na oprávněném zájmu, jde o zájem doložit, co bylo se zákazníkem dohodnuto a provedeno, uplatnit nebo bránit své nároky a chránit web a schránku před spamem a útoky. Proti takovému zpracování můžete kdykoli vznést námitku (viz Vaše práva).",
    ],
  },
  {
    title: "Musíte nám údaje poskytnout?",
    paragraphs: [
      "Poskytnutí údajů ve formuláři je dobrovolné. Bez jména, kontaktu a popisu požadavku ale poptávku nedokážeme vyřídit ani připravit nabídku. Údaje potřebné k uzavření smlouvy a vystavení dokladu jsou smluvním požadavkem; bez nich smlouvu uzavřít nelze.",
    ],
  },
  {
    title: "Kdo k údajům má přístup",
    paragraphs: [
      "Údaje nikomu neprodáváme a nepoužíváme je k reklamě. Zpracovávají je naši pracovníci, kteří poptávku vyřizují. Dále mohou mít k údajům přístup tito zpracovatelé a příjemci:",
    ],
    bullets: [
      "Poskytovatel webhostingu, na kterém běží web a skript formuláře.",
      "Poskytovatel e-mailových schránek a odesílání pošty.",
      "Účetní nebo daňový poradce.",
      ...ga("Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irsko – služba Google Analytics 4, jen pokud jste povolili analytické cookies."),
      "Orgány veřejné moci, pokud nám to ukládá právní předpis.",
    ],
  },
  {
    title: "Předávání mimo EU",
    paragraphs: [
      analyticsEnabled
        ? "Údaje z formuláře a o zakázkách nepředáváme do zemí mimo Evropskou unii. Při měření návštěvnosti (jen s vaším souhlasem) mohou být údaje předány společnosti Google LLC v USA. Předání se opírá o rozhodnutí Evropské komise o odpovídající ochraně podle rámce EU–USA pro ochranu osobních údajů (EU-U.S. Data Privacy Framework), u něhož je Google certifikován."
        : "Osobní údaje nemáme v úmyslu předávat do zemí mimo Evropskou unii ani mezinárodním organizacím.",
    ],
  },
  {
    title: "Jak dlouho údaje uchováváme",
    bullets: [
      "Poptávka, ze které nevznikne zakázka: po dobu potřebnou k jejímu vyřízení a navazující komunikaci, poté ji smažeme.",
      "Údaje ze smlouvy a komunikace k zakázce: po dobu trvání smlouvy a dále po dobu, kdy lze uplatnit práva z vad a ze záruky a související nároky.",
      "Účetní a daňové doklady: po dobu stanovenou právními předpisy, obvykle 10 let.",
      "Technické údaje ochrany formuláře: nejvýše 24 hodin.",
      ...ga("Údaje Google Analytics: 14 měsíců od pořízení; cookies _ga a _ga_* až 2 roky, pokud je dříve nesmažete nebo souhlas neodvoláte."),
    ],
    paragraphs: [],
  },
  {
    title: "Vaše práva",
    paragraphs: [
      "Máte tato práva podle čl. 15 až 21 GDPR. Žádost pošlete na info@awclean.cz; odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.",
    ],
    bullets: [
      "Právo na přístup k osobním údajům a na kopii",
      "Právo na opravu nepřesných nebo doplnění neúplných údajů",
      "Právo na výmaz, pokud údaje už nepotřebujeme a nebrání tomu zákonná povinnost",
      "Právo na omezení zpracování",
      "Právo vznést námitku proti zpracování založenému na oprávněném zájmu",
      "Právo na přenositelnost údajů, které jste nám poskytli a které zpracováváme automatizovaně na základě smlouvy",
    ],
  },
  {
    title: "Stížnost u dozorového úřadu",
    paragraphs: [
      "Pokud se domníváte, že zpracováním porušujeme předpisy, můžete podat stížnost u dozorového úřadu, zejména v členském státě svého bydliště, místa výkonu práce nebo místa údajného porušení (čl. 77 GDPR).",
      "Úřad sídla správce: Úrad na ochranu osobných údajov Slovenskej republiky, Galvaniho Business Centrum II, Galvaniho 7/B, 821 04 Bratislava, https://dataprotection.gov.sk.",
      "Pro osoby z České republiky: Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, https://uoou.gov.cz.",
    ],
  },
  {
    title: "Automatizované rozhodování",
    paragraphs: [
      "Nerozhodujeme o vás automatizovaně a neprovádíme profilování.",
    ],
  },
  {
    title: "Cookies a místní úložiště",
    paragraphs: [
      analyticsEnabled
        ? "Analytické cookies Google Analytics 4 (_ga, _ga_*) použijeme jen s vaším souhlasem; bez něj se měřicí kód vůbec nenačte. Reklamní cookies ani reklamní pixely nepoužíváme. Fotografie a písma se načítají z našeho serveru. Facebook a YouTube jsou pouze odkazy; po kliknutí přecházíte do externí služby s vlastními pravidly."
        : "Web nepoužívá analytické ani reklamní cookies, měřicí kódy ani reklamní pixely. Fotografie a písma se načítají z našeho serveru. Facebook a YouTube jsou pouze odkazy; po kliknutí přecházíte do externí služby s vlastními pravidly.",
      "Jediné, co web ukládá do vašeho prohlížeče, je vaše volba v okně Spravovat souhlas: kategorie a datum uložení pod klíčem awclean-consent-v1 v místním úložišti, na 180 dní. Nikam ji neodesíláme.",
      "Údaje rozepsané ve formuláři se do prohlížeče neukládají. Pomocník DR Fasáda si nic neukládá; hledané výrazy se neukládají ani neodesílají.",
      "Svou volbu v okně Spravovat souhlas můžete kdykoli změnit nebo odvolat. Cookies a data webu můžete smazat v nastavení prohlížeče.",
    ],
  },
  {
    title: "Změny zásad",
    paragraphs: [
      "Tyto zásady platí od 28. 10. 2026. Změny zveřejníme na této stránce.",
    ],
  },
];
