import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Phone,
  Mail,
  Clock,
  LoaderCircle,
  Send,
} from "lucide-react";
import { contacts, emails, privacyUrl } from "../data/contacts";
import {
  ContactError,
  contactMailto,
  initialValues,
  inquiryContext,
  sendContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
  type SubmitStatus,
} from "../lib/contact";
import { Section } from "./Section";
import { ResponsiveImage } from "./ResponsiveImage";
interface ContactFormProps {
  endpoint?: string;
  /** Fotka firemních dodávek pod kontakty (stránka Kontakt). */
  showVans?: boolean;
  /** Úvod nad kontakty (stránka Kontakt): nadpis a věta stojí v rovině s formulářem. */
  lead?: ReactNode;
}
export function ContactForm({ endpoint = "", showVans = false, lead }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusBox = useRef<HTMLDivElement>(null);
  // Po odeslání přesunout fokus na výsledek, jinak by po zakázaných polích spadl na body.
  const focusStatus = (): void => {
    window.requestAnimationFrame(() => statusBox.current?.focus());
  };
  const startedAt = useRef(0);
  const [context, setContext] = useState({ service: "", sample: "" });
  useEffect(() => {
    startedAt.current = performance.now();
    setContext(inquiryContext(window.location.search));
    // Návrat z odeslání bez JavaScriptu (contact.php → 303 /kontakt/?odeslano=1).
    if (new URLSearchParams(window.location.search).has("odeslano"))
      setStatus("success");
  }, []);
  const update = (field: keyof ContactValues, value: string): void => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (status !== "sending") setStatus("idle");
  };
  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (status === "sending") return;
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const first = (Object.keys(nextErrors) as Array<keyof ContactValues>)[0];
    if (first) {
      form.current
        ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          `[name="${first}"]`,
        )
        ?.focus();
      return;
    }
    setStatus("sending");
    try {
      await sendContact(values, endpoint, {
        website: honeypot.current?.value ?? "",
        // Rozdíl dvou časů téhož prohlížeče: nezávisí na posunu hodin vůči serveru.
        fillMs: Math.round(performance.now() - startedAt.current),
        ...context,
      });
      setStatus("success");
      setValues(initialValues);
      focusStatus();
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof ContactError
          ? error.message
          : "Spojení se nezdařilo nebo vypršel časový limit. Zkuste to znovu, případně nám zavolejte.",
      );
      focusStatus();
    }
  };
  return (
    <Section id="kontakt" className="contact-section">
      <div className="container contact-layout">
        <div className="contact-copy">
          {lead}
          <h2>
            Poptávka začíná <span>tady.</span>
          </h2>
          <p>
            Napište nám, co potřebujete vyčistit. Navrhneme vhodný postup a
            připravíme nezávaznou nabídku.
          </p>
          <div className="contact-perk">
            <Check size={17} aria-hidden="true" /> Ukázka čištění fasád, střech a dlažeb zdarma po
            celé ČR
          </div>
          <div className="contact-phones">
            {contacts.map((contact) => (
              <div key={contact.phone}>
                <Phone size={22} aria-hidden="true" />
                <div>
                  <span className="contact-phone-label">{contact.label}</span>
                  <a className="primary-contact" href={contact.href}>
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-emails">
            <Mail size={18} aria-hidden="true" />
            <div>
              {emails.map((email) => (
                <a href={`mailto:${email}`} key={email}>
                  {email}
                </a>
              ))}
            </div>
          </div>
          <div className="hours">
            <Clock size={17} aria-hidden="true" /> Provozní doba: Po–Ne 8:00–17:00
          </div>
          {showVans && <figure className="contact-vans">
            <ResponsiveImage
              src="/images/vozy/dve-dodavky-awclean-spolecny-bocni-pohled.webp"
              alt="Dvě firemní dodávky AWCLEAN s modrobílými polepy, boční pohled."
              sizes="(max-width: 900px) 100vw, 45vw"
              loading="lazy"
              width="2048"
              height="1152"
            />
            <figcaption>Působíme po celé ČR a SR.</figcaption>
          </figure>}
        </div>
        <form
          ref={form}
          className="contact-form"
          method="post"
          action={endpoint || undefined}
          noValidate
          onSubmit={(event) => {
            void submit(event);
          }}
          aria-busy={status === "sending"}
        >
          <h2 className="contact-form-title">S čím vám můžeme pomoci?</h2>
          <p>Napište nám, ozveme se. Společně najdeme řešení.</p>
          {(context.service || context.sample) && (
            <p className="form-context">
              Poptávka:{" "}
              {[context.service, context.sample && "ukázka čištění zdarma"]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <input type="hidden" name="service" value={context.service} />
          <input type="hidden" name="sample" value={context.sample} />
          <div className="form-grid">
            {(["name", "phone", "email", "message"] as const).map((field) => {
              const labels: Record<keyof ContactValues, string> = {
                name: "Jméno a příjmení",
                phone: "Telefon",
                email: "E-mail",
                message: "Co potřebujete vyčistit?",
              };
              const placeholders: Record<keyof ContactValues, string> = {
                name: "Vaše jméno",
                phone: "+420",
                email: "vas@email.cz",
                message: "Popište nám objekt, povrch a místo realizace…",
              };
              const common = {
                id: field,
                name: field,
                required: true,
                value: values[field],
                placeholder: placeholders[field],
                "aria-invalid": Boolean(errors[field]),
                "aria-describedby": errors[field]
                  ? `${field}-error`
                  : undefined,
                readOnly: status === "sending",
              };
              return (
                <div
                  key={field}
                  className={`field ${field === "email" || field === "message" ? "full-field" : ""}`}
                >
                  <label htmlFor={field}>
                    {labels[field]} <span>*</span>
                  </label>
                  {field === "message" ? (
                    <textarea
                      {...common}
                      rows={4}
                      maxLength={5000}
                      onChange={(e) => update(field, e.target.value)}
                    />
                  ) : (
                    <input
                      {...common}
                      type={
                        field === "phone"
                          ? "tel"
                          : field === "email"
                            ? "email"
                            : "text"
                      }
                      autoComplete={
                        field === "name"
                          ? "name"
                          : field === "phone"
                            ? "tel"
                            : "email"
                      }
                      maxLength={field === "phone" ? 30 : 200}
                      onChange={(e) => update(field, e.target.value)}
                    />
                  )}
                  {errors[field] && (
                    <span className="field-error" id={`${field}-error`}>
                      {errors[field]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Honeypot: lidé ho nevidí ani nečtou čtečkou, boti ho vyplní. */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="website">Web (nevyplňujte)</label>
            <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          <p className="privacy-note">
            Údaje z formuláře zpracuje AWCLEAN s.r.o. (IČO 50823272) jen
            k vyřízení vaší poptávky a přípravě nabídky. Podrobnosti, doba
            uložení a vaše práva jsou v{" "}
            <a href={privacyUrl}>zásadách ochrany osobních údajů</a>.
          </p>
          <button
            className="button button-primary submit-button"
            aria-disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? (
              <>
                <LoaderCircle className="animate-spin" size={18} /> Odesílám…
              </>
            ) : (
              <>
                Odeslat nezávaznou poptávku <ArrowRight size={18} />
              </>
            )}
          </button>
          <div ref={statusBox} tabIndex={-1} aria-live="polite" role="status" className="form-status">
            {status === "success" && (
              <p className="form-success">
                <Check size={18} aria-hidden="true" /> Děkujeme! Vaše poptávka byla přijata. Ozveme
                se vám.
              </p>
            )}
            {status === "error" && (
              <div className="form-error">
                <p>{errorMessage}</p>
                <a href={contactMailto(values)}>
                  <Send size={15} aria-hidden="true" /> Otevřít poptávku v e-mailu
                </a>
              </div>
            )}
          </div>
          <span className="form-footnote">
            Bez závazků. S osobním přístupem.
          </span>
        </form>
      </div>
    </Section>
  );
}
