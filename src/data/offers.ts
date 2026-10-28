import { servicePages } from "./pages";

// Explicitly offered on the original service pages (verified 8 October 2026).
const freeSamplePaths: readonly string[] = [
  "/cisteni-fasad/",
  "/cisteni-strech/",
  "/cisteni-dlazeb/",
];
export const sampleLabel = "Chci ukázku čištění zdarma";
export interface InquiryAction {
  label: string;
  href: string;
  freeSample: boolean;
}
export function inquiryAction(servicePath?: string): InquiryAction {
  const service = servicePages.find((page) => page.path === servicePath);
  const freeSample = freeSamplePaths.includes(servicePath ?? "");
  const params = new URLSearchParams();
  if (service) params.set("sluzba", service.shortTitle);
  if (freeSample) params.set("vzorek", "1");
  const query = params.toString();
  return {
    label: freeSample ? sampleLabel : "Nezávazně poptat",
    href: `/kontakt/${query ? `?${query}` : ""}#kontakt`,
    freeSample,
  };
}
