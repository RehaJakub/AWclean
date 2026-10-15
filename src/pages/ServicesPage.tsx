import { ResponsiveImage } from "../components/ResponsiveImage";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  services,
  serviceCategoryLabels,
  type ServiceCategory,
} from "../data/services";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
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
        items={[{ label: otherOnly ? "Ostatní služby" : "Všechny služby" }]}
      />
      <PageIntro
        eyebrow="KOMPLETNÍ PÉČE OD AWCLEAN"
        title={
          otherOnly
            ? "I na detaily máme řešení."
            : "Každý povrch. Správná péče."
        }
        description={
          otherOnly
            ? "Impregnace fasád a střech, nano impregnace a odstraňování dopravního značení. Vyberte si službu a prohlédněte si podrobnosti."
            : "Od čištění fasády přes obnovu střechy po speciální práce ve výškách. Vyberte si službu a prohlédněte si postup i skutečné realizace."
        }
      />
      <section className="catalog-section container">
        {!otherOnly && (
          <div
            className="filter-bar"
            role="group"
            aria-label="Filtrovat služby"
          >
            {filters
              .filter((item) => !otherOnly || item.value === "all")
              .map((item) => (
                <button
                  key={item.value}
                  aria-pressed={filter === item.value}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
          </div>
        )}
        <p className="result-count" role="status">
          Zobrazené služby: {visible.length}
        </p>
        <div className="catalog-grid">
          {visible.map((page) => (
            <a href={page.href} key={page.href} className="catalog-card">
              <ResponsiveImage
                src={page.image}
                alt={page.imageAlt}
                loading="lazy"
                width="750"
                height="560"
              />
              <div>
                <span className="small-label">
                  {serviceCategoryLabels[page.category]}
                </span>
                <h2>
                  {page.title}
                  <ArrowUpRight size={22} />
                </h2>
                <p>{page.description}</p>
                <span className="text-link">Prohlédnout službu</span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <ServiceCTA />
    </>
  );
}
