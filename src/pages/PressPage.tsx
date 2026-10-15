import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
import { Gallery } from "../components/Gallery";
import { ServiceCTA } from "../components/services/ServiceCTA";
const pages = Array.from({ length: 4 }, (_, index) => ({
  src: `/images/press/reportaz-${index + 1}.webp`,
  alt: `Reportáž AWCLEAN v časopise Dům a Byt – strana ${index + 1}`,
}));
export function PressPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Psali o nás" }]} />
      <PageIntro
        eyebrow="DŮVĚRA A ODBORNOST"
        title="Zkušenosti, o kterých se píše."
        description="Prohlédněte si odbornou reportáž AWCLEAN v časopise Dům a Byt."
      />
      <section className="container press-detail">
        <h2>
          Reportáž <span>Dům a Byt.</span>
        </h2>
        <p>
          Jednotlivé stránky otevřete kliknutím. Větší zobrazení umožňuje
          přečíst celý článek.
        </p>
        <Gallery images={pages} label="Reportáž Dům a Byt" />
      </section>
      <ServiceCTA />
    </>
  );
}
