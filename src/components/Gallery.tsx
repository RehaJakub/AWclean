import { ResponsiveImage } from "./ResponsiveImage";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { GalleryImage } from "../data/pages/types";
interface GalleryProps {
  images: GalleryImage[];
  label?: string;
  initialCount?: number;
}
export function Gallery({
  images,
  label = "Fotografie realizací",
  initialCount = 6,
}: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const close = (): void => {
    dialog.current?.close();
    opener.current?.focus();
  };
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const onClose = (): void => {
      document.body.style.overflow = "";
      setIsOpen(false);
      opener.current?.focus();
    };
    element.addEventListener("close", onClose);
    return () => {
      element.removeEventListener("close", onClose);
      document.body.style.overflow = "";
    };
  }, []);
  if (!images.length) return null;
  const current = images[selected];
  return (
    <div className="gallery-block">
      <div className="project-gallery" aria-label={label}>
        {images
          .slice(0, expanded ? undefined : initialCount)
          .map((image, index) => (
            <figure className="gallery-figure" key={`${image.src}-${index}`}>
              <button
                className="gallery-item"
                type="button"
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setSelected(index);
                  setIsOpen(true);
                  dialog.current?.showModal();
                  document.body.style.overflow = "hidden";
                }}
                aria-label={`Zvětšit: ${image.alt}`}
              >
                <ResponsiveImage
                  sizes="(max-width: 760px) 100vw, 50vw"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  width="750"
                  height="560"
                />
                <span>
                  <Expand size={18} aria-hidden="true" />
                </span>
              </button>
              <figcaption>
                <strong>{image.caption ?? image.alt}</strong>
                {image.description && <p>{image.description}</p>}
                {image.href && (
                  <a href={image.href} className="text-link">
                    Detail realizace
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
      </div>
      {images.length > initialCount && (
        <button
          className="gallery-expand button button-outline"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Zobrazit méně"
            : `Zobrazit všechny fotografie (${images.length})`}
        </button>
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={label}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight")
            setSelected((selected + 1) % images.length);
          if (event.key === "ArrowLeft")
            setSelected((selected - 1 + images.length) % images.length);
        }}
      >
        <button
          autoFocus
          className="lightbox-close"
          onClick={close}
          aria-label="Zavřít fotografii"
        >
          <X />
        </button>
        {isOpen && current && (
          <figure>
            <ResponsiveImage
              sizes="90vw"
              loading="eager"
              src={current.src}
              alt={current.alt}
            />
            <figcaption aria-live="polite">
              {current.alt}
              <span>
                {selected + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        )}
        <div className="lightbox-controls">
          <button
            className="icon-button"
            onClick={() =>
              setSelected((selected - 1 + images.length) % images.length)
            }
            aria-label="Předchozí fotografie"
          >
            <ArrowLeft />
          </button>
          <button
            className="icon-button"
            onClick={() => setSelected((selected + 1) % images.length)}
            aria-label="Další fotografie"
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </div>
  );
}
