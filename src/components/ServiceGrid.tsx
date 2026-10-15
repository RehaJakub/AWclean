import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Service } from "../data/services";
import { Section } from "./Section";
import { AudienceNavigator } from "./AudienceNavigator";
interface ServiceGridProps {
  services: Service[];
}
export function ServiceGrid({ services }: ServiceGridProps) {
  const main = services.filter((service) => service.featured);
  const additional = services.filter((service) => !service.featured);
  return (
    <Section id="sluzby" className="services-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NAŠE SLUŽBY</p>
            <h2>
              Co potřebujete <span>vyčistit?</span>
            </h2>
          </div>
          <p className="heading-aside">
            Od rodinného domu po výrobní halu. Postup přizpůsobíme vašemu
            povrchu.
          </p>
        </div>
        <div className="service-grid">
          {main.map((service, i) => (
            <a
              className="service-card"
              key={service.slug}
              href={service.href}
              style={{ "--card-index": i } as CSSProperties}
            >
              <div className="service-image">
                <ResponsiveImage
                  sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 25vw"
                  src={service.image}
                  alt={service.imageAlt}
                  width="750"
                  height="560"
                />
              </div>
              <div className="service-copy">
                <h3>
                  {service.title}
                  <ArrowUpRight size={21} aria-hidden="true" />
                </h3>
                <p>{service.description}</p>
              </div>
            </a>
          ))}
        </div>
        <AudienceNavigator />
        <div className="additional-services">
          <h3>Další péče o váš objekt</h3>
          <div>
            {additional.map((service) => (
              <a key={service.slug} href={service.href}>
                {service.title}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
