import { servicePages } from "../data/pages";
import { projects } from "../data/projects";
import { imageVariants } from "../data/imageVariants";
import type { ServicePageData } from "../data/pages/types";
import type { Project } from "../data/projects";
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
}
type StaticKind =
  | "home"
  | "services"
  | "other"
  | "references"
  | "contact"
  | "press"
  | "privacy"
  | "advice";
interface StaticRoute extends PageMeta {
  kind: StaticKind;
}
export type Route =
  | StaticRoute
  | (PageMeta & { kind: "service"; page: ServicePageData })
  | (PageMeta & { kind: "project"; project: Project })
  | (PageMeta & { kind: "notFound" });
const staticRoutes: StaticRoute[] = [
  {
    kind: "home",
    path: "/",
    title: "Čištění fasád, střech a dlažeb od roku 2001",
    description:
      "AWCLEAN: profesionální čištění fasád, střech, dlažeb a průmyslových objektů. Ukázka čištění zdarma po celé ČR.",
    image: "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp",
  },
  {
    kind: "services",
    path: "/sluzby/",
    title: "Služby: čištění fasád, střech a dlažeb",
    description:
      "Přehled služeb AWCLEAN: čištění, nátěry, impregnace a speciální práce. Postupy, fotografie a nezávazná poptávka.",
  },
  {
    kind: "other",
    path: "/ostatni-sluzby/",
    title: "Impregnace, nanoochrana a další služby",
    description:
      "Impregnace fasád a střech, nanoimpregnace a odstraňování dopravního značení.",
  },
  {
    kind: "references",
    path: "/reference/",
    title: "Reference a realizace",
    description:
      "Skutečné fotografie realizací AWCLEAN, porovnání před a po čištění a přehled firemních referencí.",
  },
  {
    kind: "contact",
    path: "/kontakt/",
    title: "Kontakt a nezávazná poptávka",
    description:
      "Zavolejte AWCLEAN na +420 773 196 097 nebo nám napište. Posouzení a ukázka čištění zdarma po celé ČR.",
  },
  {
    kind: "press",
    path: "/psali-o-nas/",
    title: "Psali o nás",
    description: "Odborná reportáž AWCLEAN v časopise Dům a Byt o čištění fasád a střech. Prohlédněte si všechny strany článku.",
  },
  {
    kind: "privacy",
    path: "/privacy-policy/",
    title: "Ochrana osobních údajů a cookies",
    description:
      "Informace o ochraně osobních údajů, vyřizování poptávek a cookies na webu AWCLEAN.",
  },
  {
    kind: "advice",
    path: "/ciste-fasady/",
    title: "Odborné posouzení fasády",
    description:
      "Nejste spokojení s předchozím čištěním fasády? AWCLEAN nabízí posouzení a ukázku čištění zdarma.",
  },
];
export const routeAliases: Record<string, string> = {
  "/ostatni-sluzby/natery-fasad/": "/natery-strech-a-fasad/",
  "/ostatni-sluzby/natery-strech/": "/natery-strech-a-fasad/",
  "/ostatni-sluzby/odstranovani-graffiti/":
    "/ostatni-sluzby/odstranovani-dopravniho-znaceni/",
  "/ostatni-sluzby/cisteni-historickych-fasad/": "/cisteni-historickych-fasad/",
  "/ochrana-osobnich-udaju/": "/privacy-policy/",
};
export const routes: Route[] = [
  ...staticRoutes,
  ...servicePages.map((page) => ({
    kind: "service" as const,
    path: page.path,
    title: page.seoTitle ?? page.title,
    description: page.intro,
    image: page.heroImage,
    page,
  })),
  ...projects.map((project) => ({
    kind: "project" as const,
    path: project.path,
    title: project.title,
    description: project.description,
    image: project.image,
    project,
  })),
];
export function normalizePath(path: string): string {
  const clean = path
    .split(/[?#]/)[0]
    .replace(/\/index\.html$/, "/")
    .replace(/\/{2,}/g, "/");
  return clean === "" || clean === "/"
    ? "/"
    : `/${clean.replace(/^\/+|\/+$/g, "")}/`;
}
export function resolveRoute(path: string): Route {
  const normalized = normalizePath(path);
  const canonical = routeAliases[normalized] ?? normalized;
  return (
    routes.find((route) => route.path === canonical) ?? {
      kind: "notFound",
      path: normalized,
      title: "Stránka nenalezena",
      description:
        "Požadovaná stránka nebyla nalezena. Prohlédněte si služby AWCLEAN nebo se vraťte na úvod.",
    }
  );
}
const defaultShareImage = "/images/realizace/bytovy-dum-cisteni-z-plosiny-pred-a-po.webp";
/**
 * Zdroj a cíl obrázku pro sdílení (Open Graph, 1200×630 JPEG generovaný při buildu).
 * Malé fotky (pod 600 px) nahradí výchozí obrázek, sociální sítě by je zobrazily rozmazaně.
 */
export function shareImage(image: string | undefined): { source: string; url: string } {
  const source = image && (imageVariants[image]?.width ?? 0) >= 600 ? image : defaultShareImage;
  const name = source.split("/").pop()!.replace(/\.[a-z]+$/i, "");
  return { source, url: `/images/og/${name}.jpg` };
}
