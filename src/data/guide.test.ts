import { describe, expect, it } from "vitest";
import { guideSurfaces, guideProblems, guideBuildings, getGuideSurfaces, getGuideProblems, getGuideResult } from "./guide";
import { resolveRoute } from "../lib/routes";
import { audiences } from "./audiences";
import { orderReferenceWorks, referenceWorks } from "./referenceWorks";

describe("Navigace průvodce a realizací", () => {
  it("přizpůsobuje nabídku objektu a nenabízí domácnostem průmyslové konstrukce", () => {
    for (const building of ["dum", "bytovy"] as const) {
      expect(getGuideSurfaces(building).map((item) => item.value)).toEqual(["fasada", "strecha", "dlazba"]);
    }
    expect(getGuideSurfaces("firma").map((item) => item.value)).toEqual(["fasada", "strecha", "dlazba", "konstrukce", "svetliky", "hlinik"]);
  });
  it("nabízí pouze doložené kombinace povrchu a ošetření vedoucí na konkrétní službu", () => {
    for (const building of guideBuildings) for (const surface of getGuideSurfaces(building.value)) {
      const problems = getGuideProblems(surface.value);
      expect(problems.length).toBeGreaterThan(0);
      for (const problem of problems) {
        const result = getGuideResult({ building: building.value, surface: surface.value, problem: problem.value });
        expect(resolveRoute(result.href.split("#")[0]).kind).toBe("service");
      }
    }
    expect(getGuideProblems("dlazba").map((item) => item.value)).toEqual(["necistoty", "povlak"]);
    expect(getGuideProblems("svetliky").map((item) => item.value)).toEqual(["necistoty"]);
  });
  it("vede každou kombinaci na existující službu nebo kontakt a doložené fotografie", () => {
    for (const surface of guideSurfaces) for (const problem of guideProblems) for (const building of guideBuildings) {
      const result = getGuideResult({ surface: surface.value, problem: problem.value, building: building.value });
      const [path, hash] = result.href.split("#");
      const route = resolveRoute(path);
      expect(route.kind).not.toBe("notFound");
      if (hash) {
        expect(route.kind).toBe("service");
        if (route.kind === "service") expect(route.page.sections.some((section) => section.id === hash)).toBe(true);
      }
      expect(referenceWorks.some((work) => work.category === result.referenceCategory)).toBe(true);
      if (result.exampleImage) expect(referenceWorks.some((work) => work.src === result.exampleImage && work.category === result.referenceCategory)).toBe(true);
    }
  });
  it("neslibuje nátěr dlažby ani ochranu průmyslových konstrukcí, které nemáme doložené", () => {
    for (const surface of ["dlazba", "konstrukce"] as const) for (const problem of ["nater", "ochrana"] as const) {
      expect(getGuideResult({ surface, problem, building: "firma" }).href).toBe("/kontakt/");
    }
  });
  it("vybírá existující služby pro všechny typy objektů", () => {
    for (const audience of audiences) for (const href of audience.services) expect(resolveRoute(href).kind).toBe("service");
  });
  it("ukáže rozmanité realizace bez ztracených či duplikovaných fotografií", () => {
    const ordered = orderReferenceWorks(referenceWorks);
    expect(ordered).toHaveLength(referenceWorks.length);
    expect(new Set(ordered.map((work) => work.src))).toEqual(new Set(referenceWorks.map((work) => work.src)));
    expect(ordered.slice(0, 4).map((work) => work.category)).toEqual(["fasady", "strechy", "dlazby", "prumysl"]);
    expect(orderReferenceWorks([])).toEqual([]);
  });
});
