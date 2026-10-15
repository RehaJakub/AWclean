import { ArrowRight, Phone } from "lucide-react";
import { ResponsiveImage } from "../ResponsiveImage";
import { servicesByCategory } from "../../data/services";
import { projects, type Project } from "../../data/projects";
import { orderReferenceWorks, referenceWorks } from "../../data/referenceWorks";
import { sampleLabel } from "../../data/offers";

const shortNames: Record<string, string> = {
  "/cisteni-fasad/": "Fasády",
  "/cisteni-strech/": "Střechy",
  "/cisteni-dlazeb/": "Dlažby",
  "/cisteni-prumyslovych-objektu/": "Průmyslové objekty",
  "/cisteni-svetliku/": "Světlíky",
  "/cisteni-hlinikovych-fasad/": "Hliníkové fasády",
  "/cisteni-historickych-fasad/": "Historické fasády",
  "/ostatni-sluzby/cisteni-pomniku/": "Pomníky",
};

export function HomeServices() {
  const extras = [...servicesByCategory.natery, ...servicesByCategory.ostatni];
  return (
    <section className="home-services rd-wrap" id="sluzby" aria-labelledby="sluzby-title">
      <div className="svc-section-head">
        <h2 id="sluzby-title">Co vyčistíme</h2>
        <a className="rd-link" href="/sluzby/">
          Všechny služby <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="home-bento">
        {servicesByCategory.cisteni.map((service) => (
          <a key={service.href} href={service.href} className="rd-photo-card">
            <ResponsiveImage
              src={service.image}
              alt=""
              sizes="(max-width: 900px) 50vw, 25vw"
              loading="lazy"
              width="750"
              height="560"
            />
            <span className="rd-photo-card-title">
              {shortNames[service.href] ?? service.title}
            </span>
            <span className="rd-photo-card-arrow" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </a>
        ))}
      </div>
      <div className="home-extras">
        {extras.map((service) => (
          <a key={service.href} href={service.href}>
            <span className="home-extra-thumb" aria-hidden="true">
              <ResponsiveImage src={service.image} alt="" sizes="72px" width="72" height="72" />
            </span>
            <span>{service.title.replace(" (airless)", "")}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

interface ResultImage {
  src: string;
  alt: string;
  label?: string;
}
/** Jen fotografie, které k dané realizaci skutečně patří (src/data/projects.ts). */
function resultImages(project: Project): ResultImage[] {
  if (project.comparison)
    return [
      { src: project.comparison.before, alt: project.comparison.beforeAlt, label: "Před" },
      { src: project.comparison.after, alt: project.comparison.afterAlt, label: "Po" },
    ];
  if (project.gallery.length === 2)
    return [
      { ...project.gallery[0], label: "Před" },
      { ...project.gallery[1], label: "Po" },
    ];
  return [{ src: project.image, alt: project.gallery[0]?.alt ?? project.title }];
}

export function HomeResults() {
  return (
    <section className="home-results" id="pred-a-po" aria-labelledby="vysledky-title">
      <div className="rd-wrap">
        <div className="svc-section-head">
          <h2 id="vysledky-title">Rozdíl je vidět.</h2>
          <a className="rd-link" href="/reference/">
            Všechny reference <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="home-results-grid">
          {projects.map((project) => {
            const images = resultImages(project);
            return (
              <a key={project.path} href={project.path} className="home-result">
                <span className={`home-result-photos${images.length > 1 ? " is-pair" : ""}`}>
                  {images.map((image) => (
                    <span key={image.src} className="home-result-photo">
                      <ResponsiveImage
                        src={image.src}
                        alt={image.alt}
                        sizes="(max-width: 900px) 50vw, 17vw"
                        loading="lazy"
                        width="600"
                        height="800"
                      />
                      {image.label && (
                        <span className={`rd-badge${image.label === "Po" ? " is-after" : ""}`}>
                          {image.label}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
                <span className="home-result-title">
                  {project.title}
                  <ArrowRight size={20} aria-hidden="true" />
                </span>
                <span className="home-result-text">{project.outcome}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeSample() {
  return (
    <section className="home-sample" aria-labelledby="ukazka-title">
      <div className="rd-wrap home-sample-inner">
        <div className="home-sample-copy">
          <h2 id="ukazka-title">
            Ukázka čištění
            <br />
            zdarma.
          </h2>
          <p>
            Na malé ploše ukážeme výsledek čištění fasády, střechy nebo dlažby.
            Ukázky provádíme po celé ČR zdarma.
          </p>
          <div className="rd-cta-actions">
            <a className="rd-btn rd-btn-light" href="#kontakt">
              {sampleLabel} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="rd-cta-phone" href="tel:+420773196097">
              <Phone size={18} aria-hidden="true" /> +420 773 196 097
            </a>
          </div>
        </div>
        <img
          className="home-sample-mascot"
          src="/mascot/dr-fasada.png"
          alt=""
          width="655"
          height="800"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}

export function HomeReferences() {
  const photos = orderReferenceWorks(referenceWorks).slice(0, 4);
  return (
    <section className="home-references rd-wrap" aria-labelledby="reference-title">
      <div className="svc-section-head">
        <h2 id="reference-title">Reference</h2>
        <a className="rd-link" href="/reference/">
          Všech {referenceWorks.length} realizací <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="home-references-grid">
        {photos.map((photo) => (
          <a key={photo.src} href="/reference/" className="home-reference-photo">
            <ResponsiveImage
              src={photo.src}
              alt={photo.alt}
              sizes="(max-width: 900px) 50vw, 25vw"
              loading="lazy"
              width="600"
              height="450"
            />
          </a>
        ))}
        <a href="/psali-o-nas/" className="home-press">
          <ResponsiveImage
            src="/images/realizace/titulni-strana-reportaze-awclean-o-cisteni-fasad-a-strech.webp"
            alt="Titulní strana reportáže AWCLEAN v časopise Dům a Byt"
            sizes="110px"
            loading="lazy"
            width="110"
            height="150"
          />
          <span>
            <span className="home-press-kicker">Psali o nás</span>
            <strong>Odborná reportáž v časopise Dům a Byt</strong>
          </span>
        </a>
      </div>
    </section>
  );
}
