import { primaryPhone } from "../../data/contacts";
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
        {servicesByCategory.cisteni.map((service, index) => (
          <a key={service.href} href={service.href} className="rd-photo-card">
            <ResponsiveImage
              src={service.image}
              alt=""
              // První dvě dlaždice jsou přes dva sloupce (redesign.css .home-bento :nth-child(1), (2)).
              sizes={index < 2 ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) calc(50vw - 30px), 25vw"}
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
                        alt=""
                        sizes="(max-width: 900px) 50vw, 17vw"
                        loading="lazy"
                        width="600"
                        height="800"
                      />
                      {image.label && (
                        <span className={`rd-badge${image.label === "Po" ? " is-after" : ""}`} aria-hidden="true">
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeAbout() {
  const facts = [
    { value: "2,5 mil. m²", label: "vyčištěných ploch v ČR a SR" },
    { value: "Od roku 2001", label: "čištění fasád a střech" },
    { value: "Bez lešení", label: "z plošin a lezeckou technikou" },
    { value: "až 20 let", label: "záruka podle zvoleného ošetření, podmínky v nabídce" },
  ];
  return (
    <section className="home-about rd-wrap" id="o-nas" aria-labelledby="o-nas-title">
      <div className="home-about-photo">
        <ResponsiveImage
          src="/images/vozy/dve-dodavky-awclean-spolecny-bocni-pohled.webp"
          alt="Dvě firemní dodávky AWCLEAN s modrobílými polepy, boční pohled."
          sizes="(max-width: 900px) 100vw, 55vw"
          loading="lazy"
          width="2048"
          height="1152"
        />
      </div>
      <div className="home-about-copy">
        <h2 id="o-nas-title">Čistíme fasády od roku 2001.</h2>
        <p>
          Specializujeme se na čisticí práce v průmyslových, veřejných
          i zdravotnických zařízeních a pečujeme o rodinné i bytové domy.
          Používáme kvalitní technologie a šetrnou chemii ohleduplnou
          k životnímu prostředí.
        </p>
        <dl className="home-about-facts">
          {facts.map((fact) => (
            <div key={fact.value}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>
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
          <p>Fasády, střechy a dlažby po celé ČR.</p>
          <div className="rd-cta-actions">
            <a className="rd-btn rd-btn-light" href="#kontakt">
              {sampleLabel} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="rd-cta-phone" href={primaryPhone.href}>
              <Phone size={18} aria-hidden="true" /> {primaryPhone.phone}
            </a>
          </div>
        </div>
        <img
          className="home-sample-mascot"
          src="/mascot/dr-fasada-440.webp"
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
          Všech {referenceWorks.length} fotografií <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="home-references-grid">
        {photos.map((photo, index) => (
          <a key={photo.src} href="/reference/" className="home-reference-photo">
            <ResponsiveImage
              src={photo.src}
              alt={photo.alt}
              sizes={index === 0 ? "(max-width: 900px) 100vw, 40vw" : "(max-width: 900px) 50vw, 28vw"}
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
            <strong>Psali o nás: odborná reportáž v časopise Dům a Byt</strong>
          </span>
        </a>
      </div>
    </section>
  );
}
