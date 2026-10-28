import { servicePages } from "../data/pages";
export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type SubmitStatus = "idle" | "sending" | "success" | "error";
export const initialValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2)
    errors.name = "Vyplňte prosím jméno (alespoň 2 znaky).";
  if (
    !/^\+?[\d\s()-]+$/.test(values.phone.trim()) ||
    !/^[0-9]{9,15}$/.test(values.phone.replace(/\D/g, ""))
  )
    errors.phone = "Zadejte platný telefon, například +420 773 196 097.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Zadejte platnou e-mailovou adresu.";
  if (values.message.trim().length < 10)
    errors.message = "Popište prosím svůj požadavek alespoň 10 znaky.";
  return errors;
}
/** Doplňky odesílané s poptávkou: antispam a kontext z odkazu služby. */
export interface ContactMeta {
  website: string;
  fillMs: number;
  service: string;
  sample: string;
}
/** Kontext z ?sluzba=&vzorek=1 (odkazy z inquiryAction); neznámé hodnoty zahodí. */
export function inquiryContext(search: string): Pick<ContactMeta, "service" | "sample"> {
  const params = new URLSearchParams(search);
  const service = params.get("sluzba") ?? "";
  return {
    service: servicePages.some((page) => page.shortTitle === service) ? service : "",
    sample: params.get("vzorek") === "1" ? "1" : "",
  };
}
/** Chyba s českou zprávou určenou přímo uživateli. */
export class ContactError extends Error {}
const statusMessages: Record<number, string> = {
  413: "Zpráva je příliš dlouhá. Zkraťte ji prosím.",
  422: "Zkontrolujte prosím vyplněné údaje.",
  429: "Odeslali jste příliš mnoho poptávek za krátkou dobu. Zkuste to prosím později nebo nám zavolejte.",
};
export async function sendContact(
  values: ContactValues,
  endpoint: string,
  meta: ContactMeta,
): Promise<void> {
  if (!endpoint)
    throw new ContactError(
      "Odesílání formuláře zatím není připojeno. Zavolejte nám nebo odešlete připravený e-mail níže.",
    );
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, ...meta }),
      signal: controller.signal,
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        errors?: Record<string, string>;
      } | null;
      throw new ContactError(
        body?.errors?.form ??
          statusMessages[response.status] ??
          "Poptávku se nepodařilo odeslat. Zkuste to znovu nebo nám zavolejte.",
      );
    }
  } finally {
    window.clearTimeout(timeout);
  }
}
export function contactMailto(values: ContactValues): string {
  return `mailto:info@awclean.cz?subject=${encodeURIComponent("Nezávazná poptávka čištění")}&body=${encodeURIComponent(`${values.message}\n\nJméno: ${values.name}\nTelefon: ${values.phone}\nE-mail: ${values.email}`)}`;
}
