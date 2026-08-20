import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string; // omit for the current page (last item)
}

const SITE_URL = "https://getairductexperts.com";

export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const ldData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...items].map((item, i, arr) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(i < arr.length - 1 ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldData) }} />
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center gap-1.5">
            <a href="/" className="flex items-center gap-1 text-white/60 hover:text-ade-blue transition">
              <Home className="size-3.5" /> Home
            </a>
            <ChevronRight className="size-3.5 text-white/30" />
          </li>
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href ? (
                <>
                  <a href={item.href} className="text-white/60 hover:text-ade-blue transition">
                    {item.label}
                  </a>
                  {i < items.length - 1 && <ChevronRight className="size-3.5 text-white/30" />}
                </>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
