import { MapPin, Newspaper, ShieldCheck } from "lucide-react";
import { trustItems } from "../data/trust";
const icons = {
  shield: ShieldCheck,
  press: Newspaper,
  sample: MapPin,
};
export function TrustBar() {
  return (
    <section
      className="trust-bar"
      aria-label="Záruka, odbornost a ukázka zdarma"
    >
      <div className="container trust-grid">
        {trustItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <a href={item.href} key={item.icon}>
              <Icon size={29} strokeWidth={1.6} aria-hidden="true" />
              <span>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
