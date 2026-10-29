import { useEffect, useState } from "react";

/** Keep the assistant away from open navigation, other dialogs and form entry. */
export function useWidgetVisibility(ownDialogId: string) {
  const [obscured, setObscured] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  useEffect(() => {
    const update = (): void => {
      const otherDialog = Array.from(document.querySelectorAll<HTMLDialogElement>("dialog[open]"))
        .some((dialog) => dialog.id !== ownDialogId);
      setObscured(otherDialog || document.querySelector('[data-menu-open="true"]') !== null);
    };
    const focus = (): void => setFormFocused(document.activeElement?.closest("form") !== null);
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["open", "data-menu-open"] });
    const blur = (event: FocusEvent): void => {
      // Fokus odešel mimo formulář (nebo nikam): maskot se smí vrátit, i když kliknutí nic nezaostřilo.
      if (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest("form")) setFormFocused(false);
    };
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", blur);
    update();
    return () => { observer.disconnect(); document.removeEventListener("focusin", focus); document.removeEventListener("focusout", blur); };
  }, [ownDialogId]);
  return { obscured, formFocused };
}
