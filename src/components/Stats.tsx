import { useExperienceYears } from "../hooks/useExperienceYears";
import { foundingYear } from "../data/company";
import type { Milestone } from "../data/stats";
interface StatsProps {
  items: Milestone[];
}
export function Stats({ items }: StatsProps) {
  const experienceYears = useExperienceYears();
  return (
    <section className="stats container" aria-label="AWCLEAN v číslech">
      {items.map((item) => (
        <div className="stat" key={item.label}>
          <div className="stat-number">
            {item.since === foundingYear ? `${experienceYears}+` : item.value}
            {item.unit && <span> {item.unit}</span>}
          </div>
          <strong>{item.label}</strong>
          <p>{item.detail}</p>
        </div>
      ))}
    </section>
  );
}
