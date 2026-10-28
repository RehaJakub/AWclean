export interface Contact {
  label: string;
  phone: string;
  href: string;
}
export const contacts: Contact[] = [
  {
    label: "Česká republika · NON-STOP",
    phone: "+420 773 196 097",
    href: "tel:+420773196097",
  },
  { label: "Slovensko", phone: "+421 907 245 573", href: "tel:+421907245573" },
  { label: "Slovensko", phone: "+421 918 236 688", href: "tel:+421918236688" },
];
export const emails: string[] = ["info@awclean.cz", "info@awclean.sk"];
export const privacyUrl = "/privacy-policy/";
/** Hlavní česká linka (NON-STOP); jediný zdroj pro odkazy „Zavolat“. */
export const primaryPhone: Contact = contacts[0];
/** Kontaktní adresa v ČR (sídlo firmy je v privacy.ts a na Kontaktu). */
export const address = {
  street: "Na Výsluní 298",
  postalCode: "294 28",
  city: "Chotětov",
  region: "Mladá Boleslav",
};
