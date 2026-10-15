import { ResponsiveImage } from "./ResponsiveImage";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X, MapPin } from "lucide-react";
import {
  serviceNavigation,
  serviceCategoryLabels,
  type ServiceCategory,
} from "../data/services";
import { ServiceDropdown } from "./ServiceDropdown";
interface NavbarProps {
  currentPath: string;
  phone: string;
  phoneHref: string;
}
export function Navbar({ phone, phoneHref, currentPath }: NavbarProps) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<ServiceCategory | null>(null);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = (): void =>
      setCompact((previous) => window.scrollY > (previous ? 24 : 80));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const measure = (): void => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.current?.offsetHeight ?? 88}px`,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (header.current) observer.observe(header.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  const closeMenus = (): void => {
    setOpen(false);
    setDropdown(null);
  };
  useEffect(() => {
    const close = (event: KeyboardEvent): void => {
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
  return (
    <>
      <div className="topbar">
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
        className={`site-header${compact ? " is-compact" : ""}`}
      >
        <div className="nav-container">
          <a className="logo" href="/" aria-label="AWCLEAN – úvodní stránka">
            <ResponsiveImage
              loading="eager"
              src="/images/logo.svg"
              width="220"
              height="38"
              alt="AWCLEAN"
            />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Zavřít nabídku" : "Otevřít nabídku"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => {
              setOpen(!open);
              if (open) setDropdown(null);
            }}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            aria-label="Hlavní navigace"
            className={`navigation ${open ? "open" : ""}`}
          >
            <a
              href="/"
              aria-current={currentPath === "/" ? "page" : undefined}
              onClick={closeMenus}
            >
              Úvod
            </a>
            {(["cisteni", "natery", "ostatni"] as const).map((category) => (
              <ServiceDropdown
                key={category}
                category={category}
                label={serviceCategoryLabels[category]}
                services={serviceNavigation[category]}
                currentPath={currentPath}
                open={dropdown === category}
                onOpen={() => setDropdown(category)}
                onClose={() =>
                  setDropdown((value) => (value === category ? null : value))
                }
                onNavigate={closeMenus}
              />
            ))}
            <a
              aria-current={
                currentPath.startsWith("/reference/") ? "page" : undefined
              }
              href="/reference/"
              onClick={closeMenus}
            >
              Reference
            </a>
            <a
              aria-current={currentPath === "/kontakt/" ? "page" : undefined}
              href="/kontakt/"
              onClick={closeMenus}
            >
              Kontakt
            </a>
          </nav>
          <a
            className="nav-phone"
            href={phoneHref}
            aria-label={`Zavolat ${phone}`}
          >
            <Phone size={16} />
            <span>{phone}</span>
          </a>
        </div>
      </header>
    </>
  );
}
