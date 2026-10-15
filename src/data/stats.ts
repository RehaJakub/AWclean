import { foundingYear, getExperienceYears } from "./company";
export interface Milestone {
  value: string;
  since?: number;
  unit?: string;
  label: string;
  detail: string;
}
export const milestones: Milestone[] = [
  {
    get value() { return `${getExperienceYears()}+`; },
    since: foundingYear,
    label: "let zkušeností",
    detail: "Čistíme pro vás od roku 2001",
  },
  {
    value: "2 500 000",
    unit: "m²",
    label: "vyčištěných ploch",
    detail: "Výsledky, které jsou vidět",
  },
  {
    value: "5 / 10 / 20",
    label: "let záruky",
    detail: "Dle zvoleného ošetření",
  },
  {
    value: "ZDARMA",
    label: "posudek a ukázka čištění",
    detail: "Přijedeme za vámi po celé ČR",
  },
];
