import { ResponsiveImage } from "./ResponsiveImage";
import {
  ArrowRight,
  Check,
  FlaskConical,
  ShieldCheck,
  Layers,
  Wrench,
  PersonStanding,
  Paintbrush,
} from "lucide-react";
import { Section } from "./Section";
const benefits = [
  {
    icon: Paintbrush,
    title: "Čistý povrch v původních barvách",
    text: "Fasádě vracíme původní vzhled důkladným odstraněním nečistot.",
  },
  {
    icon: FlaskConical,
    title: "Šetrná moderní chemie",
    text: "Volíme postup podle povrchu a používáme profesionální čisticí prostředky.",
  },
  {
    icon: Wrench,
    title: "Technika, která má sílu",
    text: "I na odolné nečistoty máme řešení. Včetně stroje Walser TOP CLEANER.",
  },
  {
    icon: Layers,
    title: "Bez stavění lešení",
    text: "Pracujeme efektivně z plošin, bez zbytečných omezení kolem domu.",
  },
  {
    icon: PersonStanding,
    title: "Dosáhneme i výš",
    text: "Na obtížně dostupných místech využíváme speciální lezeckou techniku.",
  },
  {
    icon: ShieldCheck,
    title: "Za výsledkem si stojíme",
    text: "Záruka 5, 10 nebo 20 let podle vybraného ošetření a jeho podmínek.",
  },
];
export function WhyUs() {
  return (
    <Section id="proc-awclean" className="why-section">
      <div className="container why-layout">
        <div className="why-intro">
          <p className="eyebrow">PROČ AWCLEAN</p>
          <h2>
            Správný postup <span>pro váš povrch.</span>
          </h2>
          <p>
            Čistíme od roku 2001. Víme, co váš povrch potřebuje, a postaráme se
            o něj od první ukázky až po poslední detail.
          </p>
          <a href="/kontakt/" className="text-link">
            Nezávazně poptat <ArrowRight size={17} />
          </a>
          <figure className="why-work-photo">
            <ResponsiveImage src="/images/realizace/cisteni-fasady-bytoveho-domu-na-lane.webp" alt="Pracovník AWCLEAN čistí fasádu pomocí lezecké techniky." width={1440} height={1920} loading="lazy" sizes="(max-width: 760px) 100vw, 35vw" />
            <figcaption>Čištění fasády pomocí lezecké techniky.</figcaption>
          </figure>
          <div className="why-seal">
            <Check size={17} /> Posudek i ukázka čištění zdarma
          </div>
        </div>
        <div className="benefits">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div className="benefit" key={title}>
              <Icon size={24} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
