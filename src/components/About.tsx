import { useExperienceYears } from "../hooks/useExperienceYears";
import { ResponsiveImage } from "./ResponsiveImage";
import { CountUpBadge } from "./CountUpBadge";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "./Section";

export function About() {
  const experienceYears = useExperienceYears();
  return (
    <Section id="o-awclean" className="about-section" label="O AWCLEAN">
      <div className="container about-layout">
        <div className="about-mosaic">
          <div className="about-photo about-photo-two about-photo-fleet">
            <ResponsiveImage
              sizes="(max-width: 1000px) 100vw, 50vw"
              src="/images/vozy/dve-dodavky-awclean-spolecny-bocni-pohled.webp"
              alt="Dvě firemní dodávky AWCLEAN s modrobílými polepy, boční pohled."
              loading="lazy"
              width="2048"
              height="1536"
            />
          </div>
          <CountUpBadge
            value={experienceYears}
            suffix="+"
            label="let zkušeností v každém detailu"
            variant="experience"
          />
          <CountUpBadge
            value={2500000}
            suffix=" m²"
            label="vyčištěných ploch"
            variant="area"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">O AWCLEAN</p>
          <h2>Za čistým povrchem <span>stojí zkušenosti.</span></h2>
          <p className="about-lead">
            Profesionální čištění fasád a střech od roku 2001.
          </p>
          <p>
            Od rodinného domu po průmyslovou halu. Vracíme povrchům jejich
            původní vzhled a volíme postup podle toho, co opravdu potřebují. Za
            námi je už 2&nbsp;500&nbsp;000&nbsp;m² vyčištěných ploch.
          </p>
          <ul className="about-checks">
            <li>
              <Check size={17} /> Práce bez lešení
            </li>
            <li>
              <Check size={17} /> Šetrná moderní chemie
            </li>
            <li>
              <Check size={17} /> Speciální technika
            </li>
            <li>
              <Check size={17} /> Celá ČR a SR
            </li>
          </ul>
          <a className="button button-primary" href="#proc-awclean">
            Proč si vybrat AWCLEAN <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </Section>
  );
}
