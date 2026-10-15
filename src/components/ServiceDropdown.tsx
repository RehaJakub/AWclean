import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { ServiceLink, ServiceCategory } from "../data/services";

interface ServiceDropdownProps {
  category: ServiceCategory;
  label: string;
  services: ServiceLink[];
  currentPath: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}

export function ServiceDropdown({
  category,
  label,
  services,
  currentPath,
  open,
  onOpen,
  onClose,
  onNavigate,
}: ServiceDropdownProps) {
  const panel = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<"first" | "last" | null>(null);
  const id = `${category}-services`;
  const focusEdge = (edge: "first" | "last"): void => {
    const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
    (edge === "first" ? links?.[0] : links?.[links.length - 1])?.focus();
  };
  useEffect(() => {
    if (open && pendingFocus.current) {
      focusEdge(pendingFocus.current);
      pendingFocus.current = null;
    }
  }, [open]);
  const active =
    services.some((service) => service.href.split("#")[0] === currentPath) ||
    (category === "ostatni" && currentPath === "/ostatni-sluzby/");
  return (
    <div
      className="dropdown"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onClose();
      }}
    >
      <button
        id={`${id}-toggle`}
        type="button"
        className={active ? "nav-current" : undefined}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          const edge = event.key === "ArrowUp" ? "last" : "first";
          if (open) focusEdge(edge);
          else {
            pendingFocus.current = edge;
            onOpen();
          }
        }}
      >
        {label} <ChevronDown size={13} aria-hidden="true" />
      </button>
      {open && (
        <div
          ref={panel}
          id={id}
          className={`dropdown-panel ${category === "cisteni" ? "cleaning-menu" : "other-menu"}`}
          onKeyDown={(event) => {
            if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
              return;
            event.preventDefault();
            const links = Array.from(
              event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
            );
            const index = links.findIndex(
              (link) => link === document.activeElement,
            );
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? links.length - 1
                  : (index +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      links.length) %
                    links.length;
            links[next]?.focus();
          }}
        >
          {services.map(({ title, href }) => (
            <a
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={currentPath === href ? "page" : undefined}
            >
              {title}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
