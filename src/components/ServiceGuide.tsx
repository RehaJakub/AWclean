import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Phone, RotateCcw } from "lucide-react";
import { guideBuildings, getGuideSurfaces, getGuideProblems, getGuideResult, type GuideSurface, type GuideProblem, type GuideBuilding } from "../data/guide";
import { services } from "../data/services";
import { referenceWorks } from "../data/referenceWorks";
import { ResponsiveImage } from "./ResponsiveImage";

export function ServiceGuide() {
  const [step, setStep] = useState(0);
  const [surface, setSurface] = useState<GuideSurface | null>(null);
  const [problem, setProblem] = useState<GuideProblem | null>(null);
  const [building, setBuilding] = useState<GuideBuilding | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  // Formulář je na homepage a kontaktu přímo na stránce; jinde vede odkaz na kontakt.
  const [formHref, setFormHref] = useState("/kontakt/#kontakt");
  useEffect(() => { if (document.getElementById("kontakt")) setFormHref("#kontakt"); }, []);
  useEffect(() => { if (interacted.current) heading.current?.focus(); }, [step]);
  const go = (next: number): void => { interacted.current = true; setStep(next); };
  const result = surface && problem && building ? getGuideResult({ surface, problem, building }) : null;
  const service = services.find((item) => item.href === result?.href.split("#")[0]);
  const example = referenceWorks.find((item) => result?.exampleImage ? item.src === result.exampleImage : item.category === result?.referenceCategory);
  const surfaceChoices = building ? getGuideSurfaces(building) : [];
  const problemChoices = surface ? getGuideProblems(surface) : [];
  const sampleFree = result?.href === "/cisteni-fasad/" || result?.href === "/cisteni-strech/" || result?.href === "/cisteni-dlazeb/";
  const titles = ["Kde potřebujete pomoct?", "Co chcete vyčistit nebo ošetřit?", "Jak to teď vypadá?", "DR Fasáda doporučuje"];
  const choice = (item: { value: string; label: string; hint?: string }, pressed: boolean, pick: () => void) => (
    <button key={item.value} type="button" aria-pressed={pressed} onClick={pick}>
      <span>{item.label}{item.hint && <small>{item.hint}</small>}</span><ArrowRight size={18} aria-hidden="true" />
    </button>
  );
  return (
    <section className="service-guide" aria-label="Průvodce výběrem služby">
      {step === 0 && <p className="guide-intro"><strong>Poradím vám, jakou službu potřebujete.</strong> Stačí pár kliknutí.</p>}
      <h3 ref={heading} tabIndex={-1}>{titles[step]}</h3>
      {step < 3 && <div className="guide-choices">
        {step === 0 && guideBuildings.map((item) => choice(item, building === item.value, () => { setBuilding(item.value); setSurface(null); setProblem(null); go(1); }))}
        {step === 1 && surfaceChoices.map((item) => choice(item, surface === item.value, () => { setSurface(item.value); setProblem(null); go(2); }))}
        {step === 2 && problemChoices.map((item) => choice(item, problem === item.value, () => { setProblem(item.value); go(3); }))}
      </div>}
      {step === 3 && result && <div className="guide-result">
        <h4>{result.title}</h4>
        <p>{result.text}</p>
        <h5>Co bude dál?</h5>
        <ol className="guide-next">
          <li>Zavoláte nám nebo napíšete.</li>
          <li>Přijedeme se podívat. Posudek je zdarma.{sampleFree && " Můžeme vám také zdarma vyčistit malou ukázku."}</li>
          <li>Dostanete nezávaznou nabídku. Rozhodnete se sami.</li>
        </ol>
        <a className="button button-primary" href="tel:+420773196097"><Phone size={17} aria-hidden="true" />Zavolat +420 773 196 097</a>
        <a className="button button-outline" href={formHref} onClick={(event) => event.currentTarget.closest("dialog")?.close()}><Mail size={17} aria-hidden="true" />Napsat přes formulář</a>
        {service && <a className="button button-outline" href={result.href}>Více o službě {service.title}<ArrowRight size={17} aria-hidden="true" /></a>}
        {example && <a className="guide-example" href={`/reference/?typ=${result.referenceCategory}`}><ResponsiveImage src={example.src} alt={example.alt} loading="lazy" width={600} height={450} sizes="380px" /><span>Podívejte se na naše výsledky <ArrowRight size={17} aria-hidden="true" /></span></a>}
      </div>}
      {step > 0 && <div className="guide-controls">
        {step > 0 && <button type="button" onClick={() => go(step - 1)}><ArrowLeft size={17} aria-hidden="true" />Zpět</button>}
        {step > 0 && <button type="button" onClick={() => { setSurface(null); setProblem(null); setBuilding(null); go(0); }}><RotateCcw size={17} aria-hidden="true" />Začít znovu</button>}
      </div>}
    </section>
  );
}
