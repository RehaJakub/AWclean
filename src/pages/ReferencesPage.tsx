import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Gallery } from "../components/Gallery";
import { ServiceCTA } from "../components/services/ServiceCTA";
import { referenceClients } from "../data/clients";
import { projects } from "../data/projects";
import {
  referenceFilters,
  referenceWorks,
  orderReferenceWorks,
  type ReferenceFilter,
} from "../data/referenceWorks";
const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("cs");
export function ReferencesPage() {
  const referencePeriod = `2001–${new Date().getFullYear()}`;
  const [category, setCategory] = useState<ReferenceFilter>("all");
  useEffect(() => {
    const readCategory = (): void => {
      const value = new URLSearchParams(window.location.search).get("typ");
      setCategory(referenceFilters.find((filter) => filter.value === value)?.value ?? "all");
    };
    readCategory();
    window.addEventListener("popstate", readCategory);
    return () => window.removeEventListener("popstate", readCategory);
  }, []);
  const chooseCategory = (value: ReferenceFilter): void => {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("typ");
    else url.searchParams.set("typ", value);
    window.history.replaceState(null, "", url);
  };
  const [search, setSearch] = useState("");
  const visible = (category === "all" ? orderReferenceWorks(referenceWorks) : referenceWorks).filter(
    (work) => category === "all" || work.category === category,
  );
  const clients = referenceClients.filter((client) =>
    normalize(client).includes(normalize(search)),
  );
  return (
    <div className="references-page">
      <Breadcrumbs items={[{ label: "Reference" }]} />
      <section className="rd-page rd-wrap reference-catalog" aria-labelledby="page-title">
        <header className="rd-page-head is-split">
          <h1 id="page-title">Reference</h1>
          <p>
            Skutečné realizace AWCLEAN. Vyberte si typ práce a prohlédněte si
            fotografie čištění a ošetření povrchů.
          </p>
        </header>
        <div className="reference-details">
          {projects.map((project) => (
            <a key={project.path} href={project.path} className="rd-photo-card is-tall">
              <ResponsiveImage
                src={project.image}
                alt=""
                sizes="(max-width: 760px) 100vw, 33vw"
                loading="lazy"
                width="750"
                height="560"
              />
              <span className="rd-photo-card-body">
                <span className="rd-photo-card-kicker">Detail realizace</span>
                <span className="rd-photo-card-title">{project.title}</span>
              </span>
              <span className="rd-photo-card-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>
          ))}
        </div>
        <h2 className="reference-gallery-title">Fotografie realizací</h2>
        <div className="rd-chips" role="group" aria-label="Filtrovat realizace">
          {referenceFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={category === filter.value}
              onClick={() => chooseCategory(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          Ukázky realizací: {visible.length}
        </p>
        <Gallery
          key={category}
          images={visible}
          label="Realizace AWCLEAN"
          initialCount={12}
        />
      </section>
      <section className="client-section">
        <details className="container client-details">
          <summary>Firemní reference {referencePeriod}</summary>
          <h2>
            Pracovali jsme <span>také pro.</span>
          </h2>
          <p className="client-intro">
            Přehled firem a organizací z původních referencí AWCLEAN. Nejde o
            zákaznická hodnocení ani tvrzení o aktuální spolupráci.
          </p>
          <label className="client-search">
            <Search size={18} />
            <span className="sr-only">Vyhledat firmu nebo město</span>
            <input
              type="search"
              placeholder="Vyhledat firmu nebo město…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <p className="result-count" role="status">
            Nalezené reference: {clients.length}
          </p>
          <ul className="client-list">
            {clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
          {clients.length === 0 && (
            <p>Pro tento dotaz jsme nenašli žádnou referenci.</p>
          )}
        </details>
      </section>
      <ServiceCTA />
    </div>
  );
}
