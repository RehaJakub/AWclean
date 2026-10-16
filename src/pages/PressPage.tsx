import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Gallery } from "../components/Gallery";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { ServiceCTA } from "../components/services/ServiceCTA";
const pages = Array.from({ length: 4 }, (_, index) => ({
  src: `/images/press/reportaz-${index + 1}.webp`,
  alt: `Reportáž AWCLEAN v časopise Dům a Byt – strana ${index + 1}`,
}));
export function PressPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Psali o nás" }]} />
      <header className="rd-wrap press-hero">
        <div className="press-hero-copy">
          <p className="svc-kicker">Psali o nás</p>
          <h1>Reportáž v časopise Dům a Byt</h1>
          <p className="svc-lead">
            Odborná reportáž AWCLEAN o čištění fasád a střech.
          </p>
          <div className="svc-actions">
            <a className="rd-btn rd-btn-dark" href="/cisteni-fasad/">
              Čištění fasád
            </a>
            <a className="rd-btn rd-btn-outline" href="/cisteni-strech/">
              Čištění střech
            </a>
          </div>
        </div>
        <div className="press-cover">
          <ResponsiveImage
            src="/images/realizace/titulni-strana-reportaze-awclean-o-cisteni-fasad-a-strech.webp"
            alt="Titulní strana reportáže AWCLEAN v časopise Dům a Byt"
            sizes="(max-width: 900px) 80vw, 520px"
            fetchPriority="high"
            width="520"
            height="700"
          />
        </div>
      </header>
      <section className="rd-wrap press-pages" aria-labelledby="press-pages-title">
        <h2 id="press-pages-title">Stránky reportáže</h2>
        <Gallery images={pages} label="Reportáž Dům a Byt" initialCount={4} />
      </section>
      <ServiceCTA />
    </>
  );
}
