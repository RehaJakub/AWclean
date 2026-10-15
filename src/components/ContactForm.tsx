import { useRef, useState, type FormEvent } from "react";
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
  contactMailto,
  initialValues,
  sendContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
  type SubmitStatus,
} from "../lib/contact";
import { Section } from "./Section";
interface ContactFormProps {
  endpoint?: string;
}
export function ContactForm({ endpoint = "" }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
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
      await sendContact(values, endpoint);
      setStatus("success");
      setValues(initialValues);
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.name !== "AbortError"
          ? error.message
          : "Spojení se nezdařilo nebo vypršel časový limit. Zkuste to znovu, případně nám zavolejte.",
      );
    }
  };
  return (
    <Section id="kontakt" className="contact-section">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">ZAČÍNÁ TO JEDNÍM KONTAKTEM</p>
          <h2>
            Poptávka začíná <span>tady.</span>
          </h2>
          <p>
            Napište nám, co potřebujete vyčistit. Navrhneme vhodný postup a
            připravíme nezávaznou nabídku.
          </p>
          <div className="contact-perk">
            <Check size={17} /> Ukázka čištění fasád, střech a dlažeb zdarma po
            celé ČR
          </div>
          <div className="contact-phones">
            {contacts.map((contact, i) => (
              <div key={contact.phone}>
                <Phone size={i === 0 ? 22 : 17} />
                <div>
                  <span>{contact.label}</span>
                  <a
                    className={i === 0 ? "primary-contact" : ""}
                    href={contact.href}
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-emails">
            <Mail size={18} />
            <div>
              {emails.map((email) => (
                <a href={`mailto:${email}`} key={email}>
                  {email}
                </a>
              ))}
            </div>
          </div>
          <div className="hours">
            <Clock size={17} /> Provozní doba: Po–Ne 8:00–17:00
          </div>
        </div>
        <form
          ref={form}
          className="contact-form"
          noValidate
          onSubmit={(event) => {
            void submit(event);
          }}
          aria-busy={status === "sending"}
        >
          <span className="small-label">NEZÁVAZNÁ POPTÁVKA</span>
          <h3>S čím vám můžeme pomoci?</h3>
          <p>Nechte nám na sebe kontakt. Společně najdeme řešení.</p>
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
                disabled: status === "sending",
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
          <p className="privacy-note">
            Odesláním nás žádáte o zpracování poptávky. Více o{" "}
            <a href={privacyUrl}>ochraně osobních údajů</a>.
          </p>
          <button
            className="button button-primary submit-button"
            disabled={status === "sending"}
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
          <div aria-live="polite" role="status">
            {status === "success" && (
              <p className="form-success">
                <Check size={18} /> Děkujeme! Vaše poptávka byla přijata. Ozveme
                se vám.
              </p>
            )}
            {status === "error" && (
              <div className="form-error">
                <p>{errorMessage}</p>
                <a href={contactMailto(values)}>
                  <Send size={15} /> Otevřít poptávku v e-mailu
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
