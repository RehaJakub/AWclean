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
