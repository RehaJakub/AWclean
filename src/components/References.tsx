import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Reference } from "../data/references";
import { Section } from "./Section";
interface ReferencesProps {
  items: Reference[];
}
export function References({ items }: ReferencesProps) {
  return (
    <Section id="reference" className="references-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / NAŠE PRÁCE</p>
            <h2>
              Naše práce <span>mluví za nás.</span>
            </h2>
          </div>
          <a className="text-link" href="/reference/">
            Všechny reference <ArrowRight size={17} />
          </a>
        </div>
        <div className="reference-grid">
          {items.map((item) => (
            <a className="reference-card" key={item.title} href={item.href}>
              <div
                className={`reference-photo${item.afterImage ? " reference-photo-pair" : ""}`}
              >
                <ResponsiveImage
                  sizes="(max-width: 760px) 100vw, 33vw"
                  src={item.image}
                  alt={
                    item.afterImage ? "Fasáda před čištěním" : item.description
                  }
                  loading="lazy"
                  width={item.afterImage ? 750 : 1920}
                  height={item.afterImage ? 1000 : 698}
                />
                {item.afterImage && (
                  <ResponsiveImage
                    sizes="(max-width: 760px) 100vw, 33vw"
                    src={item.afterImage}
                    alt="Stejná fasáda po vyčištění týmem AWCLEAN"
                    loading="lazy"
                    width="750"
                    height="1000"
                  />
                )}
              </div>
              <div>
                <h3>
                  {item.title}
                  <ArrowUpRight size={19} />
                </h3>
                <p>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
