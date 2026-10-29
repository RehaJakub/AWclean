import { ResponsiveImage } from "./ResponsiveImage";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X, MapPin } from "lucide-react";
import {
  serviceNavigation,
  serviceCategoryLabels,
  services,
  type ServiceCategory,
} from "../data/services";
import { navThumbnails } from "../data/serviceVisuals";
import { inquiryAction } from "../data/offers";
interface NavbarProps {
  currentPath: string;
  phone: string;
  phoneHref: string;
}
const categories = ["cisteni", "natery", "ostatni"] as const;
const overviewLinks: Record<ServiceCategory, { label: string; href: string }> = {
  cisteni: { label: "Přehled všech služeb", href: "/sluzby/" },
  natery: { label: "Nátěry střech a fasád", href: "/natery-strech-a-fasad/" },
  ostatni: { label: "Všechny ostatní služby", href: "/ostatni-sluzby/" },
};
const mobileExtraLinks = [
  { label: "Psali o nás", href: "/psali-o-nas/" },
  { label: "Čisté fasády – odborné poradenství", href: "/ciste-fasady/" },
];
const thumbnail = (href: string): string | undefined =>
  navThumbnails[href] ?? services.find((service) => service.href === href)?.image;
function activeCategory(path: string): ServiceCategory | null {
  if (path === "/sluzby/") return "cisteni";
  if (path === "/ostatni-sluzby/") return "ostatni";
  return (
    categories.find((category) =>
      serviceNavigation[category].some(
        (link) => link.href.split("#")[0] === path,
      ),
    ) ?? null
  );
}
/** Desktopové menu se otevírá i najetím myší; dotyk a klávesnice používají klik. */
const canHover = (): boolean =>
  window.matchMedia("(hover: hover) and (min-width: 1181px)").matches;
function moveFocus(event: KeyboardEvent<HTMLDivElement>): void {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const links = Array.from(
    event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
  );
  const index = links.findIndex((link) => link === document.activeElement);
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? links.length - 1
        : (index + (event.key === "ArrowDown" ? 1 : -1) + links.length) %
          links.length;
  links[next]?.focus();
}
export function Navbar({ phone, phoneHref, currentPath }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<ServiceCategory | null>(null);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const sample = inquiryAction("/cisteni-fasad/");
  const current = activeCategory(currentPath);
  useEffect(() => {
    const measure = (): void => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.current?.offsetHeight ?? 84}px`,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (header.current) observer.observe(header.current);
    return () => observer.disconnect();
  }, []);
  const closeMenus = (): void => {
    setOpen(false);
    setDropdown(null);
  };
  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape" && (open || dropdown)) {
        if (dropdown) {
          setDropdown(null);
          document.getElementById(`${dropdown}-services-toggle`)?.focus();
        } else {
          setOpen(false);
          toggle.current?.focus();
        }
      }
    };
    const outside = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        setOpen(false);
        setDropdown(null);
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, dropdown]);
  const hoverClose = (): void => {
    if (canHover()) setDropdown(null);
  };
  return (
    <>
      <div className="topbar" role="region" aria-label="O firmě">
        <div className="container flex items-center justify-between gap-4">
          <span>
            Profesionální péče o váš domov i firmu.{" "}
            <strong>Již od roku 2001.</strong>
          </span>
          <span className="topbar-location">
            <MapPin size={13} /> Působíme po celé ČR a SR
          </span>
        </div>
      </div>
      <header
        ref={header}
        data-menu-open={open || dropdown !== null}
        className="rd-header"
        onMouseLeave={hoverClose}
        onBlur={(event) => {
          // Fokus opustil hlavičku: zavřít mobilní menu, ať nezakrývá prvek s fokusem.
          if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <div className="rd-header-inner">
          <a className="rd-logo" href="/" aria-label="AWCLEAN – úvodní stránka">
            <ResponsiveImage
              loading="eager"
              src="/images/logo.svg"
              width="226"
              height="40"
              alt="AWCLEAN"
            />
          </a>
          <nav
            id="navigation"
            aria-label="Hlavní navigace"
            className={`rd-nav${open ? " is-open" : ""}`}
          >
            <a
              className="rd-nav-link"
              href="/"
              aria-current={currentPath === "/" ? "page" : undefined}
              onMouseEnter={hoverClose}
              onClick={closeMenus}
            >
              Úvod
            </a>
            {categories.map((category) => {
              const isOpen = dropdown === category;
              const id = `${category}-services`;
              const overview = overviewLinks[category];
              return (
                <div
                  key={category}
                  className={`rd-dropdown rd-dropdown-${category}`}
                  onMouseEnter={() => {
                    if (canHover()) setDropdown(category);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setDropdown((value) => (value === category ? null : value));
                  }}
                >
                  <button
                    id={`${id}-toggle`}
                    type="button"
                    className={`rd-nav-link${current === category ? " is-current" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={(event) => {
                      // UX-7: myš na desktopu menu jen otevírá (hover ho už otevřel); klávesnice (detail 0) a dotyk přepínají.
                      if (event.detail > 0 && canHover()) setDropdown(category);
                      else setDropdown(isOpen ? null : category);
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowDown") return;
                      event.preventDefault();
                      setDropdown(category);
                      requestAnimationFrame(() =>
                        document.querySelector<HTMLAnchorElement>(`#${id} a`)?.focus(),
                      );
                    }}
                  >
                    {serviceCategoryLabels[category]}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div
                      id={id}
                      className={`rd-panel ${category === "cisteni" ? "rd-panel-mega" : "rd-panel-small"}`}
                      onKeyDown={moveFocus}
                    >
                      <div className="rd-panel-inner">
                        <div className="rd-panel-links">
                          {serviceNavigation[category].map(({ title, href }) => {
                            const image = thumbnail(href);
                            return (
                              <a
                                key={href}
                                href={href}
                                onClick={closeMenus}
                                aria-current={currentPath === href ? "page" : undefined}
                              >
                                <span className="rd-thumb" aria-hidden="true">
                                  {image && (
                                    <ResponsiveImage
                                      src={image}
                                      alt=""
                                      sizes="56px"
                                      width="56"
                                      height="56"
                                    />
                                  )}
                                </span>
                                <span>{title.replace(" (airless)", "")}</span>
                              </a>
                            );
                          })}
                          <a className="rd-panel-all" href={overview.href} onClick={closeMenus}>
                            {overview.label} <ArrowRight size={16} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <a
              className="rd-nav-link"
              aria-current={currentPath.startsWith("/reference/") ? "page" : undefined}
              href="/reference/"
              onMouseEnter={hoverClose}
              onClick={closeMenus}
            >
              Reference
            </a>
            <a
              className="rd-nav-link"
              aria-current={currentPath === "/kontakt/" ? "page" : undefined}
              href="/kontakt/"
              onMouseEnter={hoverClose}
              onClick={closeMenus}
            >
              Kontakt
            </a>
            <div className="rd-nav-mobile-extra">
              {mobileExtraLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={currentPath === link.href ? "page" : undefined}
                  onClick={closeMenus}
                >
                  {link.label}
                </a>
              ))}
              <a className="rd-btn rd-btn-dark" href={phoneHref}>
                <Phone size={17} aria-hidden="true" /> {phone}
              </a>
              <a className="rd-nav-mobile-sample" href={sample.href} onClick={closeMenus}>
                {sample.label}
              </a>
            </div>
          </nav>
          <a className="rd-header-phone" href={phoneHref} aria-label={`Zavolat ${phone}`}>
            <Phone size={17} aria-hidden="true" />
            <span>{phone}</span>
          </a>
          <button
            ref={toggle}
            type="button"
            className="rd-menu-toggle"
            aria-label={open ? "Zavřít nabídku" : "Otevřít nabídku"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => {
              const next = !open;
              setOpen(next);
              if (!next) setDropdown(null);
              // A11Y-6: po otevření fokus na první odkaz menu, Tab tak nejde do obsahu pod menu.
              else window.requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#navigation a")?.focus());
            }}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  );
}
