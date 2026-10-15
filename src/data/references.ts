export interface Reference {
  title: string;
  description: string;
  image: string;
  afterImage?: string;
  href: string;
}
export const references: Reference[] = [
  {
    title: "Fasáda v původních barvách",
    description: "Odstranění řas a usazených nečistot",
    image: "/images/realizace/cervena-fasada-pred-a-po-cisteni.webp",
    href: "/reference/fasada-v-puvodnich-barvach/",
  },
  {
    title: "Nový vzhled bytového domu",
    description: "Čištění fasády z pracovní plošiny",
    image: "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp",
    href: "/reference/novy-vzhled-bytoveho-domu/",
  },
  {
    title: "Čistota až do posledního metru",
    description: "Fasáda před čištěním a po zásahu týmu AWCLEAN",
    image: "/images/realizace/znecistena-stitova-stena-domu-pred-cistenim-2.webp",
    afterImage:
      "/images/realizace/stitova-stena-domu-po-vycisteni-pohled-zespodu-2.webp",
    href: "/reference/cistota-az-do-posledniho-metru/",
  },
];
export interface Comparison {
  projectPath?: string;
  image: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  result: string;
  title: string;
  description: string;
}
export const comparisons: Comparison[] = [
  {
    title: "Červená fasáda u okapového svodu",
    projectPath: "/reference/fasada-v-puvodnich-barvach/",
    result: "Odstranění povlaku z fasády",
    description:
      "Stejný detail fasády před čištěním a po něm. Vyčištěná omítka má znovu viditelnou červenou barvu.",
    image: "/images/realizace/cervena-fasada-pred-cistenim.webp",
    afterImage: "/images/realizace/cervena-fasada-po-cisteni.webp",
    beforeAlt: "Červená fasáda u okapového svodu před čištěním.",
    afterAlt: "Červená fasáda u okapového svodu po vyčištění.",
  },
  {
    title: "Cihlová fasáda průmyslové haly",
    result: "Vyčištění cihlového zdiva",
    description:
      "Stejná část cihlového zdiva před odstraněním usazenin a po vyčištění.",
    image: "/images/realizace/cihlova-fasada-pred-cistenim.webp",
    afterImage: "/images/realizace/cihlova-fasada-po-cisteni.webp",
    beforeAlt: "Tmavé usazeniny na cihlové fasádě před čištěním.",
    afterAlt: "Oranžové cihlové zdivo po vyčištění.",
  },
  {
    title: "Světlá fasáda s červeným svodem",
    result: "Odstranění tmavých nečistot z omítky",
    description:
      "Stejná stěna před čištěním a po dokončení práce. Fotografie mají mírně odlišný úhel záběru.",
    image:
      "/images/realizace/svetla-fasada-pred-cistenim.webp",
    afterImage: "/images/realizace/svetla-fasada-po-cisteni.webp",
    beforeAlt: "Znečištěná světlá fasáda s červeným svodem před čištěním.",
    afterAlt: "Světlá fasáda s červeným svodem po vyčištění.",
  },
];
