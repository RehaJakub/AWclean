import { ResponsiveImage } from "../components/ResponsiveImage";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  services,
  serviceCategoryLabels,
  type ServiceCategory,
} from "../data/services";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ServiceCTA } from "../components/services/ServiceCTA";
interface ServicesPageProps {
  otherOnly?: boolean;
}
type Filter = "all" | ServiceCategory;
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Všechny služby" },
  ...(["cisteni", "natery", "ostatni"] as const).map((category) => ({
    value: category,
    label: serviceCategoryLabels[category],
  })),
];
export function ServicesPage({ otherOnly = false }: ServicesPageProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const available = services.filter(
    (page) => !otherOnly || page.category === "ostatni",
  );
  const visible = available.filter(
    (page) => filter === "all" || page.category === filter,
  );
  return (
    <>
      <Breadcrumbs
        items={[{ label: otherOnly ? "Ostatní služby" : "Přehled služeb" }]}
      />
      <section className="rd-page rd-wrap" aria-labelledby="page-title">
        <header className="rd-page-head">
          <h1 id="page-title">{otherOnly ? "Ostatní služby" : "Přehled služeb"}</h1>
          <p>
            {otherOnly
              ? "Impregnace fasád a střech, nano impregnace a odstraňování dopravního značení. Vyberte si službu a prohlédněte si podrobnosti."
              : "Od čištění fasády přes obnovu střechy po speciální práce ve výškách. Vyberte si službu a prohlédněte si postup i skutečné realizace."}
          </p>
        </header>
        {!otherOnly && (
          <div className="rd-chips" role="group" aria-label="Filtrovat služby">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
        <p className="sr-only" role="status">
          Zobrazené služby: {visible.length}
        </p>
        <div className="rd-card-grid">
          {visible.map((page) => (
            <a href={page.href} key={page.href} className="catalog-card rd-photo-card is-tall">
              <ResponsiveImage
                src={page.image}
                alt=""
                sizes="(max-width: 760px) 100vw, 33vw"
                loading="lazy"
                width="750"
                height="560"
              />
              <span className="rd-photo-card-body">
                <span className="rd-photo-card-kicker">
                  {serviceCategoryLabels[page.category]}
                </span>
                <span className="rd-photo-card-title">
                  {page.title.replace(" (airless)", "")}
                </span>
                <span className="rd-photo-card-text">{page.description}</span>
              </span>
              <span className="rd-photo-card-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <ServiceCTA />
    </>
  );
}
