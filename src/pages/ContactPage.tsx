import { MapPin, Clock, Mail } from "lucide-react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
import { ContactForm } from "../components/ContactForm";
export function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <PageIntro
        eyebrow="POJĎME SE DOMLUVIT"
        title="Kontakt a nezávazná poptávka"
        description="Zavolejte nám nebo zanechte zprávu. Ukázku čištění fasád, střech a dlažeb nabízíme zdarma po celé České republice."
      />
      <ContactForm endpoint={import.meta.env.VITE_CONTACT_ENDPOINT} />
      <section className="contact-details container">
        <div>
          <MapPin size={25} />
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
          <Clock size={25} />
          <h2>Kdy se ozvat</h2>
          <p>
            Provozní doba: Po–Ne 8:00–17:00.
            <br />
            Telefonní linka je k dispozici NON-STOP.
          </p>
        </div>
        <div>
          <Mail size={25} />
          <h2>Působíme v ČR a SR</h2>
          <p>
            <a href="mailto:info@awclean.cz">info@awclean.cz</a>
            <br />
            <a href="mailto:info@awclean.sk">info@awclean.sk</a>
          </p>
        </div>
      </section>
    </>
  );
}
