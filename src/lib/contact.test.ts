import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { servicePages } from "../data/pages";
import {
  contactMailto,
  inquiryContext,
  sendContact,
  validateContact,
  type ContactValues,
} from "./contact";
const valid: ContactValues = {
  name: "Jan Novák",
  phone: "+420 773 196 097",
  email: "jan@example.cz",
  message: "Prosím o čištění fasády domu.",
};
const antispam = { website: "", fillMs: 5000, service: "", sample: "" };
afterEach(() => vi.unstubAllGlobals());
describe("Validace poptávky", () => {
  it("přijme český i slovenský telefon", () => {
    expect(validateContact(valid)).toEqual({});
    expect(validateContact({ ...valid, phone: "+421 907 245 573" })).toEqual(
      {},
    );
  });
  it("odmítne prázdná pole, neplatný telefon a e-mail", () => {
    expect(
      Object.keys(
        validateContact({
          name: " ",
          phone: "abcdefghijk",
          email: "jan@",
          message: " ",
        }),
      ),
    ).toHaveLength(4);
    expect(validateContact({ ...valid, phone: "123" }).phone).toBeDefined();
    expect(
      validateContact({ ...valid, phone: "+420773196097x" }).phone,
    ).toBeDefined();
  });
  it("bez endpointu nikdy nehlásí úspěch a neodesílá data", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(sendContact(valid, "", antispam)).rejects.toThrow("není připojeno");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("odešle JSON a přijme úspěšnou odpověď", async () => {
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    await expect(sendContact(valid, "/api/contact", antispam)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST", body: JSON.stringify({ ...valid, ...antispam }) }),
    );
  });
  it("zobrazí chybu při odmítnutí serverem", async () => {
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500, json: () => Promise.reject(new Error("no json")) }));
    await expect(sendContact(valid, "/api/contact", antispam)).rejects.toThrow(
      "nepodařilo",
    );
  });
  it("při limitu ukáže českou zprávu ze serveru", async () => {
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        json: () => Promise.resolve({ ok: false, errors: { form: "Příliš mnoho poptávek." } }),
      }),
    );
    await expect(sendContact(valid, "/api/contact", antispam)).rejects.toThrow(
      "Příliš mnoho poptávek.",
    );
  });
  it("převezme jen známou službu a vzorek z odkazu", () => {
    expect(
      inquiryContext("?sluzba=%C4%8Ci%C5%A1t%C4%9Bn%C3%AD+fas%C3%A1d&vzorek=1"),
    ).toEqual({ service: "Čištění fasád", sample: "1" });
    expect(inquiryContext("?sluzba=<script>&vzorek=ano")).toEqual({
      service: "",
      sample: "",
    });
  });
  it("contact.php zná stejné služby jako web", () => {
    const php = readFileSync("public/contact.php", "utf8");
    const list = php.slice(php.indexOf("const SERVICES"), php.indexOf("];", php.indexOf("const SERVICES")));
    const phpServices = [...list.matchAll(/'([^']+)'/g)].map((m) => m[1]).sort();
    expect(phpServices).toEqual(servicePages.map((page) => page.shortTitle).sort());
  });
  it("zakóduje zprávu do náhradního e-mailu", () => {
    const result = contactMailto({
      ...valid,
      message: "Fasáda & střecha? Děkuji.",
    });
    expect(result).toContain("mailto:info@awclean.cz?subject=");
    expect(result).toContain("%26");
    expect(result).toContain("%3F");
  });
});
