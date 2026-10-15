import { contacts, emails } from "./contacts";
interface LocalBusinessData {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  "@id": string;
  name: string;
  url: string;
  logo: string;
  image: string;
  telephone: string[];
  email: string[];
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  sameAs: string[];
}
export const localBusiness: LocalBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.awclean.cz/#business",
  name: "AWCLEAN s.r.o.",
  url: "https://www.awclean.cz/",
  logo: "https://www.awclean.cz/images/logo.svg",
  image:
    "https://www.awclean.cz/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp",
  telephone: contacts.map(({ phone }) => phone),
  email: emails,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Na Výsluní 298",
    addressLocality: "Chotětov",
    postalCode: "294 28",
    addressCountry: "CZ",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => `https://schema.org/${day}`),
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/awclean",
    "https://www.youtube.com/@AWCLEANs.r.o",
  ],
};
