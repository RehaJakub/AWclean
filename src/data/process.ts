export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: "phone" | "eye" | "sparkles";
}
export const steps: ProcessStep[] = [
  {
    number: "01",
    icon: "phone",
    title: "Řekněte nám, co vás trápí.",
    description:
      "Fasáda, střecha nebo dlažba? Zavolejte nám nebo stručně popište svůj požadavek.",
  },
  {
    number: "02",
    icon: "eye",
    title: "Přesvědčte se na vlastní oči.",
    description:
      "Domluvíme posouzení povrchu a referenční ukázku čištění. Po celé ČR zdarma.",
  },
  {
    number: "03",
    icon: "sparkles",
    title: "Nechte práci na nás.",
    description:
      "Společně zvolíme postup a ošetření. O samotné čištění se postará náš tým.",
  },
];
