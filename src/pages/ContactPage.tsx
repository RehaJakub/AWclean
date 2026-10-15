import { MapPin, Clock, Mail } from "lucide-react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ContactForm } from "../components/ContactForm";
export function ContactPage() {
  return (
    <div className="rd-contact-page">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <header className="rd-wrap rd-contact-head">
        <h1>Kontakt</h1>
        <p>
          Zavolejte nám nebo zanechte zprávu. Ukázku čištění fasád, střech a
          dlažeb nabízíme zdarma po celé České republice.
        </p>
      </header>
      <ContactForm endpoint={import.meta.env.VITE_CONTACT_ENDPOINT} />
      <section className="rd-wrap rd-contact-details" aria-label="Kontaktní údaje">
        <div>
          <MapPin size={24} aria-hidden="true" />
          <h2>Kde nás najdete</h2>
          <address>
            <strong>AWCLEAN s.r.o.</strong>
            <br />
            Na Výsluní 298
            <br />
            294 28 Chotětov, Mladá Boleslav
          </address>
        </div>
        <div>
          <Clock size={24} aria-hidden="true" />
          <h2>Kdy se ozvat</h2>
          <p>
            Provozní doba: Po–Ne 8:00–17:00.
            <br />
            Telefonní linka je k dispozici NON-STOP.
          </p>
        </div>
        <div>
          <Mail size={24} aria-hidden="true" />
          <h2>Působíme v ČR a SR</h2>
          <p>
            <a href="mailto:info@awclean.cz">info@awclean.cz</a>
            <br />
            <a href="mailto:info@awclean.sk">info@awclean.sk</a>
          </p>
        </div>
      </section>
    </div>
  );
}
