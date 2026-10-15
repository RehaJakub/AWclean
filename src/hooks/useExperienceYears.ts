import { useSyncExternalStore } from "react";
import { getExperienceYears } from "../data/company";

const currentYear = (): number => new Date().getFullYear();

// Hydrate the year in the static HTML first, then update to the visitor's year.
// This also updates an older deployment without requiring a new build in January.
function renderedYear(): number {
  if (typeof document === "undefined") return currentYear();
  const year = document.getElementById("root")?.dataset.renderYear;
  return year ? Number(year) : currentYear();
}

function subscribe(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 60_000);
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function useExperienceYears(): number {
  return getExperienceYears(
    useSyncExternalStore(subscribe, currentYear, renderedYear),
  );
}
