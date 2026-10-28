export interface FaqItem {
  id: string;
  category: "cena" | "postup" | "zaruka";
  question: string;
  answer: string;
}
export type FaqCategory = "vse" | FaqItem["category"];
export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "vse", label: "Vše" },
  { id: "cena", label: "Cena a nabídka" },
  { id: "postup", label: "Postup" },
  { id: "zaruka", label: "Záruka a technika" },
];
export const faqItems: FaqItem[] = [
  {
    id: "leseni", category: "postup",
    question: "Potřebuji na čištění fasády lešení?",
    answer: "Doktor radí: Lešení běžně nepotřebujete. AWCLEAN využívá lezeckou techniku a pracovní plošiny. Vhodný přístup k vašemu domu domluvíme při posouzení objektu.",
  },
  {
    id: "delka", category: "postup",
    question: "Jak dlouho čištění trvá?",
    // TODO: Firma potvrdí orientační délku podle rozsahu; neslibovat konkrétní termín.
    answer: "Doktor radí: Záleží na velikosti plochy, znečištění, přístupnosti a počasí. Po prohlídce vám navrhneme postup i předpokládanou dobu práce. Bez znalosti objektu počet dnů neslibujeme.",
  },
  {
    id: "chemie", category: "zaruka",
    question: "Nepoškodí chemie fasádu nebo okolní zeleň?",
    // TODO: Firma doplní konkrétní ochranu zeleně a omezení jednotlivých přípravků.
    answer: "Doktor radí: Čisticí prostředek, tlak i dobu působení volíme podle materiálu a stavu fasády. Předem upozorněte na citlivé povrchy a zeleň u domu. Způsob jejich ochrany domluvíme před zahájením práce; univerzální bezrizikovost každého přípravku neslibujeme.",
  },
  {
    id: "zaruka", category: "zaruka",
    question: "Jak funguje záruka 5, 10 nebo 20 let?",
    // TODO: Firma potvrdí přesné podmínky, rozsah a výluky jednotlivých záruk.
    answer: "Doktor radí: Délka záruky závisí na vybraném ošetření a jeho podmínkách. AWCLEAN uvádí varianty 5, 10 a 20 let. Konkrétní rozsah a podmínky si nechte upřesnit v nabídce pro váš objekt.",
  },
  {
    id: "vzorek", category: "cena",
    question: "Je referenční vzorek opravdu zdarma?",
    answer: "Doktor radí: Ano, ukázku čištění fasád, střech a dlažeb nabízíme po celé České republice zdarma. Na malé ploše uvidíte výsledek a pak se rozhodnete. U ostatních služeb si možnost ukázky domluvte individuálně.",
  },
  {
    id: "pusobnost", category: "postup",
    question: "Působíte po celé České republice?",
    answer: "Doktor radí: Ano, AWCLEAN působí po celé ČR i na Slovensku. Do poptávky napište místo realizace a typ povrchu, abychom mohli domluvit další postup.",
  },
  {
    id: "ochrana", category: "zaruka",
    question: "Co když fasáda potřebuje také nátěr nebo impregnaci?",
    answer: "Doktor radí: Nejdřív posoudíme stav podkladu. Vedle čištění nabízíme impregnaci fasád a střech i nátěry technologií airless. Doporučíme řešení podle povrchu a vašich požadavků.",
  },
  {
    id: "posudek", category: "cena",
    question: "Jak získám posudek a nabídku?",
    answer: "Doktor radí: Zavolejte na +420 773 196 097 nebo vyplňte kontaktní formulář. Popište objekt, jeho stav a místo realizace. Domluvíme posouzení a připravíme nezávaznou nabídku; posudky nabízíme po celé ČR zdarma.",
  },
  {
    id: "cena", category: "cena",
    question: "Kolik bude čištění stát?",
    // TODO: Ceník nebyl dodán; konkrétní ceny stanoví firma po posouzení.
    answer: "Doktor radí: Cena záleží na ploše, druhu povrchu, znečištění a přístupu. Napište nám základní údaje o objektu. Přesnou cenu vám připravíme v přehledné a nezávazné individuální nabídce.",
  },
];
const normalize = (value: string): string =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("cs");
export function filterFaq(category: FaqCategory, query: string): FaqItem[] {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return faqItems.filter((item) =>
    (category === "vse" || item.category === category) &&
    terms.every((term) => normalize(`${item.question} ${item.answer}`).includes(term)),
  );
}
/** FAQPage only for the questions actually shown on the page (Google requires visible content). */
export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question", name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});
