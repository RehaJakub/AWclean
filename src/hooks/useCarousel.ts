import { useEffect, useRef, useState } from "react";

/** Rotation stops outside the viewport, in a hidden tab, on focus or explicit pause. */
export function useCarousel(length: number, delay = 2500) {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inViewport, setInViewport] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => setInViewport(entry?.isIntersecting ?? false),
            { threshold: 0.2 },
          )
        : null;
    if (ref.current) observer?.observe(ref.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  const rotating =
    !paused &&
    !focused &&
    !reducedMotion &&
    inViewport &&
    documentVisible &&
    length > 1;
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % length),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [index, rotating, length, delay]);

  return {
    ref,
    index,
    rotating,
    paused,
    reducedMotion,
    setIndex,
    setPaused,
    setFocused,
  };
}
