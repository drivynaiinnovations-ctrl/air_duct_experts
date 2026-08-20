import { createFileRoute, notFound } from "@tanstack/react-router";
import { Phone, MapPin, CheckCircle2, ArrowRight, Calendar, Award, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";
const EMAIL = "happy@getairductexperts.com";

interface LocationData {
  name: string;
  county: string;
  title: string;
  description: string;
  badge: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  intro: string;
  nearbyAreas: string[];
  faq: { q: string; a: string }[];
}

type LocationSlug =
  | "woodbridge" | "dale-city" | "lake-ridge" | "manassas" | "lorton" | "springfield"
  | "fairfax" | "burke" | "alexandria" | "arlington" | "falls-church" | "stafford";

const LOCATIONS_DATA: Record<LocationSlug, LocationData> = {
  "woodbridge": {
    name: "Woodbridge",
    county: "Prince William County",
    title: "Air Duct Cleaning in Woodbridge, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Woodbridge, VA — home base of Air Duct Experts. Dryer vent, carpet & upholstery cleaning too. Call (571) 337-9306.",
    badge: "Woodbridge, VA · Home Base",
    heroLine1: "Woodbridge's Complete",
    heroLine2: "HVAC Cleaning Team.",
    heroSub: "Air Duct Experts is headquartered right here in Woodbridge. When you book, you're working with the team that calls this community home.",
    intro: "As Air Duct Experts' home base, Woodbridge gets our fastest scheduling and the most local familiarity with the area's homes — from established neighborhoods off Prince William Parkway to newer construction near Potomac Mills. We clean the complete HVAC system, not just the vents, for homeowners throughout Woodbridge.",
    nearbyAreas: ["Dale City", "Lake Ridge", "Occoquan", "Dumfries"],
    faq: [
      { q: "Is Air Duct Experts based in Woodbridge, VA?", a: "Yes — Woodbridge is our home base. We serve the surrounding DMV from here." },
      { q: "What services are available in Woodbridge?", a: "Complete HVAC system & air duct cleaning, dryer vent cleaning, carpet cleaning, upholstery cleaning, and indoor air quality treatments." },
      { q: "How do I get an estimate for my Woodbridge home?", a: "Call (571) 337-9306 or use the Get My Estimate form on our homepage — share your home size and ZIP code and we'll follow up." },
      { q: "Do you clean the whole HVAC system or just the vents?", a: "The whole system — supply and return ducts, registers, the blower, the evaporator coil, and the air handler cabinet. That's our core difference from low-cost duct-cleaning ads." },
    ],
  },
  "dale-city": {
    name: "Dale City",
    county: "Prince William County",
    title: "Air Duct Cleaning in Dale City, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Dale City, VA. Dryer vent, carpet & upholstery cleaning across Prince William County. Call (571) 337-9306.",
    badge: "Dale City, VA · Prince William County",
    heroLine1: "Dale City Homes,",
    heroLine2: "Completely Clean Air.",
    heroSub: "Air Duct Experts serves Dale City with complete HVAC system cleaning — not just the vents — plus dryer vent, carpet and upholstery cleaning.",
    intro: "Dale City is one of Prince William County's largest communities, and Air Duct Experts is close by in neighboring Woodbridge. We bring the same complete-system approach to Dale City homes — cleaning ducts, blower, coil and air handler, not just what's visible behind the register.",
    nearbyAreas: ["Woodbridge", "Lake Ridge", "Manassas", "Dumfries"],
    faq: [
      { q: "Does Air Duct Experts serve Dale City, VA?", a: "Yes — Dale City is part of our core Prince William County service area, close to our Woodbridge home base." },
      { q: "What's included in an air duct cleaning in Dale City?", a: "Supply and return ducts, registers, main trunk lines, the blower compartment and motor, evaporator coil, and air handler cabinet." },
      { q: "Can I bundle dryer vent cleaning with my duct cleaning in Dale City?", a: "Yes — it's commonly booked together in the same visit." },
      { q: "How do I get a price for my home?", a: "We provide an estimate based on your home size, ZIP code, and number of HVAC systems and vents. Your technician confirms the exact scope on arrival." },
    ],
  },
  "lake-ridge": {
    name: "Lake Ridge",
    county: "Prince William County",
    title: "Air Duct Cleaning in Lake Ridge, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Lake Ridge, VA. Dryer vent, carpet & upholstery cleaning nearby in Prince William County. Call (571) 337-9306.",
    badge: "Lake Ridge, VA · Prince William County",
    heroLine1: "Lake Ridge's Complete",
    heroLine2: "System Cleaning.",
    heroSub: "From established neighborhoods to newer construction, Air Duct Experts brings complete HVAC system cleaning to Lake Ridge — not just the vents.",
    intro: "Lake Ridge's mix of established and newer homes means a wide range of HVAC configurations — and Air Duct Experts has the experience to handle them all. We're minutes away in Woodbridge, and every estimate reflects the actual scope of your system.",
    nearbyAreas: ["Woodbridge", "Dale City", "Occoquan", "Manassas"],
    faq: [
      { q: "Does Air Duct Experts serve Lake Ridge, VA?", a: "Yes — Lake Ridge is part of our core service area, just next to our Woodbridge home base." },
      { q: "Do you handle both older and newer HVAC systems in Lake Ridge?", a: "Yes — our technicians work with a wide range of system ages and configurations common throughout Lake Ridge." },
      { q: "What other services can I add in Lake Ridge?", a: "Dryer vent cleaning, carpet cleaning, upholstery cleaning, and indoor air quality treatments can all be added to your visit." },
    ],
  },
  "manassas": {
    name: "Manassas",
    county: "Prince William County",
    title: "Air Duct Cleaning in Manassas, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Manassas, VA. Dryer vent, carpet & upholstery cleaning across the region. Call (571) 337-9306.",
    badge: "Manassas, VA",
    heroLine1: "Manassas Homeowners,",
    heroLine2: "Cleaner Air Starts Here.",
    heroSub: "Air Duct Experts brings complete HVAC system cleaning to Manassas — ducts, blower, coil and air handler, explained clearly before you book.",
    intro: "Manassas homeowners deserve the same transparency Air Duct Experts brings everywhere else in the DMV: a clear explanation of what's included before you book, and a technician who verifies your system on-site before doing anything beyond that scope.",
    nearbyAreas: ["Manassas Park", "Bristow", "Gainesville", "Dale City"],
    faq: [
      { q: "Does Air Duct Experts serve Manassas, VA?", a: "Yes — Manassas is part of our Prince William County service area." },
      { q: "How do I book an air duct cleaning in Manassas?", a: "Call (571) 337-9306 or submit the Get My Estimate form on our homepage." },
      { q: "Is dryer vent cleaning available in Manassas?", a: "Yes — as a standalone service or bundled with your duct cleaning appointment." },
    ],
  },
  "lorton": {
    name: "Lorton",
    county: "Fairfax County",
    title: "Air Duct Cleaning in Lorton, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Lorton, VA. Dryer vent, carpet & upholstery cleaning in Fairfax County. Call (571) 337-9306.",
    badge: "Lorton, VA · Fairfax County",
    heroLine1: "Lorton's Complete",
    heroLine2: "HVAC Cleaning.",
    heroSub: "Air Duct Experts serves Lorton with complete HVAC system cleaning — the full system, not just the vents.",
    intro: "Lorton sits at the edge of our Fairfax County service area, and Air Duct Experts brings the same thorough, transparent approach here as everywhere else: a clear scope up front, a technician who confirms it on arrival, and no surprise add-ons.",
    nearbyAreas: ["Springfield", "Fairfax Station", "Woodbridge", "Occoquan"],
    faq: [
      { q: "Does Air Duct Experts serve Lorton, VA?", a: "Yes — Lorton is part of our Fairfax County service area." },
      { q: "What's included in a complete HVAC cleaning in Lorton?", a: "Ducts, registers, blower compartment and motor, evaporator coil, and air handler cabinet — plus sanitizing where appropriate." },
      { q: "Can I get carpet cleaning at the same time in Lorton?", a: "Yes — carpet and upholstery cleaning can be booked in the same visit." },
    ],
  },
  "springfield": {
    name: "Springfield",
    county: "Fairfax County",
    title: "Air Duct Cleaning in Springfield, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Springfield, VA. Dryer vent, carpet & upholstery cleaning in Fairfax County. Call (571) 337-9306.",
    badge: "Springfield, VA · Fairfax County",
    heroLine1: "Springfield's Trusted",
    heroLine2: "Duct Cleaning Team.",
    heroSub: "Air Duct Experts brings complete HVAC system cleaning to Springfield homeowners — with a clear, upfront explanation of what's included.",
    intro: "Springfield's mature neighborhoods and busy interchange location mean homeowners here have plenty of options for duct cleaning — most of which only clean what's visible. Air Duct Experts cleans the complete system, and explains exactly what that means before you book.",
    nearbyAreas: ["Burke", "Lorton", "Alexandria", "Fairfax"],
    faq: [
      { q: "Does Air Duct Experts serve Springfield, VA?", a: "Yes — Springfield is part of our Fairfax County service area." },
      { q: "How is Air Duct Experts different from a $199 duct-cleaning ad in Springfield?", a: "We clean the full system — ducts, blower, coil and air handler — and explain exactly what's included before you book, rather than a limited flat-rate package." },
      { q: "Can I bundle dryer vent cleaning in Springfield?", a: "Yes — dryer vent cleaning is available standalone or bundled with your duct cleaning visit." },
    ],
  },
  "fairfax": {
    name: "Fairfax",
    county: "Fairfax County",
    title: "Air Duct Cleaning in Fairfax, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Fairfax, VA. Dryer vent, carpet & upholstery cleaning across Fairfax County. Call (571) 337-9306.",
    badge: "Fairfax, VA",
    heroLine1: "Fairfax's Complete",
    heroLine2: "System Cleaning.",
    heroSub: "From the City of Fairfax to the surrounding county, Air Duct Experts cleans the complete HVAC system — not just the vents.",
    intro: "Fairfax's mix of established homes and newer developments calls for a duct cleaning team that actually explains what's being cleaned. Air Duct Experts walks every Fairfax homeowner through the full scope — ducts, blower, coil and air handler — before any work begins.",
    nearbyAreas: ["Burke", "Vienna", "Falls Church", "Springfield"],
    faq: [
      { q: "Does Air Duct Experts serve the City of Fairfax and Fairfax County?", a: "Yes — we serve both the City of Fairfax and the surrounding county." },
      { q: "What add-on services are available in Fairfax?", a: "Carpet cleaning, upholstery cleaning, and indoor air quality treatments like sanitizing and deodorizing." },
      { q: "How accurate is my online estimate for a Fairfax home?", a: "It's a starting point based on what you share. Your technician verifies the exact configuration of your HVAC system on arrival before any work begins." },
    ],
  },
  "burke": {
    name: "Burke",
    county: "Fairfax County",
    title: "Air Duct Cleaning in Burke, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Burke, VA. Dryer vent, carpet & upholstery cleaning in Fairfax County. Call (571) 337-9306.",
    badge: "Burke, VA · Fairfax County",
    heroLine1: "Burke's Go-To",
    heroLine2: "HVAC Cleaning Crew.",
    heroSub: "Air Duct Experts serves Burke with complete HVAC system cleaning — ducts, blower, coil and air handler, explained clearly up front.",
    intro: "Burke homeowners get the same standard Air Duct Experts holds everywhere in the DMV: a transparent estimate, a technician who verifies the system on-site, and a complete system clean rather than a quick pass at the vents.",
    nearbyAreas: ["Fairfax", "Springfield", "Lorton", "Annandale"],
    faq: [
      { q: "Does Air Duct Experts serve Burke, VA?", a: "Yes — Burke is part of our Fairfax County service area." },
      { q: "What's the difference between a vent cleaning and a complete HVAC cleaning in Burke?", a: "A vent cleaning typically only reaches the visible register openings. A complete HVAC cleaning also covers the blower, coil, and air handler cabinet — the parts most low-cost ads skip." },
    ],
  },
  "alexandria": {
    name: "Alexandria",
    county: "City of Alexandria",
    title: "Air Duct Cleaning in Alexandria, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Alexandria, VA. Dryer vent, carpet & upholstery cleaning throughout the city. Call (571) 337-9306.",
    badge: "Alexandria, VA",
    heroLine1: "Alexandria's Complete",
    heroLine2: "HVAC Cleaning.",
    heroSub: "From Old Town row houses to newer condos, Air Duct Experts brings complete HVAC system cleaning to Alexandria homeowners.",
    intro: "Alexandria's mix of historic homes, row houses and modern construction means HVAC systems here vary widely. Air Duct Experts verifies your exact configuration on-site and cleans the complete system — ducts, blower, coil and air handler — not just what's visible at the register.",
    nearbyAreas: ["Arlington", "Falls Church", "Springfield", "Washington DC"],
    faq: [
      { q: "Does Air Duct Experts serve Alexandria, VA?", a: "Yes — Alexandria is part of our core DMV service area." },
      { q: "Can you clean ducts in older Alexandria homes or row houses?", a: "Yes — our technicians work with a range of system ages and configurations common throughout Alexandria's older and newer housing stock." },
      { q: "What other services are available in Alexandria?", a: "Dryer vent cleaning, carpet cleaning, upholstery cleaning, and indoor air quality treatments." },
    ],
  },
  "arlington": {
    name: "Arlington",
    county: "Arlington County",
    title: "Air Duct Cleaning in Arlington, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Arlington, VA. Dryer vent, carpet & upholstery cleaning throughout the county. Call (571) 337-9306.",
    badge: "Arlington, VA",
    heroLine1: "Arlington's Complete",
    heroLine2: "System Cleaning.",
    heroSub: "Air Duct Experts serves Arlington with complete HVAC system cleaning — the full system, explained clearly before you book.",
    intro: "Arlington's dense mix of condos, townhomes and single-family homes means every HVAC system is a little different. Air Duct Experts gives every Arlington homeowner a clear estimate up front, then verifies the exact system configuration before cleaning the ducts, blower, coil and air handler.",
    nearbyAreas: ["Alexandria", "Falls Church", "Washington DC", "McLean"],
    faq: [
      { q: "Does Air Duct Experts serve Arlington, VA?", a: "Yes — Arlington is part of our core DMV service area." },
      { q: "Do you clean ducts in condos and townhomes in Arlington?", a: "Yes — our technicians are experienced with the compact HVAC configurations common in Arlington condos and townhomes, as well as single-family homes." },
      { q: "How do I schedule in Arlington?", a: "Call (571) 337-9306 or use the Get My Estimate form on our homepage." },
    ],
  },
  "falls-church": {
    name: "Falls Church",
    county: "City of Falls Church",
    title: "Air Duct Cleaning in Falls Church, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Falls Church, VA. Dryer vent, carpet & upholstery cleaning nearby. Call (571) 337-9306.",
    badge: "Falls Church, VA",
    heroLine1: "Falls Church's Complete",
    heroLine2: "HVAC Cleaning.",
    heroSub: "Air Duct Experts brings complete HVAC system cleaning to Falls Church — not just the vents.",
    intro: "Falls Church homeowners get the same transparent process Air Duct Experts uses everywhere: a clear estimate, a technician who verifies your system on arrival, and a complete clean of the ducts, blower, coil and air handler.",
    nearbyAreas: ["Arlington", "Fairfax", "Alexandria", "Vienna"],
    faq: [
      { q: "Does Air Duct Experts serve Falls Church, VA?", a: "Yes — Falls Church is part of our core DMV service area." },
      { q: "What services can I book together in Falls Church?", a: "Air duct cleaning, dryer vent cleaning, carpet cleaning and upholstery cleaning can all be scheduled in the same visit." },
    ],
  },
  "stafford": {
    name: "Stafford",
    county: "Stafford County",
    title: "Air Duct Cleaning in Stafford, VA | Air Duct Experts",
    description: "Complete HVAC & air duct cleaning in Stafford, VA. Dryer vent, carpet & upholstery cleaning across Stafford County. Call (571) 337-9306.",
    badge: "Stafford, VA · Stafford County",
    heroLine1: "Stafford County's",
    heroLine2: "Complete HVAC Clean.",
    heroSub: "Air Duct Experts extends complete HVAC system cleaning south to Stafford County — the full system, not just the vents.",
    intro: "Stafford County rounds out Air Duct Experts' southern service area, just down I-95 from our Woodbridge home base. Homeowners here get the same thorough approach — a clear estimate, on-site verification, and a complete system clean.",
    nearbyAreas: ["Woodbridge", "Quantico", "Fredericksburg", "Dumfries"],
    faq: [
      { q: "Does Air Duct Experts serve Stafford, VA?", a: "Yes — Stafford County is part of our extended DMV service area." },
      { q: "How do I get an estimate for my Stafford home?", a: "Call (571) 337-9306 or use the Get My Estimate form on our homepage — share your ZIP code and home details and we'll follow up." },
    ],
  },
};

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const loc = LOCATIONS_DATA[params.slug as LocationSlug] ?? null;
    if (!loc) throw notFound();
    return { loc, slug: params.slug as LocationSlug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.loc) return {};
    const { loc, slug } = loaderData;
    const canonical = `https://getairductexperts.com/locations/${slug}`;
    return {
      meta: [
        { title: loc.title },
        { name: "description", content: loc.description },
        { property: "og:title", content: loc.title },
        { property: "og:description", content: loc.description },
        { property: "og:url", content: canonical },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        { rel: "canonical", href: canonical },
      ],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { loc, slug } = Route.useLoaderData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ldLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "Air Duct Experts",
    description: `Complete HVAC system & air duct cleaning serving ${loc.name}, VA and ${loc.county}.`,
    telephone: "+1" + PHONE_TEL,
    email: EMAIL,
    url: `https://getairductexperts.com/locations/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Woodbridge",
      addressRegion: "VA",
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: loc.name, containedInPlace: { "@type": "AdministrativeArea", name: loc.county } },
  };

  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLocalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />

      <div className="min-h-screen bg-background text-navy">
        <SiteHeader />

        <section className="bg-navy text-white py-20 px-5 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ label: "Service Areas", href: "/#area" }, { label: `${loc.name}, VA` }]} className="mb-6" />
            <span className="inline-flex items-center gap-2 text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <MapPin className="size-3.5" /> {loc.badge}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-6">
              {loc.heroLine1} <span className="text-ade-blue">{loc.heroLine2}</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-8">{loc.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#estimate"
                className="bg-ade-blue text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                <Calendar className="size-5" /> Get My Estimate <ArrowRight className="size-4" />
              </a>
              <a href={`tel:${PHONE_TEL}`}
                className="border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-border py-5">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 flex flex-wrap gap-6 justify-center">
            {[
              [Award, "17 Years Industry Experience"],
              [Clock, "Transparent Estimates"],
              [CheckCircle2, "Complete System Cleaning"],
              [MapPin, `Serving ${loc.county}`],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-2 text-sm font-medium text-navy">
                <Icon className="size-4 text-ade-blue shrink-0" />
                <span>{label as string}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Local &amp; Transparent</p>
              <h2 className="font-display text-4xl font-semibold text-navy mb-5 leading-tight">
                Serving {loc.name}, {loc.county}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{loc.intro}</p>
            </div>
            <div className="bg-secondary/40 rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-navy mb-4">Services Available in {loc.name}</h3>
              {[
                "Complete HVAC System & Air Duct Cleaning",
                "Dryer Vent Cleaning",
                "Carpet Cleaning",
                "Upholstery Cleaning",
                "Indoor Air Quality Treatments",
              ].map((s) => (
                <div key={s} className="flex items-center gap-2.5 text-sm text-navy/85">
                  <CheckCircle2 className="size-4 text-ade-blue shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-navy text-white">
          <div className="max-w-5xl mx-auto px-5 lg:px-8">
            <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-center">Why {loc.name} Chooses ADE</p>
            <h2 className="font-display text-4xl font-semibold text-center mb-12">The Air Duct Experts Difference</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Award, title: "17 Years of Experience", body: "Founded on nearly two decades of hands-on industry experience.", color: "text-amber" },
                { icon: CheckCircle2, title: "Complete System Cleaning", body: "Ducts, blower, coil and air handler — not just the vents.", color: "text-ade-blue" },
                { icon: Clock, title: "Transparent Estimates", body: "You know what's included before your technician ever arrives.", color: "text-teal" },
                { icon: MapPin, title: "Local Coverage", body: `We know ${loc.name} and ${loc.county} well.`, color: "text-ade-blue" },
                { icon: ArrowRight, title: "On-Site Verification", body: "Extra work is explained and approved by you first — never assumed.", color: "text-teal" },
              ].map((c) => (
                <div key={c.title} className="bg-white/5 rounded-2xl p-6">
                  <c.icon className={`size-8 mb-4 ${c.color}`} />
                  <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8">
            <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-center">Common Questions</p>
            <h2 className="font-display text-4xl font-semibold text-navy text-center mb-10">
              Duct Cleaning in {loc.name}, VA
            </h2>
            <div className="space-y-3">
              {loc.faq.map((item, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-navy hover:bg-secondary/40 transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`size-4 text-ade-blue shrink-0 transition-transform ml-3 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-secondary/40">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
            <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Also Serving Nearby</p>
            <h2 className="font-display text-2xl font-semibold text-navy mb-6">Neighboring Communities</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {loc.nearbyAreas.map((area) => (
                <span key={area} className="bg-white border border-border rounded-full px-4 py-1.5 text-sm font-medium text-navy">
                  {area}, VA
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-navy text-white text-center px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-semibold mb-4">
              Need Duct Cleaning in {loc.name}?
            </h2>
            <p className="text-white/70 mb-8 text-lg">Get an estimate or call directly — Air Duct Experts is ready for your home.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#estimate"
                className="bg-ade-blue text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                <Calendar className="size-5" /> Get My Estimate
              </a>
              <a href={`tel:${PHONE_TEL}`}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
