import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const show = () => {
      setVisible(true);
      setEntered(true);
    };
    if (!("IntersectionObserver" in window) || media.matches) {
      show();
      return;
    }
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      show();
      return;
    }
    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    const motionChange = () => {
      if (media.matches) {
        show();
        observer.disconnect();
      }
    };
    media.addEventListener("change", motionChange);
    observer.observe(element);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", motionChange);
    };
  }, []);
  return { ref, visible, entered };
}
