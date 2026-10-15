import { steps } from "../data/process";
import { ArrowUpRight, Phone, Eye, Sparkles } from "lucide-react";
import { Section } from "./Section";
const stepIcons = { phone: Phone, eye: Eye, sparkles: Sparkles };
export function Process() {
  return (
    <Section className="process-section" id="jak-to-probiha">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OD PRVNÍHO KONTAKTU K ČISTÉMU DOMU</p>
            <h2>
              Jednoduše.{" "}
              <span>Ve třech krocích.</span>
            </h2>
          </div>
          <a className="button button-primary" href="/kontakt/">
            Nezávazně poptat <ArrowUpRight size={20} />
          </a>
        </div>
        <ol className="process-steps">
          {steps.map((step) => {
            const Icon = stepIcons[step.icon];
            return (
              <li key={step.number}>
                <div className="step-marker">
                  <span className="step-number">{step.number}</span>
                  <Icon className="step-icon" size={27} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
