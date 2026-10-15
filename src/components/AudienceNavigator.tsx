import { useState } from "react";
import { ArrowUpRight, House, Building2, Factory } from "lucide-react";
import { audiences } from "../data/audiences";
import { services } from "../data/services";

const icons = [House, Building2, Factory];
export function AudienceNavigator() {
  const [selected, setSelected] = useState(0);
  const audience = audiences[selected];
  return (
    <div className="audience-navigator">
      <h3>Vyberte podle svého objektu</h3>
      <div className="audience-options" role="group" aria-label="Typ vašeho objektu">
        {audiences.map((item, index) => {
          const Icon = icons[index];
          return <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="audience-services" onClick={() => setSelected(index)}><Icon size={22} aria-hidden="true" />{item.title}</button>;
        })}
      </div>
      <div id="audience-services" className="audience-result">
        <p>{audience.description}</p>
        <ul>
          {audience.services.map((href) => {
            const service = services.find((item) => item.href === href);
            return service ? <li key={href}><a href={href}>{service.title}<ArrowUpRight size={17} aria-hidden="true" /></a></li> : null;
          })}
        </ul>
        <a className="text-link" href={`/reference/?typ=${audience.reference}`}>Prohlédnout související realizace <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
