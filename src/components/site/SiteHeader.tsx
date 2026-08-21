import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone, Menu, X, ChevronDown, Wind, Flame, Sparkles, Sofa, ShieldCheck, MapPin, CalendarDays,
} from "lucide-react";
import { Logo } from "./Logo";
import { accentText, accentHoverText, type ServiceAccent } from "@/lib/serviceAccent";

const PHONE = "(571) 337-9306";

export const SERVICE_NAV = [
  { label: "Air Duct Cleaning",      href: "/services/air-duct-cleaning",      icon: Wind,       accent: "blue" as ServiceAccent },
  { label: "Dryer Vent Cleaning",    href: "/services/dryer-vent-cleaning",    icon: Flame,      accent: "amber" as ServiceAccent },
  { label: "Carpet Cleaning",        href: "/services/carpet-cleaning",        icon: Sparkles,   accent: "teal" as ServiceAccent },
  { label: "Upholstery Cleaning",    href: "/services/upholstery-cleaning",    icon: Sofa,       accent: "teal" as ServiceAccent },
  { label: "Indoor Air Quality",     href: "/services/indoor-air-quality",     icon: ShieldCheck, accent: "blue" as ServiceAccent },
] as const;

export const LOCATIONS_NAV = [
  { label: "Woodbridge, VA",     href: "/locations/woodbridge" },
  { label: "Dale City, VA",      href: "/locations/dale-city" },
  { label: "Lake Ridge, VA",     href: "/locations/lake-ridge" },
  { label: "Manassas, VA",       href: "/locations/manassas" },
  { label: "Lorton, VA",         href: "/locations/lorton" },
  { label: "Springfield, VA",    href: "/locations/springfield" },
  { label: "Fairfax, VA",        href: "/locations/fairfax" },
  { label: "Burke, VA",          href: "/locations/burke" },
  { label: "Alexandria, VA",     href: "/locations/alexandria" },
  { label: "Arlington, VA",      href: "/locations/arlington" },
  { label: "Falls Church, VA",   href: "/locations/falls-church" },
  { label: "Stafford, VA",       href: "/locations/stafford" },
] as const;

export function SiteHeader({ bookHref = "/#estimate" }: { bookHref?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "locations" | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const close = () => { setMenuOpen(false); setMobileServicesOpen(false); setMobileLocationsOpen(false); };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo variant="light" />
          </Link>

          <nav ref={navRef} className="hidden lg:flex items-center gap-7 text-sm font-medium text-navy/80">
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                onMouseEnter={() => setOpenDropdown("services")}
                className="flex items-center gap-1 hover:text-ade-blue transition"
              >
                Services <ChevronDown className={`size-3.5 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "services" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl border border-border shadow-luxe p-3 flex flex-col gap-1 z-50"
                >
                  {SERVICE_NAV.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        to={s.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-secondary hover:text-navy transition"
                      >
                        <Icon className={`size-4 shrink-0 ${accentText(s.accent)}`} />
                        <span className="text-sm font-medium">{s.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "locations" ? null : "locations")}
                onMouseEnter={() => setOpenDropdown("locations")}
                className="flex items-center gap-1 hover:text-ade-blue transition"
              >
                Service Areas <ChevronDown className={`size-3.5 transition-transform ${openDropdown === "locations" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "locations" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl border border-border shadow-luxe p-3 grid grid-cols-2 gap-1 z-50"
                >
                  {LOCATIONS_NAV.map((loc) => (
                    <Link
                      key={loc.href}
                      to={loc.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-ade-blue/10 hover:text-navy transition text-xs font-medium"
                    >
                      <MapPin className="size-3.5 text-ade-blue shrink-0" /> {loc.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/#why" className="hover:text-ade-blue transition">Why ADE</Link>
            <Link to="/about" className="hover:text-ade-blue transition">About</Link>
            <Link to="/blog" className="hover:text-ade-blue transition">Blog</Link>
            <Link to="/faq" className="hover:text-ade-blue transition">FAQ</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-ade-blue transition">
              <Phone className="size-4 text-ade-blue" /> {PHONE}
            </a>
            <a href={bookHref} className="bg-ade-blue text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition shadow-blue">
              Get My Estimate
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <a href={bookHref} aria-label="Get estimate"
              className="flex items-center justify-center size-10 rounded-lg bg-ade-blue text-white hover:opacity-90 transition">
              <CalendarDays className="size-5" />
            </a>
            <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} aria-label="Call us"
              className="flex items-center justify-center size-10 rounded-lg bg-navy text-white hover:opacity-90 transition">
              <Phone className="size-5" />
            </a>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu"
              className="flex items-center justify-center size-10 rounded-lg border border-border text-navy hover:bg-secondary transition">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-5 py-4 flex flex-col gap-2 text-sm font-medium text-navy/80">
          <button
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="flex items-center justify-between w-full py-2 hover:text-ade-blue transition"
          >
            <span>Services</span>
            <ChevronDown className={`size-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileServicesOpen && (
            <div className="pl-3 flex flex-col gap-1 mb-2">
              {SERVICE_NAV.map((s) => (
                <Link key={s.href} to={s.href} onClick={close}
                  className={`py-1.5 text-sm text-navy/70 transition ${accentHoverText(s.accent)}`}>
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileLocationsOpen((v) => !v)}
            className="flex items-center justify-between w-full py-2 hover:text-ade-blue transition"
          >
            <span>Service Areas</span>
            <ChevronDown className={`size-4 transition-transform ${mobileLocationsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileLocationsOpen && (
            <div className="pl-3 grid grid-cols-2 gap-1 mb-2">
              {LOCATIONS_NAV.map((loc) => (
                <Link key={loc.href} to={loc.href} onClick={close}
                  className="py-1.5 text-sm text-navy/70 hover:text-ade-blue transition">
                  {loc.label}
                </Link>
              ))}
            </div>
          )}

          <Link to="/#why" onClick={close} className="py-2 hover:text-ade-blue transition">Why ADE</Link>
          <Link to="/about" onClick={close} className="py-2 hover:text-ade-blue transition">About</Link>
          <Link to="/blog" onClick={close} className="py-2 hover:text-ade-blue transition">Blog</Link>
          <Link to="/faq" onClick={close} className="py-2 hover:text-ade-blue transition">FAQ</Link>
          <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} onClick={close} className="py-2 hover:text-ade-blue transition">{PHONE}</a>
        </div>
      )}
    </header>
  );
}
