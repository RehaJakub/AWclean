import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Phone, Search, X } from "lucide-react";
import { faqCategories, filterFaq, type FaqCategory } from "../data/faq";
import { useWidgetVisibility } from "../hooks/useWidgetVisibility";
import { ServiceGuide } from "./ServiceGuide";
import "./MascotWidget.css";

const mascotImage = "/mascot/dr-fasada.png";
export default function MascotWidget() {
  const { obscured, formFocused } = useWidgetVisibility("mascot-faq");
  const [hidden, setHidden] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<FaqCategory>("vse");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mode, setMode] = useState<"guide" | "faq">("guide");
  const [imageFailed, setImageFailed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 655, height: 800 });
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const edgeToggle = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const invitationDismissed = useRef(false);
  const previousOverflow = useRef("");
  const results = filterFaq(category, query);
  const [overForm, setOverForm] = useState(false);
  const [pulledOut, setPulledOut] = useState(false);
  const tucked = hidden || formFocused || (overForm && !pulledOut);

  useEffect(() => {
    const form = document.querySelector("form.contact-form");
    if (!form || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOverForm(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open || !returnFocus.current) return;
    returnFocus.current = false;
    const frame = window.requestAnimationFrame(() => (tucked ? edgeToggle.current : trigger.current)?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [open, tucked]);

  useEffect(() => {
    if (hidden) return;
    const enter = window.setTimeout(() => {
      setArrived(true);
      if (!invitationDismissed.current) setBubble(true);
    }, 3000);
    const dismiss = window.setTimeout(() => setBubble(false), 9000);
    return () => { window.clearTimeout(enter); window.clearTimeout(dismiss); };
  }, [hidden]);

  useEffect(() => {
    if (!open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow.current; };
  }, [open]);

  const close = (): void => {
    dialog.current?.close();
  };
  const afterClose = (): void => {
    returnFocus.current = true;
    setOpen(false);
    setBubble(false);
  };
  const show = (): void => {
    invitationDismissed.current = true;
    setBubble(false);
    setOpen(true);
    dialog.current?.showModal();
    closeButton.current?.focus();
  };
  const restore = (): void => {
    setHidden(false);
    setArrived(true);
    invitationDismissed.current = true;
    setBubble(false);
  };
  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>): void => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
    )).filter((element) => element.getClientRects().length > 0);
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  };
  return (
    <>
      <aside className={`mascot-launcher${arrived ? " is-arrived" : ""}${tucked ? " is-tucked" : ""}${open || obscured ? " is-open" : ""}${bubble ? " is-waving" : ""}`} aria-label="Pomocník DR Fasáda" inert={!arrived || open || obscured}>
        {!tucked && !obscured && <button type="button" className="mascot-bubble" onClick={show} aria-haspopup="dialog" aria-expanded={open} aria-controls="mascot-faq"><strong>DR Fasáda</strong><span>vám poradí</span></button>}
        <button ref={edgeToggle} className="mascot-hide" type="button" aria-label={tucked ? "Vysunout maskota z pravého okraje" : "Zasunout maskota doprava"} title={tucked ? "Vysunout" : "Zasunout doprava"} onClick={() => { if (hidden) restore(); else if (tucked) setPulledOut(true); else { setBubble(false); setHidden(true); } }}>{tucked ? <ChevronLeft size={21} aria-hidden="true" /> : <ChevronRight size={21} aria-hidden="true" />}</button>
        <div className="mascot-viewport">
          <button ref={trigger} type="button" className={`mascot-trigger${imageFailed ? " mascot-fallback" : ""}`} aria-label={tucked ? "Vysunout DR Fasádu" : "Otevřít otázky a odpovědi s DR Fasádou"} aria-haspopup={tucked ? undefined : "dialog"} aria-expanded={tucked ? undefined : open} aria-controls={tucked ? undefined : "mascot-faq"} onClick={hidden ? restore : tucked ? () => setPulledOut(true) : show}>
            {imageFailed ? <span>DR Fasáda<br />Otázky a odpovědi</span> :
              <span className="mascot-nod"><span className="mascot-breathe"><img src={mascotImage} alt="DR Fasáda, maskot AWCLEAN" width={dimensions.width} height={dimensions.height} loading="lazy" decoding="async" onLoad={(event) => { setDimensions({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight }); }} onError={() => setImageFailed(true)} /></span></span>}
          </button>
        </div>
      </aside>
      <dialog ref={dialog} id="mascot-faq" role="dialog" aria-modal="true" aria-labelledby="mascot-title" className="mascot-dialog" onClose={afterClose} onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={trapFocus} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className="mascot-panel">
          <header className="mascot-header">
            {!imageFailed && <span className="mascot-avatar"><img src={mascotImage} alt="DR Fasáda, maskot AWCLEAN" width="655" height="800" loading="lazy" decoding="async" /></span>}
            <div><p>RÁD VÁM PORADÍM</p><h2 id="mascot-title">DR Fasáda</h2></div>
            <button ref={closeButton} type="button" className="mascot-close" onClick={close} aria-label="Zavřít otázky a odpovědi"><X size={21} aria-hidden="true" /></button>
          </header>
          <div className="mascot-body">
            <div className="mascot-mode" role="group" aria-label="Jak vám DR Fasáda pomůže">
              <button type="button" aria-pressed={mode === "guide"} onClick={() => setMode("guide")}>Najít službu</button>
              <button type="button" aria-pressed={mode === "faq"} onClick={() => setMode("faq")}>Časté otázky</button>
            </div>
            <div hidden={mode !== "guide"}><ServiceGuide /></div>
            <div hidden={mode !== "faq"}>
            <label className="mascot-search"><span className="sr-only">Hledat v otázkách a odpovědích</span><Search size={19} aria-hidden="true" /><input type="search" value={query} placeholder="Co vás zajímá?" onChange={(event) => { setQuery(event.target.value); setExpanded(null); }} /></label>
            <div className="mascot-categories" role="group" aria-label="Kategorie otázek">
              {faqCategories.map((item) => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); setExpanded(null); }}>{item.label}</button>)}
            </div>
            <p className="mascot-result-count" aria-live="polite">Nalezené odpovědi: {results.length}</p>
            <div className="mascot-questions">
              {results.map((item) => <article className="mascot-question" key={item.id}>
                <h3><button id={`faq-question-${item.id}`} type="button" aria-expanded={expanded === item.id} aria-controls={`faq-answer-${item.id}`} onClick={() => setExpanded(expanded === item.id ? null : item.id)}>{item.question}<ChevronDown size={18} aria-hidden="true" /></button></h3>
                <div className={`mascot-answer${expanded === item.id ? " is-expanded" : ""}`} id={`faq-answer-${item.id}`} role="region" aria-labelledby={`faq-question-${item.id}`} aria-hidden={expanded !== item.id} inert={expanded !== item.id}><div><p>{item.answer}</p></div></div>
              </article>)}
              {!results.length && <p className="mascot-empty">Zkuste jiné slovo nebo kategorii Vše. Nebo se nám ozvěte přímo.</p>}
            </div>
            </div>
            <section className="mascot-contact" aria-labelledby="mascot-contact-title"><h3 id="mascot-contact-title">Chcete se raději zeptat přímo?</h3><p>Zavolejte nám. Rádi vám vše vysvětlíme.</p>
              <a className="button button-primary" href="tel:+420773196097"><Phone size={17} aria-hidden="true" />Zavolat +420 773 196 097</a>
              <a className="button button-outline" href="/kontakt/?vzorek=1#kontakt">Referenční vzorek ZDARMA</a>
              <p className="mascot-sample-note">Pro čištění fasád, střech a dlažeb po celé ČR.</p>
              <a className="text-link" href="/kontakt/#kontakt">Napsat přes kontaktní formulář</a>
            </section>
          </div>
        </div>
      </dialog>
    </>
  );
}
