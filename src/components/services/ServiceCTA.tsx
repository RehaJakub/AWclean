import { primaryPhone } from "../../data/contacts";
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
              ? "Na malé ploše vašeho objektu předvedeme čištění. Výsledek uvidíte předem, bez závazku. Zdarma po celé ČR."
              : "Posoudíme povrch a navrhneme postup."}
          </p>
          <div className="rd-cta-actions">
            <a className="rd-btn rd-btn-light" href={action.href}>
              {action.label} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="rd-cta-phone" href={primaryPhone.href}>
              <Phone size={18} aria-hidden="true" /> {primaryPhone.phone}
            </a>
          </div>
        </div>
        <img
          className="rd-cta-mascot"
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
