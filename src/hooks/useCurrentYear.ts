import { useEffect, useState } from "react";
/** Rok z předvykreslení při hydrataci, po mountu aktuální rok návštěvníka (bez chyby hydratace v novém roce). */
export function useCurrentYear(): number {
  const [year, setYear] = useState(() => {
    if (typeof document === "undefined") return new Date().getFullYear();
    const rendered = Number(document.getElementById("root")?.dataset.renderYear);
    return Number.isInteger(rendered) && rendered > 0 ? rendered : new Date().getFullYear();
  });
  useEffect(() => setYear(new Date().getFullYear()), []);
  return year;
}
