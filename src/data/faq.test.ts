import { describe, expect, it } from "vitest";
import { faqItems, faqSchema, filterFaq } from "./faq";

describe("FAQ DR Fasáda", () => {
  it("najde odpověď i bez diakritiky a s více slovy", () => {
    expect(filterFaq("vse", "  zeleni FASADU ").map((item) => item.id)).toEqual([]);
    expect(filterFaq("vse", "chemie fasadu").map((item) => item.id)).toEqual(["chemie"]);
  });
  it("kombinuje hledání s kategorií a vrací prázdný výsledek", () => {
    expect(filterFaq("cena", "lešení")).toEqual([]);
    expect(filterFaq("cena", "zdarma").map((item) => item.id)).toEqual(["vzorek", "posudek"]);
    expect(filterFaq("postup", "").every((item) => item.category === "postup")).toBe(true);
  });
  it("publikuje totožné otázky a odpovědi do FAQPage", () => {
    expect(new Set(faqItems.map((item) => item.id)).size).toBe(faqItems.length);
    expect(faqSchema.mainEntity.map((item) => [item.name, item.acceptedAnswer.text]))
      .toEqual(faqItems.map((item) => [item.question, item.answer]));
  });
});
