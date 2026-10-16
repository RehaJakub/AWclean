import { ArrowRight, Phone } from "lucide-react";
import { inquiryAction } from "../../data/offers";
interface ServiceCTAProps {
  servicePath?: string;
}
export function ServiceCTA({ servicePath }: ServiceCTAProps) {
  const action = inquiryAction(servicePath);
  return (
    <section className="rd-cta rd-wrap" aria-labelledby="rd-cta-title">
      <div className="rd-cta-card">
        <div className="rd-cta-copy">
          <h2 id="rd-cta-title">
            {action.freeSample
              ? "Ukázka čištění zdarma."
              : "Nezávazná nabídka pro váš objekt."}
          </h2>
          <p>
            {action.freeSample
              ? "Výsledek uvidíte na malé ploše předem. Po celé ČR zdarma."
              : "Posoudíme povrch a navrhneme postup."}
          </p>
          <div className="rd-cta-actions">
            <a className="rd-btn rd-btn-light" href={action.href}>
              {action.label} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="rd-cta-phone" href="tel:+420773196097">
              <Phone size={18} aria-hidden="true" /> +420 773 196 097
            </a>
          </div>
        </div>
        <img
          className="rd-cta-mascot"
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
