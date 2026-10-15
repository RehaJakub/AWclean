import { ArrowRight } from "lucide-react";
import { Section } from "./Section";

export function SampleBanner() {
  return (
    <Section className="sample-banner" label="Ukázka čištění zdarma">
      <div className="container sample-banner-inner">
        <div>
          <p className="eyebrow">NEJDŘÍV UKÁZKA. POTOM ROZHODNUTÍ.</p>
          <h2>
            Přesvědčte se
            <br />
            <span>na vlastní fasádě.</span>
          </h2>
          <p>
            Posouzení, cenová kalkulace a referenční vzorek čištění.
            <br />
            Po celé České republice zdarma.
          </p>
        </div>
        <a href="/kontakt/?vzorek=1#kontakt" className="button button-light">
          Chci ukázku čištění zdarma <ArrowRight size={19} />
        </a>
      </div>
    </Section>
  );
}
