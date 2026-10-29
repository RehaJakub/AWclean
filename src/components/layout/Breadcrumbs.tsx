import { ChevronRight, House } from "lucide-react";
import { JsonLd } from "../JsonLd";
interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail = [{ label: "Úvod", href: "/" }, ...items];
  return (
    <>
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          ...(item.href && { item: `https://www.awclean.cz${item.href}` }),
        })),
      }}
    />
    <nav className="breadcrumbs container" aria-label="Drobečková navigace">
      <ol>
        <li>
          <a href="/">
            <House size={14} />
            <span>Úvod</span>
          </a>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <ChevronRight size={12} />
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}
