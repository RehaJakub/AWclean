import { ResponsiveImage } from "./ResponsiveImage";
import { useId, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ChevronsLeftRight } from "lucide-react";
import type { Comparison } from "../data/references";
import { Section } from "./Section";
import { projects } from "../data/projects";
import { ProjectFacts } from "./ProjectFacts";
interface BeforeAfterSliderProps {
  items: Comparison[];
}
export function BeforeAfterSlider({ items }: BeforeAfterSliderProps) {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const [view, setView] = useState<"slider" | "photos">("slider");
  const id = useId();
  const item = items[index];
  const project = projects.find((project) => project.path === item?.projectPath);
  if (!item) return null;
  const change = (direction: number): void => {
    setIndex((index + direction + items.length) % items.length);
    setPosition(50);
  };
  const moveHandle = (event: PointerEvent<HTMLInputElement>): void => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(
      Math.round(
        Math.max(
          0,
          Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
        ),
      ),
    );
  };
  return (
    <Section className="comparison-section" id="pred-a-po">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SKUTEČNÉ VÝSLEDKY</p>
            <h2>
              Rozdíl <span>před a po čištění.</span>
            </h2>
          </div>
          <p className="heading-aside">
            Posuňte hranici a prohlédněte si proměnu.
            <br />
            Skutečné fotografie stejného objektu.
          </p>
        </div>
        <div className="comparison-layout">
          <div className="comparison-visual">
          <div className="comparison-view-switch" role="group" aria-label="Způsob porovnání fotografií">
            <button type="button" aria-pressed={view === "slider"} onClick={() => setView("slider")}>Posuvné porovnání</button>
            <button type="button" aria-pressed={view === "photos"} onClick={() => setView("photos")}>Dva snímky</button>
          </div>
          {view === "photos" ? <div className="comparison-stills">
            <figure><ResponsiveImage src={item.image} alt={item.beforeAlt} width={750} height={1000} loading="lazy" sizes="(max-width: 520px) 100vw, 40vw" /><figcaption>Před čištěním</figcaption></figure>
            <figure><ResponsiveImage src={item.afterImage} alt={item.afterAlt} width={750} height={1000} loading="lazy" sizes="(max-width: 520px) 100vw, 40vw" /><figcaption>Po čištění</figcaption></figure>
          </div> :
          <div
            className={`comparison${item.afterImage ? " comparison-separate" : ""}`}
            role="group"
            aria-label={item.title}
          >
            <div className="comparison-half after-image">
              <ResponsiveImage
                sizes="(max-width: 760px) 100vw, 90vw"
                src={item.afterImage ?? item.image}
                alt={item.afterAlt}
                loading="lazy"
                width="1920"
                height="698"
              />
            </div>
            <div
              className="comparison-half before-image"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <ResponsiveImage
                sizes="(max-width: 760px) 100vw, 90vw"
                src={item.image}
                alt={item.beforeAlt}
                loading="lazy"
                width="1920"
                height="698"
              />
            </div>
            <span className="photo-label before-label">PŘED</span>
            <span className="photo-label after-label">PO</span>
            <div className="comparison-line" style={{ left: `${position}%` }}>
              <span>
                <ChevronsLeftRight size={26} />
              </span>
            </div>
            <label className="sr-only" htmlFor={id}>
              Poměr zobrazení fotografie před čištěním a po čištění
            </label>
            <input
              id={id}
              className="comparison-range"
              type="range"
              aria-label="Porovnání před čištěním a po čištění"
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                event.currentTarget.focus();
                moveHandle(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  moveHandle(event);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              min="0"
              max="100"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-valuetext={`${position} procent fotografie před čištěním`}
            />
          </div>}
          </div>
          <div className="comparison-info">
            <span className="project-tag">ČIŠTĚNÍ FASÁD</span>
            <div aria-live="polite">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {project && <ProjectFacts project={project} compact />}
            </div>
            {project && <a className="button button-outline project-story-link" href={project.path}>Prohlédnout kartu proměny <ArrowRight size={17} aria-hidden="true" /></a>}
            <a className="text-link" href="/kontakt/?vzorek=1#kontakt">
              Chci ukázku čištění zdarma <ArrowRight size={17} />
            </a>
            <div className="gallery-controls">
              <button
                className="icon-button"
                aria-label="Předchozí realizace"
                onClick={() => change(-1)}
              >
                <ArrowLeft size={19} />
              </button>
              <span>
                0{index + 1}
                <span> / 0{items.length}</span>
              </span>
              <button
                className="icon-button"
                aria-label="Další realizace"
                onClick={() => change(1)}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="comparison-examples"
          aria-label="Příklady výsledků čištění"
        >
          {items.map((example, exampleIndex) => (
            <button
              key={example.title}
              type="button"
              className="comparison-example"
              aria-pressed={index === exampleIndex}
              onClick={() => {
                setIndex(exampleIndex);
                setPosition(50);
              }}
            >
              <span
                className={`example-photo${example.afterImage ? " example-photo-pair" : ""}`}
              >
                <ResponsiveImage
                  sizes="(max-width: 760px) 120px, 33vw"
                  src={example.image}
                  alt=""
                  loading="lazy"
                  width="960"
                  height="349"
                />
                {example.afterImage && (
                  <ResponsiveImage
                    sizes="(max-width: 760px) 120px, 33vw"
                    src={example.afterImage}
                    alt=""
                    loading="lazy"
                    width="750"
                    height="1000"
                  />
                )}
              </span>
              <span className="example-copy">
                <strong>{example.title}</strong>
                <span>{example.result}</span>
              </span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
