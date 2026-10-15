import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
import { Gallery } from "../components/Gallery";
import { ServiceCTA } from "../components/services/ServiceCTA";
import { referenceClients } from "../data/clients";
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
  const [moreFilters, setMoreFilters] = useState(false);
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
      <PageIntro
        eyebrow="SKUTEČNÁ PRÁCE. VIDITELNÝ VÝSLEDEK."
        title="Výsledky naší práce"
        description="Skutečné realizace AWCLEAN. Vyberte si typ práce a prohlédněte si fotografie čištění a ošetření povrchů."
      />
      <section
        className="reference-catalog container"
        aria-label="Realizace podle typu práce"
      >
        <div
          className="reference-filter-buttons filter-bar"
          role="group"
          aria-label="Filtrovat realizace"
        >
          {referenceFilters.slice(0, 5).map((filter) => (
            <button
              key={filter.value}
              aria-pressed={category === filter.value}
              onClick={() => chooseCategory(filter.value)}
            >
              {filter.label}
            </button>
          ))}
          <button type="button" aria-expanded={moreFilters} aria-controls="more-reference-filters" onClick={() => setMoreFilters(!moreFilters)}>
            {referenceFilters.slice(5).find((filter) => filter.value === category)?.label ?? "Další"} <ChevronDown size={16} aria-hidden="true" />
          </button>
          <div id="more-reference-filters" className="more-reference-filters" hidden={!moreFilters}>
            {referenceFilters.slice(5).map((filter) => <button key={filter.value} type="button" aria-pressed={category === filter.value} onClick={() => chooseCategory(filter.value)}>{filter.label}</button>)}
          </div>
        </div>
        <label className="reference-filter-mobile">
          Typ realizace
          <select
            className="gallery-select"
            value={category}
            onChange={(event) => {
              const value = referenceFilters.find(
                (filter) => filter.value === event.target.value,
              )?.value;
              if (value) chooseCategory(value);
            }}
          >
            {referenceFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </label>
        <p className="result-count" role="status">
          Ukázky realizací: {visible.length}
        </p>
        <Gallery
          key={category}
          images={visible}
          label="Realizace AWCLEAN"
          initialCount={6}
        />
        <a className="text-link gallery-all-link" href="/#pred-a-po">
          Porovnat fotografie před a po čištění
        </a>
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
