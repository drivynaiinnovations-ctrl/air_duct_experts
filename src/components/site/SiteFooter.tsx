import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { SERVICE_NAV, LOCATIONS_NAV } from "./SiteHeader";
import { Logo } from "./Logo";

const PHONE = "(571) 337-9306";
const EMAIL = "happy@getairductexperts.com";

export function SiteFooter() {
  return (
    <footer className="bg-navy border-t border-white/10 text-white/80">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="dark" />
          <p className="italic text-white/60 mt-4">Complete HVAC system cleaning. Not just the vents.</p>
          <p className="text-xs text-white/40 mt-3 flex items-start gap-1.5">
            <MapPin className="size-3.5 shrink-0 mt-0.5" /> Woodbridge, VA · Serving the DMV
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Services</h4>
          <ul className="space-y-2 text-sm">
            {SERVICE_NAV.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="hover:text-ade-blue transition">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Service Areas</h4>
          <ul className="space-y-2 text-sm grid grid-cols-1 gap-x-4">
            {LOCATIONS_NAV.slice(0, 6).map((loc) => (
              <li key={loc.href}>
                <Link to={loc.href} className="hover:text-ade-blue transition">{loc.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-ade-blue transition">About</Link></li>
            <li><Link to="/blog" className="hover:text-ade-blue transition">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-ade-blue transition">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Contact</h4>
          <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="text-sm flex items-center gap-2 mb-2 hover:text-ade-blue transition">
            <Phone className="size-4 text-ade-blue" /> {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="text-sm flex items-center gap-2 hover:text-ade-blue transition">
            <Mail className="size-4 text-ade-blue" /> {EMAIL}
          </a>
          <p className="text-xs text-white/40 mt-4">17 Years of Industry Experience</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Air Duct Experts. All rights reserved. Woodbridge, VA — Serving Washington DC, Maryland & Northern Virginia.
      </div>
    </footer>
  );
}
