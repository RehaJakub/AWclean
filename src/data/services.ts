import { servicePages } from "./pages";

export type ServiceCategory = "cisteni" | "natery" | "ostatni";
export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  category: ServiceCategory;
  featured: boolean;
}
export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  cisteni: "Čištění",
  natery: "Nátěry",
  ostatni: "Ostatní služby",
};
const summaries: Record<string, string> = {
  "/cisteni-fasad/": "Odstranění řas a nečistot z rodinných i bytových domů.",
  "/cisteni-strech/": "Čištění krytiny od mechu, lišejníků a usazenin.",
  "/cisteni-dlazeb/": "Obnova vzhledu chodníků, teras a příjezdových cest.",
  "/cisteni-prumyslovych-objektu/":
    "Čištění hal, konstrukcí a technického vybavení.",
};
export const services: Service[] = servicePages.map((page) => ({
  slug: page.path.split("/").filter(Boolean).at(-1) ?? "",
  title: page.shortTitle,
  description: summaries[page.path] ?? page.intro,
  image: page.heroImage,
  imageAlt: page.imageAlt ?? `${page.shortTitle} – ukázka práce AWCLEAN`,
  href: page.path,
  category: page.category,
  featured: page.path in summaries,
}));
export const servicesByCategory: Record<ServiceCategory, Service[]> = {
  cisteni: services.filter((service) => service.category === "cisteni"),
  natery: services.filter((service) => service.category === "natery"),
  ostatni: services.filter((service) => service.category === "ostatni"),
};

export type ServiceLink = Pick<Service, "title" | "href">;
export const serviceNavigation: Record<ServiceCategory, ServiceLink[]> = {
  cisteni: servicesByCategory.cisteni,
  natery: servicePages
    .filter((page) => page.category === "natery")
    .flatMap((page) =>
      page.sections.map((section, index) => ({
        title: section.title,
        href: `${page.path}#${section.id ?? `cast-${index + 1}`}`,
      })),
    ),
  ostatni: servicesByCategory.ostatni,
};
