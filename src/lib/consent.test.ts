import { describe, expect, it, vi } from "vitest";
import {
  consentLifetime,
  consentStorageKey,
  defaultConsent,
  parseConsent,
  saveConsent,
} from "./consent";
const now = new Date("2026-10-06T11:00:00Z");
describe("Uložení souhlasu", () => {
  it("nepovoluje volitelné kategorie bez uložené volby", () => {
    expect(parseConsent(null)).toBeNull();
    expect(Object.values(defaultConsent)).toEqual([false, false, false]);
  });
  it("uloží výběr a obnoví jej včetně data", () => {
    const storage = { setItem: vi.fn() };
    const choice = { personalized: false, analytics: true, marketing: false };
    const saved = saveConsent(storage, choice, now);
    expect(storage.setItem).toHaveBeenCalledWith(
      consentStorageKey,
      JSON.stringify(saved),
    );
    expect(parseConsent(JSON.stringify(saved), now.getTime())).toEqual({
      ...choice,
      version: 1,
      savedAt: now.toISOString(),
    });
  });
  it("odmítnutí přepíše dřívější povolení", () => {
    let value = "";
    const storage = {
      setItem: (_key: string, next: string): void => {
        value = next;
      },
    };
    saveConsent(
      storage,
      { personalized: true, analytics: true, marketing: true },
      now,
    );
    saveConsent(storage, defaultConsent, now);
    expect(parseConsent(value, now.getTime())).toMatchObject(defaultConsent);
  });
  it("nepřijme poškozená data, neznámou verzi ani chybný typ", () => {
    for (const value of [
      "{",
      "null",
      "[]",
      "{}",
      JSON.stringify({
        ...defaultConsent,
        version: 2,
        savedAt: now.toISOString(),
      }),
      JSON.stringify({
        ...defaultConsent,
        analytics: "true",
        version: 1,
        savedAt: now.toISOString(),
      }),
    ])
      expect(parseConsent(value, now.getTime())).toBeNull();
  });
  it("po 180 dnech nebo při neplatném datu neobnoví souhlas", () => {
    const data = { ...defaultConsent, version: 1, savedAt: now.toISOString() };
    expect(
      parseConsent(JSON.stringify(data), now.getTime() + consentLifetime),
    ).toBeNull();
    expect(parseConsent(JSON.stringify(data), now.getTime() - 1)).toBeNull();
    expect(
      parseConsent(
        JSON.stringify({ ...data, savedAt: "chyba" }),
        now.getTime(),
      ),
    ).toBeNull();
  });
  it("nepředstírá úspěšné uložení při zablokovaném úložišti", () => {
    expect(() =>
      saveConsent(
        {
          setItem: () => {
            throw new Error("Storage unavailable");
          },
        },
        defaultConsent,
        now,
      ),
    ).toThrow("Storage unavailable");
  });
});
describe("hasConsent", () => {
  it("povolí volitelnou kategorii jen s platnou uloženou volbou", async () => {
    const { hasConsent, saveConsent } = await import("./consent");
    const data = new Map<string, string>();
    const storage = { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => void data.set(key, value) };
    expect(hasConsent("analytics", storage)).toBe(false);
    saveConsent(storage, { personalized: false, analytics: true, marketing: false });
    expect(hasConsent("analytics", storage)).toBe(true);
    expect(hasConsent("marketing", storage)).toBe(false);
    expect(hasConsent("analytics", undefined)).toBe(false);
  });
});
describe("Analytika", () => {
  it("bez VITE_GA_ID se nic nenačte a lišta se nezobrazí", async () => {
    const { analyticsEnabled, needsConsentDecision, loadAnalytics } = await import("./analytics");
    expect(analyticsEnabled).toBe(false);
    expect(needsConsentDecision({ getItem: () => null })).toBe(false);
    vi.stubGlobal("window", { localStorage: { getItem: () => null } });
    vi.stubGlobal("document", { createElement: vi.fn(), head: { append: vi.fn() }, addEventListener: vi.fn() });
    loadAnalytics();
    expect(document.createElement).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
  it("s ID se zeptá jen bez platné volby a GA načte jen po souhlasu", async () => {
    vi.resetModules();
    vi.stubEnv("VITE_GA_ID", "G-TEST123");
    const { analyticsEnabled, needsConsentDecision, loadAnalytics } = await import("./analytics");
    const { saveConsent } = await import("./consent");
    expect(analyticsEnabled).toBe(true);
    const data = new Map<string, string>();
    const storage = { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => void data.set(key, value) };
    expect(needsConsentDecision(storage)).toBe(true);
    saveConsent(storage, { personalized: false, analytics: false, marketing: false });
    expect(needsConsentDecision(storage)).toBe(false);
    const append = vi.fn();
    vi.stubGlobal("window", { localStorage: storage, location: { pathname: "/" } });
    vi.stubGlobal("document", { createElement: () => ({ dataset: {} }), head: { append }, addEventListener: vi.fn() });
    loadAnalytics();
    expect(append).not.toHaveBeenCalled();
    saveConsent(storage, { personalized: false, analytics: true, marketing: false });
    loadAnalytics();
    expect(append).toHaveBeenCalledWith(expect.objectContaining({ src: "https://www.googletagmanager.com/gtag/js?id=G-TEST123" }));
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });
});
