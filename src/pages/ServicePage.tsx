import { ResponsiveImage } from "../components/ResponsiveImage";
import { ArrowRight, Check, Phone, Plus } from "lucide-react";
import { inquiryAction } from "../data/offers";
import { serviceCategoryLabels } from "../data/services";
import { faqItems, faqSchema } from "../data/faq";
import { JsonLd } from "../components/JsonLd";
import { serviceSchema } from "../data/seo";
import { photoDetails } from "../data/photos";
import { serviceBlockImages, serviceFaqIds } from "../data/serviceVisuals";
import type { ServicePageData } from "../data/pages/types";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Gallery } from "../components/Gallery";
import { ServiceCTA } from "../components/services/ServiceCTA";
interface ServicePageProps {
  page: ServicePageData;
  related: ServicePageData[];
}
const categoryCrumbs = {
  cisteni: { label: serviceCategoryLabels.cisteni, href: "/sluzby/" },
  ostatni: { label: serviceCategoryLabels.ostatni, href: "/ostatni-sluzby/" },
  natery: null,
};
function blockImageAlt(page: ServicePageData, src: string): string {
  return (
    page.gallery.find((image) => image.src === src)?.alt ??
    photoDetails[src]?.alt ??
    `${page.shortTitle} – ukázka práce AWCLEAN`
  );
}
export function ServicePage({ page, related }: ServicePageProps) {
  const action = inquiryAction(page.path);
  const category = categoryCrumbs[page.category];
  const blockImages = serviceBlockImages[page.path] ?? [];
  const faq = serviceFaqIds(page.path)
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item) => item !== undefined);
  return (
    <>
      <JsonLd data={serviceSchema(page)} />
      <Breadcrumbs
        items={[...(category ? [category] : []), { label: page.shortTitle }]}
      />
      <header className="svc-hero rd-wrap">
        <div className="svc-hero-copy">
          <p className="svc-kicker">{serviceCategoryLabels[page.category]}</p>
          <h1>{page.title}</h1>
          <p className="svc-lead">{page.intro}</p>
          <div className="svc-actions">
            <a className="rd-btn rd-btn-primary" href={action.href}>
              {action.label} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="rd-btn rd-btn-outline" href="tel:+420773196097">
              <Phone size={17} aria-hidden="true" /> +420 773 196 097
            </a>
          </div>
          <ul className="svc-highlights">
            {page.highlights.map((text) => (
              <li key={text}>
                <Check size={16} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="svc-hero-photo">
          <ResponsiveImage
            src={page.heroImage}
            alt={page.imageAlt ?? page.title + " – AWCLEAN"}
            sizes="(max-width: 980px) 100vw, 50vw"
            width="900"
            height="750"
            fetchPriority="high"
          />
          {page.imageAlt?.startsWith("Ilustrační") && (
            <span className="svc-photo-note">Ilustrační fotografie</span>
          )}
        </div>
      </header>
      <div className="svc-blocks rd-wrap">
        {page.sections.map((section, index) => {
          const image = blockImages[index];
          return (
            <section
              className={`svc-block${image ? "" : " is-text"}${index % 2 ? " is-flipped" : ""}`}
              id={section.id ?? `cast-${index + 1}`}
              key={section.title}
            >
              {image && (
                <div className="svc-block-photo">
                  <ResponsiveImage
                    src={image}
                    alt={blockImageAlt(page, image)}
                    sizes="(max-width: 980px) 100vw, 50vw"
                    loading="lazy"
                    width="750"
                    height="560"
                  />
                </div>
              )}
              <div className="svc-block-copy">
                <span className="svc-num" aria-hidden="true">
                  0{index + 1}
                </span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((text) => (
                      <li key={text}>
                        <Check size={17} aria-hidden="true" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          );
        })}
      </div>
      {page.gallery.length > 0 && (
        <section className="svc-gallery" id="realizace" aria-labelledby="realizace-title">
          <div className="rd-wrap">
            <div className="svc-section-head">
              <h2 id="realizace-title">Realizace</h2>
              <a className="rd-link" href="/reference/">
                Všechny reference <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <Gallery images={page.gallery} initialCount={4} />
          </div>
        </section>
      )}
      {faq.length > 0 && (
        <section className="svc-faq rd-wrap" aria-labelledby="faq-title">
          <JsonLd data={faqSchema(faq)} />
          <div className="svc-faq-head">
            <h2 id="faq-title">Časté otázky</h2>
            <a className="rd-link" href="/ciste-fasady/">
              Další odpovědi od DR Fasády <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="svc-faq-list">
            {faq.map((item) => (
              <details key={item.id}>
                <summary>
                  <span>{item.question}</span>
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      <ServiceCTA servicePath={page.path} />
      {related.length > 0 && (
        <section className="svc-related rd-wrap" aria-labelledby="related-title">
          <h2 id="related-title">Související služby</h2>
          <div className="svc-related-grid">
            {related.map((item) => (
              <a key={item.path} href={item.path} className="rd-photo-card">
                <ResponsiveImage
                  src={item.heroImage}
                  alt=""
                  sizes="(max-width: 760px) 100vw, 25vw"
                  loading="lazy"
                  width="500"
                  height="300"
                />
                <span className="rd-photo-card-title">
                  {item.shortTitle.replace(" (airless)", "")}
                </span>
                <span className="rd-photo-card-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
