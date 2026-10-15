import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowUp, Phone, Facebook, Youtube } from "lucide-react";
import { ConsentManager } from "./ConsentManager";
import { privacyUrl } from "../data/contacts";
import { servicesByCategory } from "../data/services";
import { projects } from "../data/projects";
interface FooterLink {
  label: string;
  href: string;
}
const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Čištění",
    links: servicesByCategory.cisteni.map((service) => ({
      label: service.title,
      href: service.href,
    })),
  },
  {
    title: "Nátěry a ochrana",
    links: [
      { label: "Nátěry střech a fasád", href: "/natery-strech-a-fasad/" },
      ...servicesByCategory.ostatni.map((service) => ({
        label: service.title,
        href: service.href,
      })),
      { label: "Přehled služeb", href: "/sluzby/" },
      { label: "Ostatní služby", href: "/ostatni-sluzby/" },
    ],
  },
  {
    title: "AWCLEAN",
    links: [
      { label: "Reference", href: "/reference/" },
      ...projects.map((project) => ({ label: project.title, href: project.path })),
      { label: "Psali o nás", href: "/psali-o-nas/" },
      { label: "Čisté fasády – poradenství", href: "/ciste-fasady/" },
      { label: "Kontakt a poptávka", href: "/kontakt/" },
    ],
  },
];
export function Footer() {
  return (
    <footer className="rd-footer">
      <div className="rd-wrap">
        <div className="rd-footer-main">
          <div className="rd-footer-brand">
            <a href="/" aria-label="Zpět na úvod" className="rd-footer-logo">
              <ResponsiveImage
                loading="lazy"
                src="/images/logo.svg"
                width="226"
                height="40"
                alt="AWCLEAN"
              />
            </a>
            <a className="rd-footer-phone" href="tel:+420773196097">
              +420 773 196 097
            </a>
            <p>
              Telefonní linka NON-STOP
              <br />
              Po–Ne 8:00–17:00 · Působíme po celé ČR a SR
            </p>
            <address>
              AWCLEAN s.r.o., Na Výsluní 298, 294 28 Chotětov
              <br />
              <a href="mailto:info@awclean.cz">info@awclean.cz</a>
            </address>
            <div className="rd-socials">
              <a href="https://www.facebook.com/awclean" aria-label="AWCLEAN na Facebooku">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@AWCLEANs.r.o" aria-label="AWCLEAN na YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label.replace(" (airless)", "")}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="rd-footer-bottom">
          <span>
            © {new Date().getFullYear()} AWCLEAN s.r.o. · od roku 2001
          </span>
          <a href={privacyUrl}>Ochrana osobních údajů a cookies</a>
          <ConsentManager />
          <a href="#" className="rd-back-top">
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
