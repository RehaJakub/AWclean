import { ArrowRight, Phone } from "lucide-react";
import { inquiryAction } from "../../data/offers";
interface ServiceCTAProps {
  servicePath?: string;
}
export function ServiceCTA({ servicePath }: ServiceCTAProps) {
  const action = inquiryAction(servicePath);
  return (
    <section className="service-cta">
      <div className="container">
        <div>
          <p className="eyebrow">DOMLUVME KONKRÉTNÍ ŘEŠENÍ</p>
          <h2>
            {action.freeSample
              ? "Nejdřív ukázka. Potom rozhodnutí."
              : "Nechte si připravit nezávaznou nabídku."}
          </h2>
          <p>
            {action.freeSample
              ? "Na malé ploše ukážeme výsledek čištění a připravíme cenovou nabídku. Ukázky provádíme po celé ČR zdarma."
              : "Napište nám, co potřebujete ošetřit. Posoudíme povrch a navrhneme postup i rozsah prací."}
          </p>
        </div>
        <div>
          <a className="button button-light" href={action.href}>
            {action.label}
            <ArrowRight size={19} />
          </a>
          <a className="cta-phone" href="tel:+420773196097">
            <Phone size={17} /> +420 773 196 097
          </a>
        </div>
      </div>
    </section>
  );
}
