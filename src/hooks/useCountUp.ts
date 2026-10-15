import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(
  target: number,
  started: boolean,
  duration = 1500,
): number {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started || reducedMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, started, duration, reducedMotion]);
  return reducedMotion ? target : value;
}
