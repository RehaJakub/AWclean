import { ShieldCheck, ScanLine } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";
interface CountUpBadgeProps {
  value: number;
  suffix: string;
  label: string;
  variant: "experience" | "area";
}
export function CountUpBadge({
  value,
  suffix,
  label,
  variant,
}: CountUpBadgeProps) {
  const { ref, entered } = useInView<HTMLDivElement>();
  const count = useCountUp(value, entered);
  const Icon = variant === "experience" ? ShieldCheck : ScanLine;
  const format = (number: number) =>
    new Intl.NumberFormat("cs-CZ").format(number);
  return (
    <div ref={ref} className={`about-badge about-badge-${variant}`}>
      <Icon size={28} aria-hidden="true" />
      <strong>
        <span aria-hidden="true">
          {format(count)}
          <span>{suffix}</span>
        </span>
        <span className="sr-only">
          {format(value)}
          {suffix}
        </span>
      </strong>
      <span>{label}</span>
    </div>
  );
}
