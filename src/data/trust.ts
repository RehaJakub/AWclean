export interface TrustItem {
  icon: "shield" | "press" | "sample";
  title: string;
  detail: string;
  href: string;
}
export const trustItems: TrustItem[] = [
  {
    icon: "shield",
    title: "Záruka 5 / 10 / 20 let",
    detail: "Dle zvoleného ošetření",
    href: "#proc-awclean",
  },
  {
    icon: "press",
    title: "Psali o nás v Dům a Byt",
    detail: "Přečtěte si reportáž",
    href: "/psali-o-nas/",
  },
  {
    icon: "sample",
    title: "Ukázka čištění zdarma",
    detail: "Fasády, střechy a dlažby",
    href: "/kontakt/",
  },
];
