// Google Analytics 4 jen se souhlasem „analytics“ (src/lib/consent.ts). Bez VITE_GA_ID se nic nenačte
// a lišta souhlasu se nezobrazuje, protože web pak nic volitelného nepoužívá.
// CSP pro GA4 je v deploy/htaccess.template (googletagmanager.com, google-analytics.com).
import { consentStorageKey, hasConsent, parseConsent } from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const configuredId = String(import.meta.env.VITE_GA_ID ?? "").trim();
/** Měřicí ID GA4 (G-XXXXXXX); neplatná hodnota = analytika vypnutá. */
export const analyticsId = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : "";
export const analyticsEnabled = analyticsId !== "";

let loaded = false;

/** Načte GA4, pokud je nastavené ID a návštěvník povolil analytické cookies. */
export function loadAnalytics(): void {
  if (loaded || !analyticsEnabled || !hasConsent("analytics")) return;
  loaded = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js čte z dataLayer objekt arguments, ne pole.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", analyticsId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.append(script);
  // Konverze bez úprav komponent: telefon, e-mail a odkazy na formulář.
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_phone");
      else if (href.startsWith("mailto:")) track("click_email");
      else if (href.endsWith("#kontakt")) track("click_inquiry");
    },
    true,
  );
}

/** Odešle událost do GA4; bez souhlasu (nenačtené GA) nic nedělá. */
export function track(event: string): void {
  window.gtag?.("event", event, { page_path: window.location.pathname });
}

/** Odvolání souhlasu: smazat cookies GA a znovu načíst stránku bez měření. */
export function revokeAnalytics(): void {
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const name of document.cookie.split(";").map((part) => part.split("=")[0].trim())) {
    if (!name.startsWith("_ga")) continue;
    for (const scope of ["", `; domain=${domain}`, `; domain=.${domain}`])
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${scope}`;
  }
  if (loaded) window.location.reload();
}

/** Je potřeba se zeptat: analytika je nastavená a chybí platná uložená volba (i odmítnutí platí 180 dní). */
export function needsConsentDecision(
  storage: Pick<Storage, "getItem"> | undefined = typeof window === "undefined" ? undefined : window.localStorage,
): boolean {
  if (!analyticsEnabled || !storage) return false;
  try {
    return parseConsent(storage.getItem(consentStorageKey)) === null;
  } catch {
    return false;
  }
}
