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
