export interface HeroSlide {
  id: string;
  label: string;
  heading: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
  position: string;
  mobilePosition?: string;
  href: string;
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "fasady",
    label: "Čištění fasád",
    heading: "Čistá fasáda.",
    accent: "Nový dojem.",
    description:
      "Vracíme fasádám původní barvu. Rychle, efektivně a bez lešení.",
    image:
      "/images/fasady-nove/cisteni-zelenooranzove-fasady-bytoveho-domu-z-plosiny.webp",
    alt: "Pracovníci na plošině čistí zelenooranžovou fasádu bytového domu; na zelené části je vidět rozdíl mezi znečištěnou a vyčištěnou plochou.",
    position: "50% 60%",
    mobilePosition: "85% 50%",
    href: "/cisteni-fasad/",
  },
  {
    id: "strechy",
    label: "Čištění střech",
    heading: "Čistá střecha.",
    accent: "Krása celého domu.",
    description:
      "Odstraníme mech, řasy i lišejníky. Ošetření přizpůsobíme vaší střeše.",
    image: "/images/realizace/cisteni-taskove-strechy.webp",
    alt: "Vyčištěná tašková střecha při práci týmu AWCLEAN",
    position: "50% 44%",
    href: "/cisteni-strech/",
  },
  {
    id: "dlazby",
    label: "Čištění dlažeb",
    heading: "Čistota až do",
    accent: "posledního metru.",
    description:
      "Důkladná péče o dlažby, terasy a příjezdové cesty. S technikou, která má sílu.",
    image: "/images/realizace/vycistena-zahradni-dlazba.webp",
    alt: "Vyčištěná zámková dlažba na zahradní cestě.",
    position: "50% 52%",
    href: "/cisteni-dlazeb/",
  },
];
