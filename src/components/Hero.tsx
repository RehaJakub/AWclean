import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowRight, ChevronsLeftRight } from "lucide-react";
import { sampleLabel } from "../data/offers";

const before = {
  src: "/images/realizace/cihlova-fasada-pred-cistenim.webp",
  alt: "Tmavé usazeniny na cihlové fasádě před čištěním.",
};
const after = {
  src: "/images/realizace/cihlova-fasada-po-cisteni.webp",
  alt: "Oranžové cihlové zdivo po vyčištění.",
};

/** Úvodní porovnání před/po podle návrhu: tažení myší či prstem, šipky na klávesnici. */
export function Hero() {
  const [split, setSplit] = useState(50);
  const section = useRef<HTMLElement>(null);
  const dragging = useRef(false);
  const moveTo = (clientX: number): void => {
    const box = section.current?.getBoundingClientRect();
    if (!box) return;
    setSplit(Math.min(96, Math.max(4, ((clientX - box.left) / box.width) * 100)));
  };
  const start = (event: PointerEvent<HTMLElement>): void => {
    if (event.target instanceof Element && event.target.closest("a, button, input")) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };
  return (
    <section
      ref={section}
      className="rd-hero"
      aria-label="Porovnání cihlové fasády před čištěním a po něm"
      // Výchozí 50 % je v CSS, takže předvykreslené HTML nemá style="" a projde CSP bez 'unsafe-inline'.
      style={split === 50 ? undefined : ({ "--split": `${split}%` } as CSSProperties)}
      onPointerDown={start}
      onPointerMove={(event) => {
        if (dragging.current) moveTo(event.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="rd-hero-image">
        <div className="rd-hero-stage">
          <ResponsiveImage className="rd-hero-before" src={before.src} alt={before.alt} sizes="120vw" fetchPriority="high" width="1600" height="1200" />
        </div>
      </div>
      <div className="rd-hero-image rd-hero-after">
        <div className="rd-hero-stage">
          <ResponsiveImage className="rd-hero-after-img" src={after.src} alt={after.alt} sizes="120vw" fetchPriority="high" width="1600" height="1200" />
        </div>
      </div>
      <div className="rd-hero-shade" aria-hidden="true" />
      <div className="rd-hero-divider" aria-hidden="true">
        <span className="rd-badge">Před</span>
        <span className="rd-badge is-after">Po</span>
        <span className="rd-hero-handle">
          <ChevronsLeftRight size={24} />
        </span>
      </div>
      <input
        className="rd-hero-range"
        type="range"
        min="4"
        max="96"
        value={Math.round(split)}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-label="Posunout hranici mezi fotografií před a po čištění"
      />
      <div className="rd-hero-content rd-wrap">
        <div className="rd-hero-copy">
          <h1>
            Čistota až do <span>posledního metru.</span>
          </h1>
          <p>Fasády · Střechy · Dlažby · Průmysl. Od roku 2001.</p>
        </div>
        <div className="rd-hero-actions">
          <a className="rd-btn rd-btn-primary" href="#kontakt">
            {sampleLabel} <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="rd-btn rd-btn-ghost" href="#pred-a-po">
            Výsledky
          </a>
        </div>
      </div>
    </section>
  );
}
