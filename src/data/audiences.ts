// Pouze služby a typy objektů uvedené v existujících podkladech AWCLEAN.
export const audiences = [
  { id: "dum", title: "Rodinný dům", description: "Fasáda, střecha i cesta kolem domu.", services: ["/cisteni-fasad/", "/cisteni-strech/", "/cisteni-dlazeb/"], reference: "fasady" },
  { id: "svj", title: "SVJ a bytový dům", description: "Péče o fasádu a společné venkovní plochy.", services: ["/cisteni-fasad/", "/cisteni-dlazeb/", "/impregnace-fasad-a-strech/"], reference: "fasady" },
  { id: "firma", title: "Firma a průmysl", description: "Haly, světlíky a opláštění budov.", services: ["/cisteni-prumyslovych-objektu/", "/cisteni-svetliku/", "/cisteni-hlinikovych-fasad/"], reference: "prumysl" },
] as const;
