import type { CSSProperties } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { sampleLabel } from "../data/offers";
import { heroSlides } from "../data/heroSlides";
import { useCarousel } from "../hooks/useCarousel";

export function Hero() {
  const carousel = useCarousel(heroSlides.length, 5000);
  const active = heroSlides[carousel.index];

  return (
    <section
      ref={carousel.ref}
      className={`cinema-hero${carousel.rotating ? " is-playing" : ""}`}
      aria-label="Služby AWCLEAN"
      aria-roledescription="prezentace"
      onFocusCapture={() => carousel.setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          carousel.setFocused(false);
      }}
    >
      <div className="cinema-images">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`cinema-image${index === carousel.index ? " is-active" : ""}`}
            aria-hidden={index !== carousel.index}
          >
            <ResponsiveImage
              src={slide.image}
              alt={slide.alt}
              width="1440"
              height="1920"
              style={{
                objectPosition: slide.position,
                "--hero-mobile-position": slide.mobilePosition ?? "62% 25%",
              } as CSSProperties}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
            />
          </div>
        ))}
      </div>
      <div className="cinema-shade" aria-hidden="true" />
      <div className="cinema-content container">
        <p className="cinema-kicker">
          <span /> Čistota až do posledního metru
        </p>
        <div className="cinema-story">
          <h1 key={active.id}>{active.heading} <span>{active.accent}</span></h1>
          <p className="hero-service-scope">Čištění fasád, střech, dlažeb a průmyslových objektů.</p>
          <p>
            {active.description} Působíme po celé ČR a SR.
          </p>
        </div>
        <div className="cinema-actions">
          <a
            className="button button-primary"
            href="/kontakt/?vzorek=1#kontakt"
          >
            {sampleLabel}
            <ArrowRight size={19} />
          </a>
          <a className="button button-outline cinema-outline" href="#pred-a-po">
            Prohlédnout výsledky
          </a>
        </div>
      </div>
      <div className="cinema-bottom container">
        <a href="#pred-a-po" className="cinema-discover">
          <ArrowDown size={17} /> VÝSLEDKY PŘED A PO
        </a>
        {!carousel.reducedMotion && (
          <button
            className="cinema-pause"
            onClick={() => carousel.setPaused(!carousel.paused)}
            aria-label={
              carousel.paused
                ? "Spustit automatické střídání snímků"
                : "Pozastavit automatické střídání snímků"
            }
          >
            {carousel.paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        )}
      </div>
      <p
        className="sr-only"
        aria-live={carousel.paused ? "polite" : "off"}
        aria-atomic="true"
      >
        Snímek {carousel.index + 1} z {heroSlides.length}: {active.label}
      </p>
    </section>
  );
}
