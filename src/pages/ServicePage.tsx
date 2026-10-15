import { ResponsiveImage } from "../components/ResponsiveImage";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { inquiryAction } from "../data/offers";
import { serviceCategoryLabels } from "../data/services";
import type { ServicePageData } from "../data/pages/types";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Gallery } from "../components/Gallery";
import { ServiceCTA } from "../components/services/ServiceCTA";
interface ServicePageProps {
  page: ServicePageData;
  related: ServicePageData[];
}
export function ServicePage({ page, related }: ServicePageProps) {
  const action = inquiryAction(page.path);
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Služby", href: "/sluzby/" },
          { label: page.shortTitle },
        ]}
      />
      <header className="service-hero container">
        <div className="service-hero-copy">
          <p className="eyebrow">
            AWCLEAN / {serviceCategoryLabels[page.category]}
          </p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <a className="button button-primary" href={action.href}>
            {action.label} <ArrowUpRight size={19} />
          </a>
          <a
            className="text-link service-results-link"
            href={page.gallery.length ? "#realizace" : "/reference/"}
          >
            Prohlédnout výsledky
          </a>
          <ul className="service-highlights">
            {page.highlights.map((text) => (
              <li key={text}>
                <Check size={16} />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="service-hero-photo">
          <ResponsiveImage
            src={page.heroImage}
            alt={page.imageAlt ?? page.title + " – AWCLEAN"}
            width="900"
            height="750"
            fetchPriority="high"
          />
          <span>{page.imageAlt?.startsWith("Ilustrační") ? "ILUSTRAČNÍ FOTOGRAFIE POVRCHU" : "ODBORNÁ PÉČE OD ROKU 2001"}</span>
        </div>
      </header>
      <div className="service-body container">
        <aside className="service-sidebar">
          <span className="small-label">NA TÉTO STRÁNCE</span>
          <nav aria-label="Obsah služby">
            {page.sections.map((section, index) => (
              <a
                key={section.title}
                href={`#${section.id ?? `cast-${index + 1}`}`}
              >
                <span>0{index + 1}</span>
                {section.title}
              </a>
            ))}
            {page.gallery.length > 0 && (
              <a href="#realizace">
                <span>↗</span>Fotografie realizací
              </a>
            )}
          </nav>
          <a href="/kontakt/" className="sidebar-help">
            Nevíte, který postup zvolit?
            <strong>
              Poradíme vám <ArrowUpRight size={17} />
            </strong>
          </a>
        </aside>
        <div className="service-article">
          {page.sections.map((section, index) => (
            <section
              className="article-section"
              id={section.id ?? `cast-${index + 1}`}
              key={section.title}
            >
              <span className="eyebrow">
                0{index + 1} / {page.shortTitle}
              </span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((text) => (
                    <li key={text}>
                      <Check size={17} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
      {page.gallery.length > 0 && (
        <section className="service-gallery-section container" id="realizace">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SKUTEČNÉ REALIZACE AWCLEAN</p>
              <h2>
                Prohlédněte si <span>naši práci.</span>
              </h2>
            </div>
            <p className="heading-aside">
              Fotografie otevřete kliknutím.
              <br />
              Další ukázky najdete v referencích.
            </p>
          </div>
          <Gallery images={page.gallery} />
          <a className="text-link gallery-all-link" href="/reference/">
            Všechny reference <ArrowRight size={16} />
          </a>
        </section>
      )}
      <ServiceCTA servicePath={page.path} />
      {related.length > 0 && (
        <section className="related-section container">
          <p className="eyebrow">KOMPLETNÍ PÉČE O VÁŠ OBJEKT</p>
          <h2>Související služby</h2>
          <div className="related-grid">
            {related.map((item) => (
              <a key={item.path} href={item.path}>
                <ResponsiveImage
                  src={item.heroImage}
                  alt={item.imageAlt ?? item.shortTitle}
                  loading="lazy"
                  width="500"
                  height="300"
                />
                <h3>
                  {item.shortTitle}
                  <ArrowUpRight size={20} />
                </h3>
                <p>{item.intro}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
