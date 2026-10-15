import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowUp, Phone, Facebook, Youtube } from "lucide-react";
import { ConsentManager } from "./ConsentManager";
import { privacyUrl } from "../data/contacts";
import { footerServices } from "../data/services";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Zpět na úvod">
              <ResponsiveImage
                loading="eager"
                src="/images/logo.svg"
                width="190"
                height="33"
                alt="AWCLEAN"
              />
            </a>
            <p>
              Čistíme. Chráníme. Vracíme krásu.
              <br />
              Profesionálně od roku 2001.
            </p>
            <div className="socials">
              <a
                href="https://www.facebook.com/awclean"
                aria-label="AWCLEAN na Facebooku"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@AWCLEANs.r.o"
                aria-label="AWCLEAN na YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3>Kde nás najdete</h3>
            <address>
              <strong>AWCLEAN s.r.o.</strong>
              <br />
              Na Výsluní 298
              <br />
              294 28 Chotětov
              <br />
              Mladá Boleslav
            </address>
          </div>
          <div>
            <h3>Naše služby</h3>
            {footerServices.map((service) => (
              <a key={service.slug} href={service.href}>
                {service.title.replace(" (airless)", "")}
              </a>
            ))}
            <a href="/ostatni-sluzby/">Ostatní služby</a>
          </div>
          <div>
            <h3>Jsme tu pro vás</h3>
            <a href="/kontakt/">Kontakt a poptávka</a>
            <a href="/psali-o-nas/">Psali o nás</a>
            <a href="/ciste-fasady/">Odborné posouzení fasády</a>
            <a className="footer-phone" href="tel:+420773196097">
              +420 773 196 097
            </a>
            <a href="mailto:info@awclean.cz">info@awclean.cz</a>
            <p>
              Po–Ne 8:00–17:00
              <br />
              Telefonní linka NON-STOP
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} AWCLEAN s.r.o. Všechna práva vyhrazena.
          </span>
          <a href={privacyUrl}>Ochrana osobních údajů a cookies</a>
          <ConsentManager />
          <a href="#" className="back-top">
            Zpět nahoru <ArrowUp size={15} />
          </a>
        </div>
      </div>
      <a className="mobile-call" href="tel:+420773196097">
        <Phone size={18} /> Zavolat <span>+420 773 196 097</span>
      </a>
    </footer>
  );
}
