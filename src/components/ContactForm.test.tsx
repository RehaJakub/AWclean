// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

class NoopObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
const stubBrowser = (): void => {
  vi.stubGlobal("IntersectionObserver", NoopObserver);
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));
};
stubBrowser();
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  stubBrowser();
});

const fill = (): void => {
  fireEvent.change(screen.getByLabelText(/Jméno a příjmení/), { target: { value: "Jan Novák" } });
  fireEvent.change(screen.getByLabelText(/^Telefon/), { target: { value: "+420 777 123 456" } });
  fireEvent.change(screen.getByLabelText(/^E-mail/), { target: { value: "jan@example.cz" } });
  fireEvent.change(screen.getByLabelText(/Co potřebujete vyčistit/), { target: { value: "Prosím o čištění fasády domu." } });
};
const submit = async (): Promise<void> => {
  await act(async () => {
    fireEvent.submit(screen.getByRole("button", { name: /Odeslat nezávaznou poptávku/ }).closest("form")!);
  });
};
const flushFrames = async (): Promise<void> => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
  });
};

describe("Kontaktní formulář", () => {
  it("prázdné odeslání ukáže 4 chyby a fokus dá na jméno", async () => {
    render(<ContactForm endpoint="/contact.php" />);
    await submit();
    expect(document.querySelectorAll(".field-error")).toHaveLength(4);
    expect(document.activeElement?.id).toBe("name");
  });
  it("po úspěchu poděkuje a fokus přesune na výsledek", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    render(<ContactForm endpoint="/contact.php" />);
    fill();
    await submit();
    await flushFrames();
    expect(screen.getByRole("status").textContent).toContain("Děkujeme");
    expect(document.activeElement).toBe(screen.getByRole("status"));
  });
  it("při chybě sítě ukáže českou hlášku a odkaz na e-mail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    render(<ContactForm endpoint="/contact.php" />);
    fill();
    await submit();
    await flushFrames();
    expect(screen.getByRole("status").textContent).toContain("Spojení se nezdařilo");
    expect(screen.getByText(/Otevřít poptávku v e-mailu/)).toBeTruthy();
  });
  it("bez endpointu nic neodešle a nehlásí falešný úspěch", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    render(<ContactForm endpoint="" />);
    fill();
    await submit();
    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByRole("status").textContent).not.toContain("Děkujeme");
  });
});
