import type { GalleryImage } from "./pages/types";
import { facadePhotos } from "./facadePhotos";
import { referenceExtras } from "./referenceExtras";
export const referenceFilters = [
  { value: "all", label: "Vše" },
  { value: "fasady", label: "Fasády" },
  { value: "strechy", label: "Střechy" },
  { value: "dlazby", label: "Dlažby" },
  { value: "prumysl", label: "Průmysl" },
  { value: "natery", label: "Nátěry" },
  { value: "historicke", label: "Historické fasády" },
  { value: "impregnace", label: "Impregnace" },
  { value: "pomniky", label: "Pomníky" },
  { value: "hlinikove", label: "Hliníkové fasády" },
  { value: "svetliky", label: "Světlíky" },
] as const;
export type ReferenceFilter = (typeof referenceFilters)[number]["value"];
export interface ReferenceWork extends GalleryImage {
  category: Exclude<ReferenceFilter, "all">;
}
export const referenceWorks: ReferenceWork[] = [
  ...facadePhotos.map((photo): ReferenceWork => ({ ...photo, category: "fasady" })),
  {
    src: "/images/realizace/cervena-fasada-po-cisteni.webp",
    alt: "Červená fasáda u okapového svodu po vyčištění.",
    category: "fasady",
    caption: "Čištění fasády",
    description: "Odstranění povlaku z červené omítky u okapového svodu.",
    href: "/reference/fasada-v-puvodnich-barvach/",
  },
  {
    src: "/images/realizace/tlakove-cisteni-strechy.webp",
    alt: "Pracovník čistí taškovou střechu tlakovou vodou.",
    category: "strechy",
    caption: "Čištění střechy",
    description: "Tlakové čištění taškové krytiny rodinného domu.",
  },
  {
    src: "/images/realizace/zamkova-dlazba-po-cisteni.webp",
    alt: "Žlutá a červená zámková dlažba po vyčištění.",
    category: "dlazby",
    caption: "Čištění zámkové dlažby",
    description: "Vyčištěná příjezdová cesta podél živého plotu.",
  },
  {
    src: "/images/realizace/svetliky-vyrobni-haly.webp",
    alt: "Světlíky nad výrobní linkou v průmyslové hale.",
    category: "prumysl",
    caption: "Čištění průmyslového objektu",
    description: "Péče o světlíky a konstrukce ve výrobní hale.",
  },
  {
    src: "/images/realizace/cihlova-fasada-po-cisteni.webp",
    alt: "Oranžové cihlové zdivo po vyčištění.",
    category: "historicke",
    caption: "Čištění cihlové fasády",
    description: "Cihlové zdivo po odstranění tmavých usazenin.",
  },
  {
    src: "/images/realizace/cervene-natrena-strecha-s-kominem.webp",
    alt: "Červeně natřená střecha s komínem.",
    category: "natery",
    caption: "Nátěr střechy",
    description: "Obnova červeného nátěru střešní krytiny.",
  },
  {
    src: "/images/realizace/svetla-fasada-po-cisteni.webp",
    alt: "Světlá fasáda s červeným svodem po vyčištění.",
    category: "fasady",
    caption: "Čištění světlé fasády",
    description: "Omítka s červeným svodem po vyčištění.",
  },
  {
    src: "/images/realizace/oranzova-strecha-zeleneho-rodinneho-domu-po-cisteni.webp",
    alt: "Oranžová střecha zeleného rodinného domu po čištění.",
    category: "strechy",
    caption: "Vyčištěná střecha rodinného domu",
    description: "Tašková krytina po čištění.",
  },
  {
    src: "/images/realizace/zluta-a-seda-dlazba-u-budovy-po-vycisteni.webp",
    alt: "Žlutá a šedá dlažba u budovy po vyčištění.",
    category: "dlazby",
    caption: "Čištění dlažby u budovy",
    description: "Žlutá a šedá dlažba po vyčištění.",
  },
  {
    src: "/images/realizace/pracovnici-na-lanech-pod-prosklenou-strechou.webp",
    alt: "Pracovníci na lanech pod prosklenou střechou.",
    category: "prumysl",
    caption: "Práce pod prosklenou střechou",
    description: "Přístup ke střešní konstrukci pomocí lezecké techniky.",
  },
  {
    src: "/images/realizace/impregnace-taskove-strechy.webp",
    alt: "Oranžová tašková střecha se sněhovými zachytávači.",
    category: "impregnace",
    caption: "Ošetření taškové střechy",
    description: "Impregnace krytiny včetně ploch u sněhových zachytávačů.",
  },
  {
    src: "/images/realizace/kamenna-socha-po-odstraneni-povlaku.webp",
    alt: "Kamenná socha po odstranění povlaku.",
    category: "pomniky",
    caption: "Čištění kamenné sochy",
    description: "Odstranění povlaku z kamenného povrchu.",
  },
  {
    src: "/images/realizace/pracovnici-na-lanech-cisti-prosklenou-a-hlinikovou-fasadu.webp",
    alt: "Pracovníci na lanech čistí prosklenou a hliníkovou fasádu.",
    category: "hlinikove",
    caption: "Čištění hliníkové fasády",
    description: "Péče o opláštění a prosklené části budovy.",
  },
  {
    src: "/images/realizace/prosvetleny-svetlik-nad-prumyslovou-halou.webp",
    alt: "Prosvětlený světlík nad průmyslovou halou.",
    category: "svetliky",
    caption: "Čištění světlíků",
    description: "Pohled na prosvětlenou střechu průmyslové haly.",
  },
  {
    src: "/images/realizace/stitova-stena-domu-po-vycisteni-pohled-zespodu.webp",
    alt: "Štítová stěna domu po vyčištění, pohled zespodu.",
    category: "fasady",
    caption: "Čištění štítové stěny",
    description: "Obnovený vzhled fasády po vyčištění.",
    href: "/reference/cistota-az-do-posledniho-metru/",
  },
  {
    src: "/images/realizace/cisteni-oranzove-fasady-bytoveho-domu-z-plosiny.webp",
    alt: "Čištění oranžové fasády bytového domu z plošiny.",
    category: "fasady",
    caption: "Čištění bytového domu",
    description: "Práce na fasádě z výškové plošiny.",
    href: "/reference/novy-vzhled-bytoveho-domu/",
  },
  {
    src: "/images/realizace/airless-nastrik-fasady.webp",
    alt: "Airless nástřik fasády z výškové plošiny.",
    category: "natery",
    caption: "Nátěr fasády",
    description: "Airless nástřik z pracovní plošiny.",
  },
  {
    src: "/images/realizace/strojni-cisteni-zamkove-dlazby-horkou-vodou.webp",
    alt: "Strojní čištění zámkové dlažby horkou vodou.",
    category: "dlazby",
    caption: "Strojní čištění dlažby",
    description: "Odstranění nečistot horkou vodou.",
  },
  ...referenceExtras,
];

// Úvod galerie ukazuje šíři práce. Pořadí uvnitř kategorií zůstává původní.
export function orderReferenceWorks(works: readonly ReferenceWork[]): ReferenceWork[] {
  const leadCategories: ReferenceWork["category"][] = ["fasady", "strechy", "dlazby", "prumysl", "historicke", "natery"];
  const first = leadCategories.flatMap((category) => {
    const work = works.find((item) => item.category === category);
    return work ? [work] : [];
  });
  const selected = new Set(first.map((work) => work.src));
  return [...first, ...works.filter((work) => !selected.has(work.src))];
}
