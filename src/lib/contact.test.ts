import { afterEach, describe, expect, it, vi } from "vitest";
import {
  contactMailto,
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
    await expect(sendContact(valid, "")).rejects.toThrow("není připojeno");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("odešle JSON a přijme úspěšnou odpověď", async () => {
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    await expect(sendContact(valid, "/api/contact")).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST", body: JSON.stringify(valid) }),
    );
  });
  it("zobrazí chybu při odmítnutí serverem", async () => {
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(sendContact(valid, "/api/contact")).rejects.toThrow(
      "nepodařilo",
    );
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
