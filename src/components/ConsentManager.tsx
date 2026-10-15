import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, Cookie, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { privacyUrl } from "../data/contacts";
import {
  consentStorageKey,
  defaultConsent,
  parseConsent,
  saveConsent,
  type ConsentPreferences,
  type SavedConsent,
} from "../lib/consent";
const tabs = ["Souhlas", "Podrobnosti", "O cookies"] as const;
const categories: {
  key: keyof ConsentPreferences;
  title: string;
  description: string;
}[] = [
  {
    key: "personalized",
    title: "Personalizované",
    description:
      "Pamatují si vaše předvolby a přizpůsobují obsah. Na tomto webu je nyní nepoužíváme.",
  },
  {
    key: "analytics",
    title: "Analytické",
    description:
      "Pomáhají porozumět návštěvnosti a používání webu. Na tomto webu je nyní nepoužíváme.",
  },
  {
    key: "marketing",
    title: "Marketingové",
    description:
      "Slouží k výběru a vyhodnocování reklamy. Na tomto webu je nyní nepoužíváme.",
  },
];
export function ConsentManager() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const tabButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const previousOverflow = useRef("");
  const isOpen = useRef(false);
  const [tab, setTab] = useState(0);
  const [preferences, setPreferences] =
    useState<ConsentPreferences>(defaultConsent);
  const [saved, setSaved] = useState<SavedConsent | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(
    () => () => {
      if (isOpen.current)
        document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  const open = (): void => {
    let stored: SavedConsent | null = null;
    try {
      stored = parseConsent(window.localStorage.getItem(consentStorageKey));
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
    setSaved(stored);
    setPreferences(stored ?? defaultConsent);
    setTab(0);
    setError("");
    setNotice("");
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    isOpen.current = true;
    document.body.style.overflow = "hidden";
  };
  const restoreFocus = (): void => {
    if (isOpen.current) document.body.style.overflow = previousOverflow.current;
    isOpen.current = false;
    trigger.current?.focus();
  };
  const persist = (next: ConsentPreferences): void => {
    try {
      const result = saveConsent(window.localStorage, next);
      setSaved(result);
      setPreferences(next);
      setNotice("Vaše nastavení souhlasu bylo uloženo.");
      dialog.current?.close();
    } catch {
      setError(
        "Nastavení se nepodařilo uložit. Zkontrolujte, zda prohlížeč povoluje ukládání dat tohoto webu, a zkuste to znovu.",
      );
    }
  };
  const navigateTabs = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(next);
    tabButtons.current[next]?.focus();
  };
  return (
    <>
      <button
        ref={trigger}
        className="consent-trigger"
        type="button"
        onClick={open}
        aria-haspopup="dialog"
      >
        <Cookie size={15} aria-hidden="true" /> Spravovat souhlas
      </button>
      <span className="sr-only" role="status">
        {notice}
      </span>
      <dialog
        ref={dialog}
        className="consent-dialog"
        aria-labelledby="consent-title"
        onClose={restoreFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="consent-shell">
          <header className="consent-header">
            <span className="consent-symbol">
              <ShieldCheck size={26} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">VAŠE SOUKROMÍ. VAŠE VOLBA.</p>
              <h2 id="consent-title">Nastavení cookies</h2>
            </div>
            <button
              autoFocus
              type="button"
              className="consent-close"
              aria-label="Zavřít nastavení cookies"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </header>
          <div
            className="consent-tabs"
            role="tablist"
            aria-label="Nastavení souhlasu"
          >
            {tabs.map((title, index) => (
              <button
                type="button"
                key={title}
                id={`consent-tab-${index}`}
                role="tab"
                ref={(element) => {
                  tabButtons.current[index] = element;
                }}
                aria-selected={tab === index}
                aria-controls={`consent-panel-${index}`}
                tabIndex={tab === index ? 0 : -1}
                onClick={() => setTab(index)}
                onKeyDown={(event) => navigateTabs(event, index)}
              >
                {title}
              </button>
            ))}
          </div>
          <div className="consent-content">
            <section
              id="consent-panel-0"
              role="tabpanel"
              aria-labelledby="consent-tab-0"
              tabIndex={0}
              hidden={tab !== 0}
            >
              <h3>Rozhodněte, co nám dovolíte.</h3>
              <p>
                Vyberte si, se kterými kategoriemi souhlasíte. Svou volbu můžete
                kdykoliv změnit přes „Spravovat souhlas“ v patičce webu.
              </p>
              <div className="consent-info">
                <ShieldCheck size={20} aria-hidden="true" />
                <p>
                  Aktuálně nepoužíváme analytické, personalizované ani
                  marketingové cookies. Ukládáme pouze vaše nastavení; povolení
                  kategorií nyní nespouští žádné sledování.
                </p>
              </div>
              <div className="consent-switches">
                <div className="consent-category">
                  <span className="consent-category-name">
                    Nezbytné <LockKeyhole size={13} aria-hidden="true" />
                  </span>
                  <button
                    className="consent-switch"
                    type="button"
                    role="switch"
                    aria-label="Nezbytné ukládání nastavení, vždy aktivní"
                    aria-checked="true"
                    disabled
                  >
                    <span>
                      <Check size={12} />
                    </span>
                  </button>
                  <span className="consent-category-note">Vždy aktivní</span>
                </div>
                {categories.map((category) => (
                  <div className="consent-category" key={category.key}>
                    <span
                      className="consent-category-name"
                      id={`consent-label-${category.key}`}
                    >
                      {category.title}
                    </span>
                    <button
                      className="consent-switch"
                      type="button"
                      role="switch"
                      aria-labelledby={`consent-label-${category.key}`}
                      aria-checked={preferences[category.key]}
                      onClick={() =>
                        setPreferences((previous) => ({
                          ...previous,
                          [category.key]: !previous[category.key],
                        }))
                      }
                    >
                      <span>
                        {preferences[category.key] && <Check size={12} />}
                      </span>
                    </button>
                    <span className="consent-category-note">
                      {preferences[category.key] ? "Povoleno" : "Nepovoleno"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section
              id="consent-panel-1"
              role="tabpanel"
              aria-labelledby="consent-tab-1"
              tabIndex={0}
              hidden={tab !== 1}
            >
              <h3>Co jednotlivé kategorie znamenají?</h3>
              <div className="consent-details">
                <div>
                  <h4>Nezbytné</h4>
                  <p>
                    Vaši volbu ukládáme do místního úložiště prohlížeče na 180
                    dní. Obsahuje pouze nastavení kategorií a datum uložení.
                    Nikomu ji neodesíláme.
                  </p>
                  <span className="consent-storage-label">
                    awclean-consent-v1 · místní úložiště
                  </span>
                </div>
                {categories.map((category) => (
                  <div key={category.key}>
                    <h4>{category.title}</h4>
                    <p>{category.description}</p>
                  </div>
                ))}
              </div>
            </section>
            <section
              id="consent-panel-2"
              role="tabpanel"
              aria-labelledby="consent-tab-2"
              tabIndex={0}
              hidden={tab !== 2}
            >
              <h3>Malé soubory, přehledné nastavení.</h3>
              <p>
                Cookies jsou malé soubory, které web ukládá do prohlížeče. Mohou
                sloužit například k zapamatování předvoleb nebo měření
                návštěvnosti. Místní úložiště je podobný způsob uložení dat
                přímo ve vašem prohlížeči.
              </p>
              <p>
                Na tomto webu používáme místní úložiště pouze k zapamatování
                této volby. Pomocník DR Fasáda si navíc v úložišti aktuální relace pamatuje otevření nebo zmenšení na ikonku. Hledané výrazy se neukládají. Žádná z volitelných kategorií teď není využívaná.
                Odmítnutí proto neomezuje prohlížení webu ani odeslání poptávky.
              </p>
              <p>
                Nastavení můžete změnit v tomto okně. Data webu lze také
                odstranit v nastavení prohlížeče.
              </p>
            </section>
            <div className="consent-meta">
              <span>
                {saved
                  ? `Poslední uložení: ${new Intl.DateTimeFormat("cs-CZ", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Prague" }).format(new Date(saved.savedAt))}`
                  : "Zatím jste neuložili žádnou volbu."}
              </span>
              <a href={privacyUrl}>Ochrana osobních údajů a cookies</a>
            </div>
            {error && (
              <p className="consent-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="consent-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={() => persist(defaultConsent)}
            >
              Odmítnout
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={() => persist(preferences)}
            >
              Povolit výběr
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() =>
                persist({
                  personalized: true,
                  analytics: true,
                  marketing: true,
                })
              }
            >
              Povolit vše <Check size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
