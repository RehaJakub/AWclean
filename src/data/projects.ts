import type { GalleryImage } from "./pages/types";
export interface Project {
  path: string;
  title: string;
  description: string;
  image: string;
  gallery: GalleryImage[];
  servicePath: string;
  facts: { label: string; value: string }[];
  outcome: string;
  comparison?: { before: string; after: string; beforeAlt: string; afterAlt: string };
}
export const projects: Project[] = [
  {
    path: "/reference/fasada-v-puvodnich-barvach/",
    title: "Fasáda v původních barvách",
    description:
      "Detail fasády před čištěním a po odstranění biologických povlaků.",
    image: "/images/realizace/cervena-fasada-pred-a-po-cisteni.webp",
    gallery: [
      {
        src: "/images/realizace/cervena-fasada-pred-a-po-cisteni.webp",
        alt: "Detail červené fasády před čištěním a po něm.",
      },
    ],
    servicePath: "/cisteni-fasad/",
    facts: [
      { label: "Povrch", value: "Červená omítka u okapového svodu" },
      { label: "Provedená práce", value: "Odstranění biologického povlaku" },
      { label: "Dokumentace", value: "Stejný detail před čištěním a po něm" },
    ],
    outcome: "Na vyčištěné části je znovu vidět původní červená barva omítky.",
    comparison: {
      before: "/images/realizace/cervena-fasada-pred-cistenim.webp",
      after: "/images/realizace/cervena-fasada-po-cisteni.webp",
      beforeAlt: "Červená omítka u svodu pokrytá nečistotami před čištěním.",
      afterAlt: "Červená omítka u stejného svodu po vyčištění.",
    },
  },
  {
    path: "/reference/novy-vzhled-bytoveho-domu/",
    title: "Nový vzhled bytového domu",
    description:
      "Čištění fasády z pracovní plošiny a pohled na obnovený povrch. Fotografie zachycují objekt z různých úhlů.",
    image: "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp",
    gallery: [
      {
        src: "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp",
        alt: "Bytový dům během čištění z plošiny a po dokončení.",
      },
    ],
    servicePath: "/cisteni-fasad/",
    facts: [
      { label: "Objekt", value: "Bytový dům" },
      { label: "Provedená práce", value: "Čištění fasády z pracovní plošiny" },
      { label: "Dokumentace", value: "Průběh práce a výsledek z různých úhlů" },
    ],
    outcome: "Fotografie zachycují čištění z plošiny a obnovený vzhled fasády.",
  },
  {
    path: "/reference/cistota-az-do-posledniho-metru/",
    title: "Čistota až do posledního metru",
    description:
      "Stejná fasáda před zásahem a po vyčištění týmem AWCLEAN. Dva samostatné snímky z různých úhlů ukazují rozdíl v povrchu budovy.",
    image: "/images/realizace/stitova-stena-domu-po-vycisteni-pohled-zespodu-2.webp",
    gallery: [
      {
        src: "/images/realizace/znecistena-stitova-stena-domu-pred-cistenim-2.webp",
        alt: "Znečištěná štítová stěna domu před čištěním.",
      },
      {
        src: "/images/realizace/stitova-stena-domu-po-vycisteni-pohled-zespodu-2.webp",
        alt: "Štítová stěna domu po vyčištění, pohled zespodu.",
      },
    ],
    servicePath: "/cisteni-fasad/",
    facts: [
      { label: "Povrch", value: "Štítová stěna domu" },
      { label: "Provedená práce", value: "Vyčištění fasády" },
      { label: "Dokumentace", value: "Před a po, snímky z různých úhlů" },
    ],
    outcome: "Dva snímky ukazují rozdíl mezi znečištěným a vyčištěným povrchem.",
  },
];
