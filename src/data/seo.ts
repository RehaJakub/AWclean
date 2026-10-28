import { address, contacts, emails } from "./contacts";
import type { ServicePageData } from "./pages/types";
const site = "https://www.awclean.cz";
const areaServed = [
  { "@type": "Country", name: "Česká republika", identifier: "CZ" },
  { "@type": "Country", name: "Slovensko", identifier: "SK" },
];
/**
 * Legal entity (registered seat in Slovakia, privacy.ts) and the Czech contact
 * location shown on /kontakt/ and in the footer. Rendered into <head> by vite.config.ts.
 */
export const localBusiness = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "AWCLEAN",
      legalName: "AWCLEAN s.r.o.",
      url: `${site}/`,
      logo: `${site}/images/logo.svg`,
      identifier: { "@type": "PropertyValue", propertyID: "IČO", value: "50823272" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Čsl. armády 1457/2A",
        addressLocality: "Topoľčany",
        postalCode: "955 01",
        addressCountry: "SK",
      },
      email: emails,
      sameAs: [
        "https://www.facebook.com/awclean",
        "https://www.youtube.com/@AWCLEANs.r.o",
      ],
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${site}/#business`,
      name: "AWCLEAN",
      url: `${site}/`,
      image: `${site}/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp`,
      parentOrganization: { "@id": `${site}/#organization` },
      telephone: contacts[0].phone,
      email: emails[0],
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.city,
        postalCode: address.postalCode,
        addressCountry: "CZ",
      },
      areaServed,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          .map((day) => `https://schema.org/${day}`),
        opens: "08:00",
        closes: "17:00",
      },
      contactPoint: contacts.map(({ phone, label }) => ({
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: phone.startsWith("+421") ? "SK" : "CZ",
        availableLanguage: ["cs", "sk"],
        ...(label.includes("NON-STOP") && {
          hoursAvailable: { "@type": "OpeningHoursSpecification", opens: "00:00", closes: "23:59" },
        }),
      })),
    },
  ],
};
export const serviceSchema = (page: ServicePageData) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site}${page.path}#service`,
  name: page.title,
  description: page.intro,
  url: `${site}${page.path}`,
  image: `${site}${page.heroImage}`,
  provider: { "@id": `${site}/#business` },
  areaServed,
});
