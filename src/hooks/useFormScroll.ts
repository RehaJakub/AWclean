import { useEffect } from "react";

const settleMs = 1600;

const easeOut = (progress: number): number => 1 - Math.pow(1 - progress, 4);

/**
 * Plynule doskroluje na formulář. Cíl se počítá v každém snímku znovu, takže posuny od líně
 * načtených obrázků nad formulářem nic nerozbijí; po animaci se pozice ještě chvíli dorovnává.
 */
export function scrollToForm(id = "kontakt"): void {
  const section = document.getElementById(id);
  if (!section) return;
  const target = section.querySelector("form") ?? section;
  const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const destination = (): number => target.getBoundingClientRect().top + window.scrollY - header - 16;
  const jump = (top: number): void => {
    if (Math.abs(window.scrollY - top) > 1) window.scrollTo({ top, behavior: "instant" });
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const from = window.scrollY;
  const duration = reduced ? 0 : 550 + Math.min(Math.abs(destination() - from), 6000) / 6000 * 650;
  let cancelled = false;
  const stop = (): void => {
    cancelled = true;
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
  };
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  const started = performance.now();
  const tick = (now: number): void => {
    if (cancelled) return;
    const elapsed = now - started;
    const end = destination();
    if (elapsed < duration) {
      jump(from + (end - from) * easeOut(elapsed / duration));
    } else {
      jump(end);
    }
    if (elapsed < duration + settleMs) window.requestAnimationFrame(tick);
    else stop();
  };
  window.requestAnimationFrame(tick);
}

/** Odkazy na #kontakt na stejné stránce vedou přesně na formulář, i když se obsah nad ním ještě načítá. */
export function useFormScroll(): void {
  useEffect(() => {
    const onClick = (event: MouseEvent): void => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.hash !== "#kontakt") return;
      event.preventDefault();
      window.history.replaceState(null, "", url.hash);
      scrollToForm("kontakt");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
