import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
export function Press() {
  return (
    <Section className="press-section">
      <div className="container press-layout">
        <div>
          <p className="eyebrow">DŮVĚRA A ODBORNOST</p>
          <h2>
            Psali o nás.
            <br />
            <span>A stojí za námi praxe.</span>
          </h2>
        </div>
        <a className="press-card" href="/psali-o-nas/">
          <ResponsiveImage
            src="/images/realizace/titulni-strana-reportaze-awclean-o-cisteni-fasad-a-strech.webp"
            alt="Reportáž AWCLEAN v časopise Dům a Byt"
            loading="lazy"
            width="100"
            height="140"
          />
          <div>
            <span className="small-label">V MÉDIÍCH</span>
            <h3>Dům a Byt</h3>
            <p>Přečtěte si naši odbornou reportáž.</p>
            <span className="text-link">
              Otevřít reportáž <ArrowUpRight size={15} />
            </span>
          </div>
        </a>
      </div>
    </Section>
  );
}
