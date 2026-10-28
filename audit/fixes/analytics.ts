// src/lib/analytics.ts – Plausible (EU, bez cookies) napojený na stávající souhlas „analytics“.
// Napojení (3 řádky mimo tento soubor):
//   src/main.tsx                      po hydrateRoot/createRoot:  loadAnalytics();
//   src/components/ConsentManager.tsx persist(), po saveConsent:  if (next.analytics) loadAnalytics(); else if (saved?.analytics) window.location.reload();
//   src/components/ContactForm.tsx    hned po setStatus("success"):  track("Poptávka odeslána");
// CSP v deploy/htaccess.template:  script-src 'self' https://plausible.io; connect-src 'self' https://plausible.io
// Před nasazením ověřit aktuální podobu snippetu v administraci Plausible (Site settings → Site installation).
import { consentStorageKey, parseConsent } from "./consent";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

let loaded = false;

export function loadAnalytics(): void {
  if (loaded) return;
  let analytics = false;
  try {
    analytics = parseConsent(window.localStorage.getItem(consentStorageKey))?.analytics ?? false;
  } catch {
    /* Storage can be unavailable in private browsing. */
  }
  if (!analytics) return;
  loaded = true;
  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = "awclean.cz";
  script.src = "https://plausible.io/js/script.js";
  document.head.append(script);
  // Konverze bez úprav komponent: telefon, e-mail a všechna CTA na formulář.
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("Klik telefon");
      else if (href.startsWith("mailto:")) track("Klik e-mail");
      else if (href.endsWith("#kontakt")) track("Klik CTA poptávka");
    },
    true,
  );
}

export function track(event: string): void {
  window.plausible?.(event, { props: { stranka: window.location.pathname } });
}
