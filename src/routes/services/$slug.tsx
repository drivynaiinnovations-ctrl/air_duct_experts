import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Calendar, CheckCircle2, ArrowRight, ChevronDown, ChevronUp,
  MapPin, Wind, Flame, Sparkles, Sofa, ShieldCheck, AlertTriangle,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SERVICE_ACCENT, accentText, accentIconBg, type ServiceAccent } from "@/lib/serviceAccent";
import { BLOG_POSTS } from "@/lib/blogPosts";

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";
const AREA = "Woodbridge, Dale City, Lake Ridge, Manassas, Lorton, Springfield, Fairfax, Burke, Alexandria, Arlington, Falls Church & Stafford";

// ── Service data ─────────────────────────────────────────────────────────────
const SERVICES_DATA = {
  "air-duct-cleaning": {
    name: "Air Duct Cleaning",
    icon: Wind,
    title: "Complete HVAC & Air Duct Cleaning in the DMV | Air Duct Experts",
    description: "Complete HVAC system cleaning in Washington DC, Maryland & Northern Virginia — supply & return ducts, blower, coil and air handler. Not just the vents. Call (571) 337-9306.",
    badge: "Complete System Cleaning",
    heroLine1: "Complete HVAC Cleaning.",
    heroLine2: "Not Just the Vents.",
    heroSub: "Many low-cost ads only clean what's visible. Air Duct Experts cleans the full system — ducts, blower, coil and air handler — across the DMV.",
    intro: "Air Duct Experts provides complete HVAC system and air duct cleaning for DMV homeowners. Our differentiator is simple: we clean the complete system, not just the vents you can see. Before we start, we walk you through exactly what's included so you understand what you're purchasing — no vague packages, no hidden scope.",
    offers: [
      "Supply duct cleaning throughout the home",
      "Return duct cleaning",
      "Registers & grilles cleaned and wiped down",
      "Main trunk line cleaning",
      "Blower compartment cleaning",
      "Blower motor / wheel cleaning",
      "Evaporator coil cleaning",
      "Air handler / furnace cabinet cleaning",
      "HVAC sanitizing, antimicrobial treatment & deodorizing (where applicable)",
    ],
    signs: [
      "Visible dust building up around vents or on furniture",
      "Recently bought, moved into, or renovated the home",
      "Allergy or sinus irritation that eases when you leave the house",
      "Musty or stale odor when the HVAC system runs",
      "It's been years since the ducts were last cleaned (or never)",
    ],
    process: [
      { n: "01", title: "Get Your Estimate", body: "Share your home size, ZIP code and number of HVAC systems and vents — we'll follow up with an estimate based on what you tell us." },
      { n: "02", title: "Technician Verifies On-Site", body: "Your technician confirms the actual system configuration when they arrive. Anything beyond the original scope is explained and approved by you first." },
      { n: "03", title: "Complete System Clean", body: "We clean the ducts, blower, coil and air handler — not just the registers — using professional equipment." },
      { n: "04", title: "Walkthrough", body: "We show you what we found and what we did, so you understand the condition of your system going forward." },
    ],
    faq: [
      { q: "What does complete HVAC system cleaning actually mean?", a: "It means cleaning the entire path air travels through — supply and return ducts, registers, main trunk lines, the blower compartment and motor, the evaporator coil, and the air handler or furnace cabinet — not just the vent openings you can see in each room." },
      { q: "Why isn't cleaning only the vents enough?", a: "Dust, allergens and debris build up throughout the whole system, including the blower and coil. Cleaning only the visible vent leaves the rest of the system — and the source of a lot of the dust — untouched." },
      { q: "What should be included in a professional air duct cleaning?", a: "At minimum: supply and return ducts, registers and grilles, the main trunk line, and access to the blower compartment. Ask specifically whether the blower motor, evaporator coil and air handler cabinet are included before you book." },
      { q: "How do I know if my ducts need cleaning?", a: "Common signs include visible dust around vents, a musty smell when the system runs, recent renovation or move-in dust, or simply not knowing when the ducts were last cleaned." },
      { q: "Is the price I get online final?", a: "No — it's an estimate based on the information you provide. Your technician verifies your exact HVAC configuration on arrival, and any additional work is explained and approved by you before it's performed." },
    ],
  },

  "dryer-vent-cleaning": {
    name: "Dryer Vent Cleaning",
    icon: Flame,
    title: "Dryer Vent Cleaning in the DMV | Air Duct Experts",
    description: "Residential dryer vent cleaning in Washington DC, Maryland & Northern Virginia — standalone or bundled with air duct cleaning. Call (571) 337-9306 for an estimate.",
    badge: "Standalone or Bundled",
    heroLine1: "Dryer Taking Forever",
    heroLine2: "to Dry a Load?",
    heroSub: "A clogged dryer vent slows drying time and is a leading cause of house fires. Air Duct Experts clears it — as its own service or bundled with a duct cleaning.",
    intro: "Lint builds up inside your dryer vent long before it becomes visible — reducing airflow, extending dry times, and increasing fire risk. Air Duct Experts offers dryer vent cleaning as both a standalone service and a convenient add-on to a full HVAC system cleaning.",
    offers: [
      "Full-length dryer vent lint removal",
      "Exterior vent hood cleaning & flap check",
      "Dryer duct inspection for crushed or disconnected sections",
      "Bundled pricing when combined with air duct cleaning",
    ],
    signs: [
      "Clothes take two or more cycles to fully dry",
      "The dryer or laundry room feels noticeably hot during a cycle",
      "A burning smell during drying",
      "Visible lint around the outside exhaust vent",
      "It's been over a year since the vent was last cleaned",
    ],
    process: [
      { n: "01", title: "Get Your Estimate", body: "Tell us your dryer setup and whether you'd like it bundled with a duct cleaning appointment." },
      { n: "02", title: "Inspect the Vent Run", body: "We check the full length of the vent from the dryer to the exterior termination point." },
      { n: "03", title: "Clear the Lint", body: "We remove built-up lint and debris along the entire vent run, not just the accessible end." },
      { n: "04", title: "Confirm Airflow", body: "We confirm the exterior flap opens freely and airflow is restored before we leave." },
    ],
    faq: [
      { q: "How often should dryer vents be cleaned?", a: "Most homes benefit from an annual cleaning. Larger households or longer vent runs may need it more often." },
      { q: "Can dryer vent cleaning be added to an air duct cleaning appointment?", a: "Yes — it's commonly bundled with a full HVAC system cleaning for one combined visit." },
      { q: "Why does my dryer take so long to dry clothes?", a: "A restricted vent is one of the most common causes. Reduced airflow means moisture isn't being carried outside efficiently, so cycles run longer." },
      { q: "Is a clogged dryer vent really a fire risk?", a: "Lint is highly flammable, and a blocked vent traps heat inside the dryer and duct. Routine cleaning reduces that risk." },
    ],
  },

  "carpet-cleaning": {
    name: "Carpet Cleaning",
    icon: Sparkles,
    title: "Residential Carpet Cleaning in the DMV | Air Duct Experts",
    description: "Whole-home carpet cleaning, individual rooms, stairs, area rugs, and pet stain & odor treatment in Washington DC, Maryland & Northern Virginia. Call (571) 337-9306.",
    badge: "Whole-Home & Room-by-Room",
    heroLine1: "Carpets That Look",
    heroLine2: "(and Smell) Like New.",
    heroSub: "Whole-home carpet cleaning, individual rooms, stairs, area rugs, and dedicated pet stain & odor treatment — from the same team that cleans your HVAC system.",
    intro: "Air Duct Experts offers residential carpet cleaning for whole homes, individual rooms, stairs, and area rugs — including dedicated pet stain and odor treatment. It's a convenient add-on when you're already having your HVAC system serviced, or a standalone booking on its own.",
    offers: [
      "Whole-home carpet cleaning",
      "Individual room cleaning",
      "Stair carpet cleaning",
      "Area rug cleaning",
      "Pet stain treatment",
      "Pet odor treatment",
    ],
    signs: [
      "Visible traffic patterns or dulling in high-use areas",
      "Pet stains or lingering odor that spot-cleaning hasn't fixed",
      "Carpets haven't been professionally cleaned in over a year",
      "Preparing a home for sale or move-in",
      "Allergy symptoms that seem tied to time spent at home",
    ],
    process: [
      { n: "01", title: "Get Your Estimate", body: "Tell us the rooms, square footage, and whether pet treatment is needed." },
      { n: "02", title: "Pre-Treat", body: "Stains and heavy-traffic areas are pre-treated before the full clean." },
      { n: "03", title: "Deep Clean", body: "Carpets are cleaned throughout the selected areas, including stairs and rugs if included." },
      { n: "04", title: "Dry & Walkthrough", body: "We explain drying time and any spots that may need a follow-up look." },
    ],
    faq: [
      { q: "Can carpet cleaning be bundled with air duct cleaning?", a: "Yes — many homeowners book both in the same visit, especially during a move-in or renovation cleanup." },
      { q: "Do you treat pet stains and odor separately from a standard cleaning?", a: "Yes — pet stain and odor treatment is offered as an add-on since it typically requires additional product and time." },
      { q: "How long does carpet take to dry after cleaning?", a: "Drying time varies by carpet type, humidity, and airflow in the home. Your technician will give you an estimate specific to your space." },
    ],
  },

  "upholstery-cleaning": {
    name: "Upholstery Cleaning",
    icon: Sofa,
    title: "Upholstery Cleaning in the DMV | Air Duct Experts",
    description: "Professional upholstery cleaning for sofas, chairs and other furniture in Washington DC, Maryland & Northern Virginia. Call (571) 337-9306 for an estimate.",
    badge: "Sofas, Chairs & More",
    heroLine1: "Furniture That Feels",
    heroLine2: "Fresh Again.",
    heroSub: "Professional cleaning for sofas, chairs and other appropriate upholstered furniture — from the same trusted local team.",
    intro: "Upholstered furniture collects dust, allergens and everyday wear just like carpet does. Air Duct Experts cleans sofas, chairs and other appropriate upholstery for DMV homeowners, either as a standalone service or bundled with a home cleaning visit.",
    offers: [
      "Sofa & couch cleaning",
      "Chair & accent chair cleaning",
      "Fabric-appropriate cleaning methods",
      "Spot and stain treatment",
    ],
    signs: [
      "Visible soiling on arms, cushions or headrests",
      "Lingering odor from pets or everyday use",
      "Furniture hasn't been professionally cleaned since purchase",
      "Preparing a home for sale or a fresh start in a new one",
    ],
    process: [
      { n: "01", title: "Get Your Estimate", body: "Tell us what pieces you'd like cleaned and their fabric type if known." },
      { n: "02", title: "Fabric Check", body: "We confirm the right cleaning method for your specific upholstery." },
      { n: "03", title: "Clean & Treat", body: "Cushions, arms and hard-to-reach areas are cleaned and any stains treated." },
      { n: "04", title: "Dry & Walkthrough", body: "We explain drying time and any care recommendations going forward." },
    ],
    faq: [
      { q: "Can you clean any type of furniture fabric?", a: "Most upholstery fabrics can be cleaned professionally. Your technician will confirm the appropriate method for your specific piece before starting." },
      { q: "Can upholstery cleaning be added to a carpet or duct cleaning visit?", a: "Yes — it's commonly bundled with carpet cleaning or a full HVAC service in the same appointment." },
    ],
  },

  "indoor-air-quality": {
    name: "Indoor Air Quality",
    icon: ShieldCheck,
    title: "Indoor Air Quality Services in the DMV | Air Duct Experts",
    description: "HVAC sanitizing, antimicrobial treatment and deodorizing in Washington DC, Maryland & Northern Virginia. Call (571) 337-9306 for an estimate.",
    badge: "Sanitizing & Deodorizing",
    heroLine1: "Cleaner Ducts.",
    heroLine2: "Fresher Air.",
    heroSub: "HVAC sanitizing, antimicrobial treatment and deodorizing — applied where appropriate as part of a complete system cleaning.",
    intro: "Beyond removing dust and debris, Air Duct Experts offers indoor air quality add-ons including HVAC sanitizing, antimicrobial treatment and deodorizing where applicable. These services are recommended based on what your technician actually finds in your system — never applied as an automatic upsell.",
    offers: [
      "HVAC system sanitizing",
      "Antimicrobial treatment (where applicable)",
      "Deodorizing treatment",
      "Recommendations based on the condition of your specific system",
    ],
    signs: [
      "Musty or stale odor when the HVAC system runs",
      "Household members with allergy or sinus sensitivity",
      "Visible residue or discoloration inside ducts or registers",
      "Recent water intrusion or humidity issues near ductwork",
    ],
    process: [
      { n: "01", title: "Get Your Estimate", body: "Let us know the odor or air quality concern you're experiencing." },
      { n: "02", title: "Technician Assessment", body: "Your technician inspects the system and recommends whether sanitizing, antimicrobial treatment or deodorizing is appropriate — with an honest explanation, not a blanket upsell." },
      { n: "03", title: "Treatment Applied", body: "Recommended treatments are applied as part of your system cleaning." },
      { n: "04", title: "Walkthrough", body: "We explain what was found and what was treated before we leave." },
    ],
    faq: [
      { q: "Do you handle mold remediation?", a: "We do not advertise regulated mold-remediation services. If a technician suspects a mold issue beyond standard duct cleaning and sanitizing, we'll be upfront about it and recommend you consult a certified specialist." },
      { q: "Is sanitizing included automatically with every duct cleaning?", a: "No — it's recommended based on what your technician actually finds during the cleaning, and explained to you before it's added." },
      { q: "Can dirty ducts contribute to dust throughout my home?", a: "Yes. Ducts that circulate air throughout the house can also recirculate dust and debris if they haven't been cleaned — one reason we clean the complete system, not just the vents." },
    ],
  },
} as const;

type ServiceSlug = keyof typeof SERVICES_DATA;

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const slug = params.slug as ServiceSlug;
    if (!SERVICES_DATA[slug]) throw notFound();
    return { slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.slug) return {};
    const { slug } = loaderData;
    const svc = SERVICES_DATA[slug];
    const canonical = `https://getairductexperts.com/services/${slug}`;
    return {
      meta: [
        { title: svc.title },
        { name: "description", content: svc.description },
        { property: "og:title", content: svc.title },
        { property: "og:description", content: svc.description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        { rel: "canonical", href: canonical },
      ],
    };
  },
  component: ServicePage,
});

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-navy hover:bg-secondary/50 transition"
      >
        <span>{q}</span>
        {open ? <ChevronUp className="size-4 text-ade-blue shrink-0" /> : <ChevronDown className="size-4 text-ade-blue shrink-0" />}
      </button>
      {open && <div className="px-5 pb-4 text-navy/80 text-sm leading-relaxed">{a}</div>}
    </div>
  );
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildSchemas(svc: (typeof SERVICES_DATA)[ServiceSlug]) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "Air Duct Experts",
    url: "https://getairductexperts.com",
    telephone: "+1" + PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Woodbridge",
      addressRegion: "VA",
      addressCountry: "US",
    },
    areaServed: ["Washington DC", "Maryland", "Northern Virginia"],
    priceRange: "$$",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.name,
    provider: { "@type": "HVACBusiness", name: "Air Duct Experts" },
    areaServed: { "@type": "Place", name: "Washington DC, Maryland & Northern Virginia" },
    description: svc.description,
  };

  return { localBusiness, faqSchema, serviceSchema };
}

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const svc = SERVICES_DATA[slug];
  const Icon = svc.icon;
  const schemas = buildSchemas(svc);
  const accent = SERVICE_ACCENT[slug] as ServiceAccent;
  const accentClass = accentText(accent);
  const relatedPosts = BLOG_POSTS.filter((post) => post.relatedServices.includes(slug)).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-navy">
      <JsonLd data={schemas.localBusiness} />
      <JsonLd data={schemas.faqSchema} />
      <JsonLd data={schemas.serviceSchema} />

      <SiteHeader />

      {/* Service Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ade-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumbs items={[{ label: "Services", href: "/#services" }, { label: svc.name }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${accentClass}`}>
              <Icon className="size-4" /> {svc.badge}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-[1.05] mb-5">
              {svc.heroLine1} <span className={accentClass}>{svc.heroLine2}</span>
            </h1>
            <p className="text-xl text-white/75 leading-relaxed mb-8 max-w-2xl">{svc.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#estimate"
                className="group bg-ade-blue text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition">
                <Calendar className="size-5" /> Get My Estimate
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </a>
              <a href={`tel:${PHONE_TEL}`}
                className="bg-transparent border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
                <Phone className={`size-5 ${accentClass}`} /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex flex-wrap gap-6">
          {["17 Years of Industry Experience", "Serving the DMV", "Transparent Estimates", "Residential Focused"].map((t) => (
            <span key={t} className="flex items-center gap-2 text-sm text-navy/80 font-medium">
              <CheckCircle2 className="size-4 text-ade-blue" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <div>
              <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${accentClass}`}>About This Service</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-5">{svc.name} by Air Duct Experts</h2>
              <p className="text-lg text-navy/75 leading-relaxed">{svc.intro}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-ade-blue/5 rounded-2xl p-7 border border-border">
              <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-4">What's Included</p>
              <ul className="space-y-3">
                {svc.offers.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-navy/85">
                    <CheckCircle2 className={`size-4 shrink-0 mt-0.5 ${accentClass}`} />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 bg-ade-blue/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-3">Signs to Watch For</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy">Do You Need {svc.name}?</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {svc.signs.map((sign, i) => (
              <Reveal key={sign} delay={i * 60}>
                <div className="bg-white rounded-xl border border-border p-5 flex items-start gap-3">
                  <AlertTriangle className="size-5 text-amber shrink-0 mt-0.5" />
                  <span className="text-sm text-navy/85">{sign}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Recognizing any of these? Let's get you an estimate.</p>
              <a href={`tel:${PHONE_TEL}`}
                className="bg-ade-blue text-white font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:opacity-90 shadow-blue transition">
                <Phone className="size-4" /> Call {PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Process</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy">How Air Duct Experts Gets It Done</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {svc.process.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="text-center bg-ade-blue/5 rounded-2xl p-7 border border-border">
                  <div className="size-16 mx-auto rounded-full bg-white border-2 border-ade-blue flex items-center justify-center font-display text-xl font-bold text-ade-blue mb-4 shadow-sm">
                    {s.n}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why ADE */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Air Duct Experts</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-5">Professional. Local. Transparent.</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Air Duct Experts is based in Woodbridge, VA and serves homeowners across Washington DC, Maryland and Northern Virginia. Founded on 17 years of hands-on industry experience, we explain exactly what's included before you book — and get your approval before doing anything beyond the original scope.
              </p>
              <ul className="space-y-3">
                {["17 years of industry experience", "Estimates based on the details you provide", "Technician verifies scope before work begins", "Additional work explained and approved by you first", "Residential-focused, DMV-wide"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="size-4 text-ade-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "17 Yrs", sub: "Industry Experience", tile: "bg-ade-blue/10 border-ade-blue/30 text-ade-blue" },
                { label: "DMV", sub: "Service Area", tile: "bg-teal/10 border-teal/30 text-teal" },
                { label: "Residential", sub: "Primary Focus", tile: "bg-amber/10 border-amber/30 text-amber" },
                { label: "Transparent", sub: "Estimates", tile: "bg-ade-blue/10 border-ade-blue/30 text-ade-blue" },
              ].map((stat) => (
                <div key={stat.label} className={`border rounded-2xl p-6 text-center ${stat.tile}`}>
                  <p className="font-display text-3xl font-bold mb-1">{stat.label}</p>
                  <p className="text-white/70 text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Common Questions</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy">{svc.name} FAQ</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {svc.faq.map((item) => (
              <Reveal key={item.q}>
                <FaqItem q={item.q} a={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-ade-blue/5">
          <div className="max-w-6xl mx-auto px-5 lg:px-8">
            <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-center">Learn More</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-8 text-center">Related Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group h-full flex flex-col rounded-2xl border border-border bg-white hover:shadow-luxe transition p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-navy mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <span className={`text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all ${accentText(post.accent)}`}>
                    Read the guide <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Service Area */}
      <section className="py-16 bg-ade-blue/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Service Area</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-4">
              {svc.name} — DMV Wide
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Air Duct Experts provides {svc.name.toLowerCase()} throughout {AREA} — and the surrounding DMV area.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Woodbridge", "Dale City", "Lake Ridge", "Manassas", "Lorton", "Springfield", "Fairfax", "Burke", "Alexandria", "Arlington", "Falls Church", "Stafford"].map((city) => (
                <span key={city} className="inline-flex items-center gap-1.5 bg-white border border-border px-4 py-2 rounded-full text-sm text-navy font-medium">
                  <MapPin className="size-3 text-ade-blue" /> {city}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ade-blue/20 via-ade-blue/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
              Ready for <span className="text-ade-blue">{svc.name}?</span>
            </h2>
            <p className="text-white/75 text-lg mb-8">Get your estimate or call directly — serving homeowners across the DMV.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href="/#estimate"
                className="bg-ade-blue text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition">
                <Calendar className="size-5" /> Get My Estimate
              </a>
              <a href={`tel:${PHONE_TEL}`}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
            <p className="text-white/50 text-sm">17 Years of Industry Experience. Woodbridge, VA — Serving the DMV.</p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
