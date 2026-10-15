import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useParallax(ref: RefObject<HTMLElement | null>): void {
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) {
      element.style.setProperty("--hero-parallax", "0px");
      return;
    }
    let frame = 0;
    let inView = true;
    const paint = () => {
      frame = 0;
      if (!inView || document.hidden) return;
      const top = element.getBoundingClientRect().top;
      element.style.setProperty(
        "--hero-parallax",
        `${Math.min(32, Math.max(0, -top * 0.07))}px`,
      );
    };
    const schedule = () => {
      if (!frame && inView && !document.hidden)
        frame = requestAnimationFrame(paint);
    };
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            inView = entry?.isIntersecting ?? false;
            if (inView) schedule();
          })
        : null;
    observer?.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
      element.style.removeProperty("--hero-parallax");
    };
  }, [ref, reduced]);
}
