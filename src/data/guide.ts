import type { ReferenceFilter } from "./referenceWorks";

export const guideSurfaces = [
  { value: "fasada", label: "Fasáda" },
  { value: "strecha", label: "Střecha" },
  { value: "dlazba", label: "Dlažba" },
  { value: "konstrukce", label: "Průmyslové konstrukce" },
  { value: "svetliky", label: "Střešní světlíky" },
  { value: "hlinik", label: "Hliníkové opláštění" },
] as const;
export const guideProblems = [
  { value: "necistoty", label: "Usazené nečistoty" },
  { value: "povlak", label: "Řasy, mech nebo povlak" },
  { value: "ochrana", label: "Ochrana povrchu" },
  { value: "nater", label: "Obnova nátěru" },
] as const;
export const guideBuildings = [
  { value: "dum", label: "Rodinný dům" },
  { value: "bytovy", label: "SVJ a bytový dům" },
  { value: "firma", label: "Firma a průmysl" },
] as const;
export type GuideSurface = (typeof guideSurfaces)[number]["value"];
export type GuideProblem = (typeof guideProblems)[number]["value"];
export type GuideBuilding = (typeof guideBuildings)[number]["value"];
export interface GuideSelection { surface: GuideSurface; problem: GuideProblem; building: GuideBuilding }
export interface GuideResult { title: string; href: string; referenceCategory: ReferenceFilter; text: string; exampleImage?: string }

// Nabídka navazuje na typ objektu; další krok nabízí jen doložená ošetření.
export function getGuideSurfaces(building: GuideBuilding) {
  return guideSurfaces
    .filter((item) => building === "firma" || ["fasada", "strecha", "dlazba"].includes(item.value))
    .map((item) => ({
      ...item,
      label: item.value === "dlazba"
        ? building === "dum" ? "Dlažba kolem domu" : building === "bytovy" ? "Chodníky a společné plochy" : "Dlažba v areálu"
        : item.label,
    }));
}

export function getGuideProblems(surface: GuideSurface) {
  return guideProblems.filter((item) => {
    if (surface === "fasada" || surface === "strecha") return true;
    if (surface === "dlazba") return item.value === "necistoty" || item.value === "povlak";
    return item.value === "necistoty";
  });
}

// Navigace do existující nabídky, nikoli posudek stavu konkrétního objektu.
// Zdroj: src/data/pages/*.ts. Žádné odhady ceny, času ani konkrétní záruky.
const cleaning: Record<GuideSurface, Pick<GuideResult, "href" | "referenceCategory">> = {
  fasada: { href: "/cisteni-fasad/", referenceCategory: "fasady" },
  strecha: { href: "/cisteni-strech/", referenceCategory: "strechy" },
  dlazba: { href: "/cisteni-dlazeb/", referenceCategory: "dlazby" },
  konstrukce: { href: "/cisteni-prumyslovych-objektu/", referenceCategory: "prumysl" },
  svetliky: { href: "/cisteni-svetliku/", referenceCategory: "svetliky" },
  hlinik: { href: "/cisteni-hlinikovych-fasad/", referenceCategory: "hlinikove" },
};
export function getGuideResult(selection: GuideSelection): GuideResult {
  const { surface, problem } = selection;
  const supportsCoating = surface === "fasada" || surface === "strecha";
  if (problem === "nater" && supportsCoating) return {
    title: surface === "strecha" ? "Nátěr střechy" : "Nátěr fasády",
    href: `/natery-strech-a-fasad/#${surface === "strecha" ? "natery-strech" : "natery-fasad"}`,
    referenceCategory: "natery",
    text: "Doktor radí: prohlédněte si nátěry střech a fasád. Vhodný postup je potřeba určit podle stavu povrchu.",
  };
  if (problem === "ochrana" && supportsCoating) return {
    title: surface === "strecha" ? "Impregnace střechy" : "Impregnace fasády",
    href: "/impregnace-fasad-a-strech/", referenceCategory: "impregnace",
    text: "Doktor radí: podívejte se na impregnaci fasád a střech. Vhodnost ošetření závisí na konkrétním povrchu.",
  };
  if (problem === "nater" || problem === "ochrana") return {
    title: "Individuální posouzení povrchu",
    href: "/kontakt/", referenceCategory: cleaning[surface].referenceCategory,
    text: "Doktor radí: u této kombinace nejprve proberte vhodné ošetření s AWCLEAN. Samotný výběr v průvodci nestačí k určení postupu.",
  };
  const facadeExamples: Record<GuideBuilding, string> = {
    dum: "/images/fasady-nove/cisteni-fasady-rodinneho-domu-s-balkonem-pred-a-po.webp",
    bytovy: "/images/fasady-nove/cisteni-bezove-fasady-bytoveho-domu-pred-a-po.webp",
    firma: "/images/fasady-nove/cisteni-fasady-budovy-s-ruzovymi-pruhy-pred-a-po.webp",
  };
  const titles: Record<GuideSurface, string> = {
    fasada: "Čištění fasády",
    strecha: "Čištění střechy",
    dlazba: "Čištění dlažby",
    konstrukce: "Čištění průmyslových objektů",
    svetliky: "Čištění světlíků",
    hlinik: "Čištění hliníkových fasád",
  };
  const reason = problem === "povlak"
    ? "Pro odstranění řas, mechu nebo povlaku začněte čištěním vybraného povrchu."
    : "Pro odstranění usazených nečistot začněte čištěním vybraného povrchu.";
  return { ...cleaning[surface], title: titles[surface], exampleImage: surface === "fasada" ? facadeExamples[selection.building] : undefined, text: `Doktor radí: ${reason} Konkrétní postup určí AWCLEAN podle materiálu a skutečného stavu vašeho objektu.` };
}
