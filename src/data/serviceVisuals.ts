// Obrazová a navigační doplnění šablony služby podle návrhu z Claude Design
// (16. 10. 2026). Texty zůstávají v src/data/pages; zde jsou jen výběry
// skutečných fotografií a otázek, které se ke službě zobrazí.
import type { FaqItem } from "./faq";

const photo = (name: string): string => `/images/realizace/${name}.webp`;

/** Fotografie k obsahovým blokům služby, v pořadí sekcí. */
export const serviceBlockImages: Record<string, string[]> = {
  "/cisteni-fasad/": [
    photo("pracovni-plosina-pred-vysokym-bytovym-domem"),
    photo("tlakove-cisteni-svetle-fasady-u-okna"),
    photo("svetla-fasada-rodinneho-domu-po-cisteni"),
    photo("zkusebni-vycistena-plocha-na-fasade-domu-cislo-597"),
  ],
  "/cisteni-strech/": [
    photo("taskova-strecha-s-rozdilem-mezi-vycistenou-a-znecistenou-casti"),
    photo("detail-cistych-tasek-po-odstraneni-necistot"),
    photo("impregnace-taskove-strechy"),
  ],
  "/cisteni-dlazeb/": [
    photo("zamkova-dlazba-behem-cisteni-s-viditelnym-rozdilem-povrchu"),
    photo("vycistena-zluta-a-cervena-zamkova-dlazba-u-ziveho-plotu"),
    photo("detail-osetrene-zamkove-dlazby-s-kapkami-vody"),
  ],
  "/cisteni-prumyslovych-objektu/": [
    photo("pracovnik-na-lane-cisti-vysokou-stenu-haly"),
    photo("vyskove-plosiny-podel-cihlove-prumyslove-haly"),
    photo("cihlova-fasada-prumyslove-haly-po-cisteni"),
  ],
  "/cisteni-svetliku/": [
    photo("pohled-vzhuru-na-prosvetleny-svetlik-haly"),
    photo("pracovnici-na-lanech-pod-prosklenou-strechou"),
  ],
  "/cisteni-hlinikovych-fasad/": [
    photo("porovnani-tmaveho-a-vycisteneho-oplasteni-budovy"),
    photo("pracovnici-na-lanech-cisti-prosklenou-a-hlinikovou-fasadu"),
  ],
  "/cisteni-historickych-fasad/": [
    photo("detail-oranzoveho-cihloveho-zdiva-po-cisteni"),
    photo("detail-znecisteneho-cihloveho-zdiva"),
  ],
  "/ostatni-sluzby/cisteni-pomniku/": [
    photo("kamenna-socha-se-zelenym-povlakem-pred-cistenim"),
    photo("detail-podstavce-kamenneho-pomniku-po-cisteni"),
  ],
  "/natery-strech-a-fasad/": [
    photo("rozpracovany-nater-cervene-strechy-kolem-komina"),
    photo("nastrik-fasady-prumyslove-haly-z-plosiny"),
  ],
  "/impregnace-fasad-a-strech/": [
    photo("porovnani-stresni-krytiny-pred-impregnaci-a-po-ni"),
    photo("porovnani-vzhledu-stresnich-tasek-pri-impregnaci"),
    photo("detail-oranzovych-stresnich-tasek-po-osetreni"),
  ],
  "/ostatni-sluzby/nano-impregnace/": [
    photo("detail-zamkove-dlazby-s-kapkami-vody"),
    photo("zamkova-dlazba-vedle-domu-pri-osetrovani-povrchu"),
    photo("osetrena-zamkova-dlazba-na-prijezdove-ceste"),
  ],
  // Odstraňování dopravního značení zatím nemá vlastní fotografie (CONTENT-NOTES).
};

/** Náhledy položek menu, které nejsou samostatnou stránkou služby. */
export const navThumbnails: Record<string, string> = {
  "/natery-strech-a-fasad/#natery-strech": photo("cervene-natrena-strecha-s-kominem"),
  "/natery-strech-a-fasad/#natery-fasad": photo("airless-nastrik-fasady"),
};

const facadeFaq: FaqItem["id"][] = ["leseni", "delka", "chemie", "zaruka", "vzorek", "pusobnost"];
const generalFaq: FaqItem["id"][] = ["posudek", "cena", "vzorek", "pusobnost"];

/** Otázky z FAQ DR Fasády zobrazené na stránce služby. */
export function serviceFaqIds(path: string): FaqItem["id"][] {
  return [
    "/cisteni-fasad/",
    "/cisteni-hlinikovych-fasad/",
    "/cisteni-historickych-fasad/",
  ].includes(path)
    ? facadeFaq
    : generalFaq;
}
