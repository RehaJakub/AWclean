import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";
interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  label?: string;
}
export function Section({ children, id, className = "", label }: SectionProps) {
  const { ref, visible } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={`section reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
