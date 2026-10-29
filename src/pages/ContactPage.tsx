import { primaryPhone, address } from "../data/contacts";
import { MapPin, Clock, Mail } from "lucide-react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ContactForm } from "../components/ContactForm";
export function ContactPage() {
  return (
    <div className="rd-contact-page">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <ContactForm
        endpoint={import.meta.env.VITE_CONTACT_ENDPOINT}
        showVans
        lead={
          <div className="rd-contact-head">
            <h1>Kontakt</h1>
            <p>
              Zavolejte nám nebo zanechte zprávu. Ukázku čištění fasád, střech a
              dlažeb nabízíme zdarma po celé České republice.
            </p>
          </div>
        }
      />
      <section className="rd-wrap rd-contact-details" aria-label="Kontaktní údaje">
        <div>
          <MapPin size={24} aria-hidden="true" />
          <h2>Kde nás najdete</h2>
          <address>
            <strong>AWCLEAN s.r.o.</strong>
            <br />
            {address.street}
            <br />
            {address.postalCode} {address.city}, {address.region}
            <br />
            IČO 50823272
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
      <section className="rd-wrap rd-legal-info" id="provozovatel" aria-labelledby="provozovatel-title">
        <h2 id="provozovatel-title">Provozovatel webu a poskytovatel služeb</h2>
        <p>
          <strong>AWCLEAN s.r.o.</strong>, sídlo Čsl. armády 1457/2A, 955 01 Topoľčany, Slovenská republika.
          IČO 50823272, DIČ 2120488458, IČ DPH SK2120488458.
          Zapsaná v Obchodnom registri Okresného súdu Nitra, oddiel Sro, vložka č. 43001/N.
        </p>
        <p>
          Kontaktní adresa pro Českou republiku: {address.street}, {address.postalCode} {address.city}.
          E-mail <a href="mailto:info@awclean.cz">info@awclean.cz</a>, <a href="mailto:info@awclean.sk">info@awclean.sk</a>,
          telefon <a href={primaryPhone.href}>{primaryPhone.phone}</a>.
        </p>
        <h3>Mimosoudní řešení spotřebitelských sporů</h3>
        <p>
          Spotřebitel z České republiky se může obrátit na Českou obchodní inspekci, která je věcně příslušným
          subjektem mimosoudního řešení spotřebitelských sporů: <a href="https://adr.coi.cz">adr.coi.cz</a>.
        </p>
        <p lang="sk">
          Spotrebiteľ zo Slovenskej republiky sa môže obrátiť na Slovenskú obchodnú inšpekciu alebo iný subjekt
          alternatívneho riešenia spotrebiteľských sporov zapísaný v{"\u00a0"}
          <a href="https://www.mhsr.sk/obchod/ochrana-spotrebitela/alternativne-riesenie-spotrebitelskych-sporov-1/zoznam-subjektov-alternativneho-riesenia-spotrebitelskych-sporov-1">
            zozname Ministerstva hospodárstva SR
          </a>.
        </p>
      </section>
    </div>
  );
}
