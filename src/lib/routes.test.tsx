import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import App from "../App";
import { imageVariants } from "../data/imageVariants";
import { inquiryAction } from "../data/offers";
import { referenceWorks, referenceFilters } from "../data/referenceWorks";
import { photoDetails } from "../data/photos";
import { servicePages } from "../data/pages";
import {
  services,
  servicesByCategory,
  serviceNavigation,
} from "../data/services";
import { projects } from "../data/projects";
import { normalizePath, resolveRoute, routes, routeAliases } from "./routes";
afterEach(() => vi.unstubAllGlobals());
const pageHtml = (path: string, search = ""): string => {
  vi.stubGlobal("window", { location: { pathname: path, search } });
  return renderToStaticMarkup(<App />);
};
describe("Kompletní lokální web", () => {
  it("nabízí bezplatnou ukázku jen u doložených služeb", () => {
    for (const path of [
      "/cisteni-fasad/",
      "/cisteni-strech/",
      "/cisteni-dlazeb/",
    ])
      expect(inquiryAction(path).label).toBe("Chci ukázku čištění zdarma");
    for (const path of [
      "/natery-strech-a-fasad/",
      "/impregnace-fasad-a-strech/",
      "/cisteni-prumyslovych-objektu/",
    ]) {
      expect(inquiryAction(path).label).toBe("Nezávazně poptat");
      expect(inquiryAction(path).href).not.toContain("vzorek");
      expect(pageHtml(path)).not.toContain("Nejdřív ukázka. Potom rozhodnutí.");
    }
  });
  it("má doložené fotografie pro všechny filtry a zachovává staré obrázkové adresy", () => {
    for (const filter of referenceFilters.filter(
      (filter) => filter.value !== "all",
    ))
      expect(
        referenceWorks.some((work) => work.category === filter.value),
      ).toBe(true);
    for (const [src, details] of Object.entries(photoDetails)) {
      expect(src).toMatch(/^\/images\/realizace\/[a-z0-9-]+\.webp$/);
      expect(existsSync(`public${src}`)).toBe(true);
      expect(existsSync(`public${details.original}`)).toBe(true);
      expect(details.alt.length).toBeGreaterThan(20);
    }
  });

  it("má jedinečné adresy a podporuje všechny služby i původní aliasy", () => {
    expect(servicePages).toHaveLength(12);
    expect(new Set(routes.map((route) => route.path)).size).toBe(routes.length);
    expect(normalizePath("/cisteni-fasad")).toBe("/cisteni-fasad/");
    expect(normalizePath("/cisteni-fasad/index.html")).toBe("/cisteni-fasad/");
    for (const [alias, canonical] of Object.entries(routeAliases))
      expect(resolveRoute(alias).path).toBe(canonical);
    expect(resolveRoute("/neexistuje/").kind).toBe("notFound");
  });
  it("má shodné kategorie v katalogu, stránkách i obou rozbalovacích nabídkách", () => {
    expect(servicesByCategory.cisteni).toHaveLength(8);
    expect(servicesByCategory.natery).toHaveLength(1);
    expect(servicesByCategory.ostatni).toHaveLength(3);
    expect(new Set(services.map((service) => service.slug)).size).toBe(12);
    for (const service of services) {
      const route = resolveRoute(service.href);
      expect(route.kind).toBe("service");
      if (route.kind === "service") {
        expect(route.page.category).toBe(service.category);
        expect(route.page.shortTitle).toBe(service.title);
      }
    }
    for (const category of ["cisteni", "ostatni"] as const)
      expect(serviceNavigation[category].map((link) => link.href)).toEqual(
        servicesByCategory[category].map((service) => service.href),
      );
    const otherHtml = pageHtml("/ostatni-sluzby/");
    expect(otherHtml.match(/class="catalog-card"/g)).toHaveLength(3);
  });
  it("sloučí nátěry, odstraní mytí oken a skryje profesní členství", () => {
    expect(resolveRoute("/ostatni-sluzby/myti-oken/").kind).toBe("notFound");
    for (const old of ["natery-fasad", "natery-strech"])
      expect(resolveRoute(`/ostatni-sluzby/${old}/`).path).toBe(
        "/natery-strech-a-fasad/",
      );
    expect(resolveRoute("/ostatni-sluzby/odstranovani-graffiti/").path).toBe(
      "/ostatni-sluzby/odstranovani-dopravniho-znaceni/",
    );
    const painting = resolveRoute("/natery-strech-a-fasad/");
    if (painting.kind !== "service")
      throw new Error("Chybí společná stránka nátěrů");
    expect(painting.page.sections.map((section) => section.title)).toEqual([
      "Nátěry střech",
      "Nátěry fasád",
    ]);
    for (const route of routes) {
      expect(pageHtml(route.path)).not.toMatch(
        /ZpPOBD|osvedceni-awclean|PROFESNÍ ČLENSTVÍ|Mytí oken|Odstraňování graffiti/,
      );
    }
    expect(pageHtml("/reference/")).toContain(
      `2001–${new Date().getFullYear()}`,
    );
  });
  it.each(routes.map((route) => [route.path] as const))(
    "vykreslí %s s jedním H1, lokálními odkazy a existujícími obrázky",
    (path) => {
      const html = pageHtml(path);
      expect(html.match(/<h1(?:\s|>)/g)?.length).toBe(1);
      const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(
        (match) => match[1].replaceAll("&amp;", "&"),
      );
      for (const href of links) {
        if (
          /^(tel:|mailto:|https:\/\/(www\.)?(facebook\.com|youtube\.com)\/)/.test(
            href,
          )
        )
          continue;
        expect(href, `Externí interní odkaz na ${path}: ${href}`).not.toMatch(
          /^https?:|^\/\//,
        );
        const url = new URL(href, `https://local.test${path}`);
        if (/\.(pdf|webp|svg|jpg|png)$/.test(url.pathname)) {
          expect(existsSync(resolve("public", `.${url.pathname}`)), href).toBe(
            true,
          );
          continue;
        }
        expect(resolveRoute(url.pathname).kind, `${path} → ${href}`).not.toBe(
          "notFound",
        );
        if (url.hash.length > 1 && url.pathname === path)
          expect(html, href).toContain(`id="${url.hash.slice(1)}"`);
      }
      for (const match of html.matchAll(/<img\b[^>]*src="([^"]*)"/g)) {
        expect(match[1]).toMatch(/^\/(images|mascot)\//);
        expect(existsSync(resolve("public", `.${match[1]}`)), match[1]).toBe(
          true,
        );
      }
    },
  );
  it("má skutečné lokální soubory pro všechny responzivní varianty", () => {
    for (const [source, variant] of Object.entries(imageVariants)) {
      expect(variant.width).toBeGreaterThan(0);
      expect(variant.height).toBeGreaterThan(0);
      for (const candidate of variant.srcSet.split(", ")) {
        const [path, width] = candidate.split(" ");
        expect(existsSync(resolve("public", `.${path}`)), source).toBe(true);
        expect(Number.parseInt(width)).toBeLessThanOrEqual(variant.width);
      }
    }
  });
  it("má stažené i všechny fotografie za tlačítkem zobrazit více", () => {
    for (const page of servicePages) {
      for (const image of page.gallery)
        expect(existsSync(resolve("public", `.${image.src}`)), image.src).toBe(
          true,
        );
      for (const path of page.related)
        expect(resolveRoute(path).kind).toBe("service");
    }
    for (const project of projects)
      expect(resolveRoute(project.path).kind).toBe("project");
  });
  it("ponechá zprávu prázdnou i při příchodu ze služby a vzorku zdarma", () => {
    const html = pageHtml(
      "/kontakt/",
      "?sluzba=%C4%8Ci%C5%A1t%C4%9Bn%C3%AD%20st%C5%99ech&vzorek=1",
    );
    expect(html).toMatch(/<textarea\b[^>]*><\/textarea>/);
  });
  it("zobrazí srozumitelnou stránku pro neplatný odkaz", () => {
    expect(pageHtml("/neexistuje/")).toContain("404 / STRÁNKU JSME NENAŠLI");
  });
});
