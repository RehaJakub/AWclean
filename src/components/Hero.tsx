import type { CSSProperties } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowRight, Pause, Play } from "lucide-react";
import { sampleLabel } from "../data/offers";
import { heroSlides } from "../data/heroSlides";
import { useCarousel } from "../hooks/useCarousel";

const tabLabels: Record<string, string> = {
  fasady: "Fasády",
  strechy: "Střechy",
  dlazby: "Dlažby",
};

export function Hero() {
  const carousel = useCarousel(heroSlides.length, 5000);
  const active = heroSlides[carousel.index];

  return (
    <section
      ref={carousel.ref}
      className={`rd-hero${carousel.rotating ? " is-playing" : ""}`}
      aria-label="Služby AWCLEAN"
      aria-roledescription="prezentace"
      onFocusCapture={() => carousel.setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          carousel.setFocused(false);
      }}
    >
      <div className="rd-hero-images">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`rd-hero-image${index === carousel.index ? " is-active" : ""}`}
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
      <div className="rd-hero-shade" aria-hidden="true" />
      <div className="rd-hero-content rd-wrap">
        <div className="rd-hero-copy">
          <h1 key={active.id}>
            {active.heading} <span>{active.accent}</span>
          </h1>
          <p>
            {active.description} Působíme po celé ČR a SR.
          </p>
          <p className="rd-hero-scope">
            Fasády · Střechy · Dlažby · Průmysl. Od roku 2001.
          </p>
        </div>
        <div className="rd-hero-side">
          <div className="rd-hero-actions">
            <a className="rd-btn rd-btn-primary" href="/kontakt/?vzorek=1#kontakt">
              {sampleLabel} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="rd-btn rd-btn-ghost" href="#pred-a-po">
              Prohlédnout výsledky
            </a>
          </div>
          <div className="rd-hero-controls">
            <div className="rd-hero-tabs" role="group" aria-label="Vybrat snímek">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-pressed={index === carousel.index}
                  onClick={() => {
                    carousel.setIndex(index);
                    carousel.setPaused(true);
                  }}
                >
                  {tabLabels[slide.id] ?? slide.label}
                </button>
              ))}
            </div>
            {!carousel.reducedMotion && (
              <button
                type="button"
                className="rd-hero-pause"
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
        </div>
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
