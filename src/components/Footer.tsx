import { useEffect, useState } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowUp, MessageSquareText, Facebook, Youtube } from "lucide-react";
import { ConsentManager } from "./ConsentManager";
import { privacyUrl, primaryPhone, address } from "../data/contacts";
import { useCurrentYear } from "../hooks/useCurrentYear";
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
interface FooterProps {
  currentPath: string;
}
/** Stránky, na kterých je kontaktní formulář přímo pod obsahem. */
const pagesWithForm = ["/", "/kontakt/"];
export function Footer({ currentPath }: FooterProps) {
  const formHref = pagesWithForm.includes(currentPath) ? "#kontakt" : "/kontakt/#kontakt";
  const [formVisible, setFormVisible] = useState(false);
  const year = useCurrentYear();
  useEffect(() => {
    const form = document.getElementById("kontakt");
    if (!form || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFormVisible(entry?.isIntersecting ?? false),
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
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
            <a className="rd-footer-phone" href={primaryPhone.href}>
              {primaryPhone.phone}
            </a>
            <p>
              Telefon NON-STOP · provozní doba Po–Ne 8:00–17:00
              <br />
              Působíme po celé ČR a SR
            </p>
            <address>
              AWCLEAN s.r.o., IČO 50823272
              <br />
              {address.street}, {address.postalCode} {address.city}
              <br />
              Sídlo: Čsl. armády 1457/2A, 955 01 Topoľčany, SR
              <br />
              IČ DPH SK2120488458
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
              <h2 className="rd-footer-heading">{column.title}</h2>
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
            © {year} AWCLEAN s.r.o. · zkušenosti s čištěním od roku 2001
          </span>
          <a href="/kontakt/#provozovatel">Údaje o společnosti</a>
          <a href={privacyUrl}>Ochrana osobních údajů a cookies</a>
          <ConsentManager />
          <a href="#" className="rd-back-top">
            Zpět nahoru <ArrowUp size={15} />
          </a>
        </div>
      </div>
      <a
        className={`mobile-call rd-inquiry-float${formVisible ? " is-hidden" : ""}`}
        href={formHref}
        aria-hidden={formVisible || undefined}
        tabIndex={formVisible ? -1 : undefined}
      >
        <MessageSquareText size={19} aria-hidden="true" /> Nezávazná poptávka
      </a>
    </footer>
  );
}
