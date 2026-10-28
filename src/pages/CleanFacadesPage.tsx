import { useState } from "react";
import { Phone, Plus, Search } from "lucide-react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ServiceCTA } from "../components/services/ServiceCTA";
import { faqCategories, faqItems, faqSchema, filterFaq, type FaqCategory } from "../data/faq";
import { JsonLd } from "../components/JsonLd";
export function CleanFacadesPage() {
  const [category, setCategory] = useState<FaqCategory>("vse");
  const [query, setQuery] = useState("");
  const results = filterFaq(category, query);
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Čištění fasád", href: "/cisteni-fasad/" },
          { label: "Odborné posouzení fasády" },
        ]}
      />
      <header className="advice-hero">
        <div className="rd-wrap advice-hero-inner">
          <div className="advice-hero-copy">
            <p className="svc-kicker">Čisté fasády · odborné posouzení</p>
            <h1>Nenechte si zmařit investici do fasády.</h1>
            <p className="svc-lead">
              Nejste spokojení s výsledkem předchozího čištění? Pomůžeme vám
              posoudit stav povrchu a možnosti dalšího postupu.
            </p>
          </div>
          <img
            className="advice-mascot"
            src="/mascot/dr-fasada-440.webp"
            alt=""
            width="655"
            height="800"
            decoding="async"
          />
        </div>
      </header>
      <article className="rd-wrap advice-article">
        <h2>Základem je důkladné a správné čištění</h2>
        <p>
          Obnova fasády představuje významnou investici. Způsob mytí proto
          vybírejte podle konkrétního podkladu a zkušeností realizační firmy.
          Nešetrný nebo nedostatečný zásah může na povrchu zanechat mapy, fleky
          či zbytky biologických povlaků.
        </p>
        <h2>Čistíme a posuzujeme fasády od roku 2001</h2>
        <p>
          AWCLEAN se věnuje odbornému čištění fasád a také posouzení objektů po
          předchozím neúspěšném zásahu. Nový nátěr není automaticky jediným
          řešením: nejprve je potřeba zjistit skutečný stav povrchu.
        </p>
        <blockquote>
          „K základnímu úspěchu, aby byla vaše fasáda krásná a opět zářila, vede
          pouze jedna cesta – důkladně omýt.“
          <cite>Andrej Wiedermann, technik společnosti AWCLEAN s.r.o.</cite>
        </blockquote>
        <h2>Výsledek není podle očekávání?</h2>
        <p>
          Kontaktujte nás. Na místě posoudíme stav čistoty fasády, ověříme
          zbytky biologických povlaků a provedeme ukázku vhodného postupu.
          Posouzení a zkoušku nabízíme zdarma.
        </p>
      </article>
      <section className="rd-wrap advice-faq" aria-labelledby="advice-faq-title">
        <h2 id="advice-faq-title">DR Fasáda odpovídá</h2>
        {/* Server HTML lists all questions; filtering is a client-side view of the same set. */}
        <JsonLd data={faqSchema(faqItems)} />
        <label className="advice-search">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">Hledat v otázkách a odpovědích</span>
          <input
            type="search"
            value={query}
            placeholder="Co vás zajímá?"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="rd-chips" role="group" aria-label="Kategorie otázek">
          {faqCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="advice-count" aria-live="polite">
          Nalezené odpovědi: {results.length}
        </p>
        <div className="svc-faq-list">
          {results.map((item) => (
            <details key={item.id}>
              <summary>
                <span>{item.question}</span>
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
          {!results.length && (
            <p className="advice-empty">
              Zkuste jiné slovo nebo kategorii Vše. Nebo se nám ozvěte přímo.
            </p>
          )}
        </div>
        <div className="advice-help">
          <strong>Nenašli jste odpověď?</strong>
          <a className="rd-btn rd-btn-primary" href="tel:+420773196097">
            <Phone size={17} aria-hidden="true" /> +420 773 196 097
          </a>
        </div>
      </section>
      <ServiceCTA servicePath="/cisteni-fasad/" />
    </>
  );
}
