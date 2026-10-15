import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { guideProblems, guideBuildings, getGuideSurfaces, getGuideProblems, getGuideResult, type GuideSurface, type GuideProblem, type GuideBuilding } from "../data/guide";
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
  useEffect(() => { if (interacted.current) heading.current?.focus(); }, [step]);
  const go = (next: number): void => { interacted.current = true; setStep(next); };
  const result = surface && problem && building ? getGuideResult({ surface, problem, building }) : null;
  const service = services.find((item) => item.href === result?.href.split("#")[0]);
  const example = referenceWorks.find((item) => result?.exampleImage ? item.src === result.exampleImage : item.category === result?.referenceCategory);
  const surfaceChoices = building ? getGuideSurfaces(building) : [];
  const problemChoices = surface ? getGuideProblems(surface) : [];
  const buildingLabel = guideBuildings.find((item) => item.value === building)?.label;
  const surfaceLabel = surfaceChoices.find((item) => item.value === surface)?.label;
  const surfaceQuestions: Record<GuideBuilding, string> = {
    dum: "O kterou část domu se máme postarat?",
    bytovy: "Co potřebuje váš bytový dům?",
    firma: "Kterou část firemního objektu řešíte?",
  };
  const titles = ["Pro jaký objekt hledáte službu?", building ? surfaceQuestions[building] : "O jaký povrch jde?", "Co chcete s povrchem řešit?", "Doporučení DR Fasády"];
  return (
    <section className="service-guide" aria-label="Průvodce výběrem služby">
      {step === 0 && <div className="guide-intro">
        <h3>Nevíte, jakou službu vybrat?</h3>
        <p><strong>DR Fasáda vám pomůže.</strong> Začněte typem objektu. Potom vyberete jeho část a to, co potřebujete vyřešit. Ukážu vám vhodnou službu.</p>
      </div>}
      <p className="guide-progress">{step < 3 ? `Krok ${step + 1} ze 3` : "Váš výběr"}</p>
      <div className="guide-progress-track" aria-hidden="true"><span style={{ width: `${Math.min(step + 1, 3) / 3 * 100}%` }} /></div>
      <h3 ref={heading} tabIndex={-1}>{titles[step]}</h3>
      {step > 0 && step < 3 && <p className="guide-summary">{buildingLabel}{step === 2 && surfaceLabel ? ` · ${surfaceLabel}` : ""}</p>}
      {step < 3 && <div className="guide-choices">
        {step === 0 && guideBuildings.map((item) => <button key={item.value} type="button" aria-pressed={building === item.value} onClick={() => { setBuilding(item.value); setSurface(null); setProblem(null); go(1); }}>{item.label}<ArrowRight size={18} aria-hidden="true" /></button>)}
        {step === 1 && surfaceChoices.map((item) => <button key={item.value} type="button" aria-pressed={surface === item.value} onClick={() => { setSurface(item.value); setProblem(null); go(2); }}>{item.label}<ArrowRight size={18} aria-hidden="true" /></button>)}
        {step === 2 && problemChoices.map((item) => <button key={item.value} type="button" aria-pressed={problem === item.value} onClick={() => { setProblem(item.value); go(3); }}>{item.label}<ArrowRight size={18} aria-hidden="true" /></button>)}
      </div>}
      {step === 3 && result && <div className="guide-result">
        <p className="guide-summary">{buildingLabel} · {surfaceLabel} · {guideProblems.find((item) => item.value === problem)?.label}</p>
        <h4>{result.title}</h4>
        <p>{result.text}</p>
        <a className="button button-primary" href={result.href}>{service?.title ?? "Probrat ošetření s AWCLEAN"}<ArrowRight size={17} aria-hidden="true" /></a>
        {example && <a className="guide-example" href={`/reference/?typ=${result.referenceCategory}`}><ResponsiveImage src={example.src} alt={example.alt} loading="lazy" width={600} height={450} sizes="380px" /><span>Ukázky z této oblasti <ArrowRight size={17} aria-hidden="true" /></span></a>}
      </div>}
      {step > 0 && <div className="guide-controls">
        {step > 0 && <button type="button" onClick={() => go(step - 1)}><ArrowLeft size={17} aria-hidden="true" />Zpět</button>}
        {step > 0 && <button type="button" onClick={() => { setSurface(null); setProblem(null); setBuilding(null); go(0); }}><RotateCcw size={17} aria-hidden="true" />Začít znovu</button>}
      </div>}
      <p className="guide-note">Průvodce vás nasměruje na služby a ukázky. Posouzení konkrétního objektu provede tým AWCLEAN.</p>
    </section>
  );
}
