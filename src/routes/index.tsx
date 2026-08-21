import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Phone, Calendar, Clock, Home, Building2, CheckCircle2, ArrowRight, Mail,
  Wind, Flame, Sparkles, Sofa, ShieldCheck, MapPin, X, AlertTriangle, Award, Youtube, MessageSquare,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HeroSlider } from "@/components/site/HeroSlider";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { SERVICE_ACCENT, accentIconBg, accentText, accentHoverBorder, type ServiceAccent } from "@/lib/serviceAccent";
import { BLOG_POSTS } from "@/lib/blogPosts";

const SITE_URL = "https://getairductexperts.com";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Air Duct Experts | Complete HVAC & Duct Cleaning in the DMV" },
      { name: "description", content: "Air Duct Experts cleans the complete HVAC system — supply & return ducts, blower, coil and air handler — not just the vents. Residential air duct, dryer vent, carpet & upholstery cleaning across DC, MD & Northern Virginia. Call (571) 337-9306." },
      { property: "og:title", content: "Air Duct Experts — Complete HVAC System Cleaning" },
      { property: "og:description", content: "17 years of industry experience. Professional, transparent, thorough HVAC and duct cleaning for DMV homeowners." },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Air Duct Experts — Complete HVAC System Cleaning" },
      { name: "twitter:description", content: "17 years of industry experience. Serving Washington DC, Maryland & Northern Virginia." },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + "/" },
    ],
  }),
});

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";
const EMAIL = "happy@getairductexperts.com";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function HomeSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Air Duct Experts",
    alternateName: "ADE",
    url: SITE_URL,
    telephone: "+1" + PHONE_TEL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Woodbridge",
      addressRegion: "VA",
      addressCountry: "US",
    },
    areaServed: ["Washington DC", "Maryland", "Northern Virginia"],
    priceRange: "$$",
    founder: { "@type": "Person", name: "Marcus Hines" },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Air Duct Experts",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-navy">
      <HomeSchema />
      <SiteHeader />
      <HeroSlider />
      <TrustBar />
      <NotJustVents />
      <EstimateWidget />
      <WhoItsFor />
      <Services />
      <HowItWorks />
      <BeforeAfter />
      <YouTubeSection />
      <FromTheBlog />
      <ReviewsComingSoon />
      <ServiceArea />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

function FromTheBlog() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="From the Blog" title="Learn Before You Book"
          sub="Straightforward answers to the questions DMV homeowners ask most — no fear-mongering, no upsells." />
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group h-full flex flex-col p-7 rounded-2xl border border-border hover:shadow-luxe transition bg-white"
              >
                <span className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${accentIconBg(post.accent)} ${accentText(post.accent)}`}>
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-navy mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                <span className={`text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all ${accentText(post.accent)}`}>
                  Read the guide <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/blog" className="text-sm font-semibold text-ade-blue hover:opacity-80 inline-flex items-center gap-1.5">
            Visit the full blog <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Award, label: "17 Years of Industry Experience", accent: accentText("amber") },
    { icon: MapPin, label: "Locally Owned — Woodbridge, VA", accent: accentText("blue") },
    { icon: CheckCircle2, label: "Transparent, Upfront Pricing", accent: accentText("teal") },
  ];
  return (
    <section className="hidden md:block bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2.5 text-sm flex-1">
            <it.icon className={`size-5 shrink-0 ${it.accent}`} />
            <span className="text-navy font-medium">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── The core differentiator: complete system vs. "just the vents" ──────────
function NotJustVents() {
  const included = [
    "Supply ducts & return ducts",
    "Registers and grilles",
    "Main trunk lines",
    "Blower compartment",
    "Blower motor / wheel",
    "Evaporator coil",
    "Air handler / furnace cabinet",
    "HVAC system sanitizing & deodorizing",
  ];
  const typical = [
    "A handful of visible vent openings",
    "Nothing behind the register",
    "No blower or coil access",
    "No sanitizing or deodorizing",
    "\"Unlimited vents\" fine print with add-on fees",
  ];
  return (
    <section id="why" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Air Duct Experts</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy mb-4">
              What does a $199 duct-cleaning ad actually clean?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most low-cost advertisements only reach the parts of the system you can see. We educate homeowners on what comprehensive cleaning involves — so you know exactly what you're buying before you book.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="h-full rounded-2xl border border-border p-8 bg-secondary/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-11 rounded-xl bg-white border border-border flex items-center justify-center">
                  <AlertTriangle className="size-5 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">What a low-cost ad often covers</h3>
              </div>
              <ul className="space-y-3">
                {typical.map((item) => (
                  <li key={item} className="flex gap-2 text-muted-foreground text-sm">
                    <X className="size-4 text-muted-foreground/70 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border-t-4 border-ade-blue p-8 bg-navy shadow-luxe">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-11 rounded-xl bg-ade-blue/15 flex items-center justify-center">
                  <ShieldCheck className="size-5 text-ade-blue" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">The complete ADE system clean</h3>
              </div>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-2 text-white/85 text-sm">
                    <CheckCircle2 className="size-4 text-ade-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            Every estimate explains exactly what's included. If our technician finds additional work is needed once on site, we explain it and get your approval before doing it — never a surprise on the invoice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── Get My Estimate — service selector + call/email (booking system TBD) ───
const ESTIMATE_SERVICES = [
  { key: "hvac",       label: "Complete HVAC / Air Duct Cleaning", icon: Wind },
  { key: "dryer",      label: "Dryer Vent Cleaning",                icon: Flame },
  { key: "carpet",     label: "Carpet Cleaning",                    icon: Sparkles },
  { key: "upholstery", label: "Upholstery Cleaning",                icon: Sofa },
] as const;

const ADD_ONS = [
  { key: "pet", label: "Pet stain / odor treatment" },
  { key: "sanitize", label: "HVAC sanitizing / deodorizing" },
] as const;

const TIME_WINDOWS = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–7pm)", "I'm flexible"] as const;

function EstimateWidget() {
  const [selected, setSelected] = useState<string[]>(["hvac"]);
  const [zip, setZip] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [timeWindow, setTimeWindow] = useState<string>(TIME_WINDOWS[3]);

  const toggle = (key: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(key) ? list.filter((k) => k !== key) : [...list, key]);
  };

  const summaryLines = useMemo(() => {
    const services = ESTIMATE_SERVICES.filter((s) => selected.includes(s.key)).map((s) => s.label);
    const extras = ADD_ONS.filter((a) => addOns.includes(a.key)).map((a) => a.label);
    return { services, extras };
  }, [selected, addOns]);

  const requestLines = [
    zip ? `ZIP code: ${zip}` : null,
    summaryLines.services.length ? `Services: ${summaryLines.services.join(", ")}` : null,
    summaryLines.extras.length ? `Add-ons: ${summaryLines.extras.join(", ")}` : null,
    date ? `Preferred date: ${date}` : null,
    `Preferred time: ${timeWindow}`,
  ].filter(Boolean).join("\n");

  const mailBody = [requestLines, "", "Please confirm this appointment request."].join("\n");
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Appointment Request — Air Duct Experts")}&body=${encodeURIComponent(mailBody)}`;

  const smsBody = `Hi, I'd like to request an appointment.\n${requestLines}`;
  const smsHref = `sms:${PHONE_TEL}?body=${encodeURIComponent(smsBody)}`;

  return (
    <section id="estimate" className="py-20 bg-ade-blue/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy mb-5 leading-tight">
                Get My Estimate.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Tell us what you need and we'll follow up with an estimate based on your home. A technician confirms your exact HVAC configuration on-site before any work begins.
              </p>
              <ul className="hidden md:block space-y-3">
                {[
                  "Estimate based on the details you provide",
                  "Technician verifies scope on arrival — no surprises",
                  "Additional work is explained and approved by you first",
                  "Call or text any time — we'll get back to you fast",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-navy/85">
                    <CheckCircle2 className="size-4 text-ade-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="size-10 rounded-xl bg-ade-blue/10 flex items-center justify-center">
                  <Calendar className="size-5 text-ade-blue" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">Get My Estimate</p>
                  <p className="text-xs text-muted-foreground">Air Duct Experts</p>
                </div>
              </div>

              <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-3">Select Service(s)</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {ESTIMATE_SERVICES.map((s) => {
                  const Icon = s.icon;
                  const active = selected.includes(s.key);
                  return (
                    <button key={s.key} onClick={() => toggle(s.key, selected, setSelected)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition text-left ${
                        active
                          ? "border-ade-blue bg-ade-blue/10 text-ade-blue"
                          : "border-gray-200 text-navy hover:border-ade-blue/50 hover:bg-ade-blue/5"
                      }`}>
                      <Icon className="size-4 shrink-0" />
                      <span className="leading-tight">{s.label}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-3">Add-Ons</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {ADD_ONS.map((a) => {
                  const active = addOns.includes(a.key);
                  return (
                    <button key={a.key} onClick={() => toggle(a.key, addOns, setAddOns)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                        active ? "border-ade-blue bg-ade-blue/10 text-ade-blue" : "border-gray-200 text-navy/70 hover:border-ade-blue/50"
                      }`}>
                      {a.label}
                    </button>
                  );
                })}
              </div>

              <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-2">Home ZIP Code</label>
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="e.g. 22191"
                maxLength={5}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-ade-blue"
              />

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-ade-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-2">Preferred Time</label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-ade-blue bg-white"
                  >
                    {TIME_WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <a href={smsHref}
                  className="w-full bg-ade-blue hover:opacity-90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-blue">
                  <MessageSquare className="size-4" /> Text to Request This Appointment
                </a>
                <a href={`tel:${PHONE_TEL}`}
                  className="w-full border border-gray-200 hover:border-ade-blue text-navy font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                  <Phone className="size-4" /> Call to Book — {PHONE}
                </a>
                <a href={mailtoHref}
                  className="w-full border border-gray-200 hover:border-ade-blue text-navy font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                  <Mail className="size-4" /> Email My Details
                </a>
              </div>

              <div className="mt-4 space-y-2">
                {["Request — not a guaranteed slot until confirmed", "17 Years of Industry Experience", "Residential, DMV-wide"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-navy/60">
                    <CheckCircle2 className="size-3.5 text-ade-blue shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="text-center max-w-3xl mx-auto mb-14">
        {kicker && <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">{kicker}</p>}
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy mb-4">{title}</h2>
        {sub && <p className="text-lg text-muted-foreground leading-relaxed">{sub}</p>}
      </div>
    </Reveal>
  );
}

function WhoItsFor() {
  const concerns = [
    "Dust throughout the house", "Allergies & indoor air quality", "Pet hair & dander odors",
    "Recently bought or moved in", "Home renovation dust", "Dryer taking longer to dry clothes",
    "Dirty carpets or pet stains", "Musty or unexplained odors",
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="Who We Serve" title="Built for DMV Homeowners"
          sub="Air Duct Experts is focused on residential customers — with additional support for property managers, realtors and small commercial properties." />
        <div className="grid lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2">
            <div className="h-full bg-secondary/40 rounded-2xl border-t-4 border-ade-blue p-8">
              <div className="flex items-center gap-3 mb-5">
                <Home className="size-9 text-ade-blue" />
                <div>
                  <h3 className="font-display text-2xl font-semibold text-navy">Residential Homeowners</h3>
                  <p className="text-sm text-muted-foreground italic">Our primary focus, every single day.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {concerns.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-navy/85">
                    <CheckCircle2 className="size-4 text-ade-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full bg-navy rounded-2xl p-8 text-white">
              <Building2 className="size-9 text-amber mb-5" />
              <h3 className="font-display text-xl font-semibold mb-1">Property Managers & Realtors</h3>
              <p className="text-sm text-white/60 italic mb-5">Move-in/move-out cleanings & listings.</p>
              <ul className="space-y-2.5">
                {["Apartment community turnovers", "Pre-listing & pre-purchase cleanings", "Small commercial properties", "Flexible scheduling around vacancies"].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/80">
                    <CheckCircle2 className="size-4 text-amber shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const groups = [
    { icon: Wind, title: "Air Duct Cleaning", slug: "air-duct-cleaning", href: "/services/air-duct-cleaning", body: "Complete HVAC system cleaning — supply, return, blower, coil and air handler. Not just the vents." },
    { icon: Flame, title: "Dryer Vent Cleaning", slug: "dryer-vent-cleaning", href: "/services/dryer-vent-cleaning", body: "Standalone service or bundled with a duct cleaning. Reduces fire risk and dry times." },
    { icon: Sparkles, title: "Carpet Cleaning", slug: "carpet-cleaning", href: "/services/carpet-cleaning", body: "Whole-home, individual rooms, stairs and area rugs — plus pet stain & odor treatment." },
    { icon: Sofa, title: "Upholstery Cleaning", slug: "upholstery-cleaning", href: "/services/upholstery-cleaning", body: "Sofas, chairs and other upholstered furniture, cleaned by the same trusted team." },
    { icon: ShieldCheck, title: "Indoor Air Quality", slug: "indoor-air-quality", href: "/services/indoor-air-quality", body: "HVAC sanitizing, antimicrobial treatment and deodorizing where applicable." },
  ];
  return (
    <section id="services" className="py-24 bg-ade-blue/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="What We Do" title="Home Cleaning Services, Done Thoroughly"
          sub="Professional, local, transparent — every service comes with a clear explanation of what's included." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, i) => {
            const accent = SERVICE_ACCENT[g.slug] as ServiceAccent;
            return (
              <Reveal key={g.title} delay={(i % 3) * 80}>
                <a href={g.href} className={`group h-full flex flex-col p-7 rounded-2xl border border-border transition bg-white hover:shadow-luxe ${accentHoverBorder(accent)}`}>
                  <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${accentIconBg(accent)}`}>
                    <g.icon className={`size-6 ${accentText(accent)}`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.body}</p>
                  <span className={`mt-auto text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all ${accentText(accent)}`}>
                    Learn more <ArrowRight className="size-3.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Get Your Estimate", body: "Tell us about your home and the services you want. We'll follow up with an estimate based on what you share." },
    { n: "02", title: "We Confirm On-Site", body: "Your technician verifies the actual HVAC configuration and scope when they arrive — any changes are explained and approved by you first." },
    { n: "03", title: "Complete System Clean", body: "We clean the full system, not just the vents — and walk you through exactly what was done." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="How It Works" title="From Estimate to Clean System in 3 Steps" />
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-ade-blue/20 via-ade-blue to-ade-blue/20" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="relative bg-secondary/40 rounded-2xl p-8 border border-border text-center">
                <div className="size-20 mx-auto rounded-full bg-white border-2 border-ade-blue flex items-center justify-center font-display text-2xl font-bold text-ade-blue mb-5 relative z-10 shadow-sm">
                  {s.n}
                </div>
                <h3 className="font-display text-xl font-semibold text-navy mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const jobs = ["Air Duct Cleaning", "Dryer Vent Cleaning", "Carpet Cleaning"];
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <Reveal>
          <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Before &amp; After</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-5">See the Difference We Make</h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            Drag the slider — these are placeholders until real job photos are ready, but this is exactly how each comparison will work once they are.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <Reveal key={job} delay={i * 80}>
              <BeforeAfterSlider title={job} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function YouTubeSection() {
  const videos = [
    "What's Really Behind Your Vent Cover",
    "A Real Duct Cleaning, Start to Finish",
    "Dryer Vent Fire Risks, Explained",
  ];
  return (
    <section className="py-24 bg-ade-blue/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="See It Yourself" title="Watch Our Videos"
          sub="Real technician, real equipment, real homes — no polished corporate ads. Our video library is in production; here's what's coming." />
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {videos.map((title, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="rounded-2xl overflow-hidden border border-border bg-secondary/40">
                <div className="aspect-video bg-navy flex items-center justify-center">
                  <div className="size-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <Youtube className="size-6 text-white/60" />
                  </div>
                </div>
                <p className="p-4 text-sm font-medium text-navy">{title}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center mt-10">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 bg-secondary/60 border border-border rounded-full px-5 py-2.5">
              <Clock className="size-4 text-ade-blue" /> YouTube channel launching soon
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewsComingSoon() {
  return (
    <section className="py-24 bg-ade-blue/5">
      <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <Reveal>
          <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Google Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy mb-5">We're Just Getting Started in the DMV</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Air Duct Experts is a new local business built on 17 years of hands-on industry experience. We haven't collected Google reviews yet — but every completed job earns one, honestly. Check back soon to see what your neighbors are saying.
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-navy/70 bg-white border border-border rounded-full px-5 py-2.5">
            <Clock className="size-4 text-ade-blue" /> Reviews launching as jobs are completed
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceArea() {
  const priority = ["Woodbridge", "Dale City", "Lake Ridge", "Manassas", "Lorton", "Springfield", "Fairfax", "Burke", "Alexandria", "Arlington", "Falls Church", "Stafford"];
  return (
    <section id="area" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="Service Area — DMV" title="Proudly Serving Washington DC, Maryland & Northern Virginia"
          sub="Headquartered in Woodbridge, VA — covering Prince William, Fairfax County and beyond." />
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {priority.map((a) => (
              <span key={a} className="bg-secondary/60 border border-border hover:border-ade-blue px-5 py-2.5 rounded-full text-sm font-medium text-navy flex items-center gap-2 transition hover:shadow-sm">
                <MapPin className="size-4 text-ade-blue" /> {a}, VA
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="book" className="bg-navy-soft py-24 relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-ade-blue/20 via-ade-blue/5 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-white mb-5 leading-tight">
            Ready for a System That's <span className="text-ade-blue">Actually Clean?</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get your estimate or call Air Duct Experts directly — serving homeowners across the DMV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#estimate" className="bg-ade-blue text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition animate-float">
              <Calendar className="size-5" /> Get My Estimate
            </a>
            <a href={`tel:${PHONE_TEL}`} className="pulse-ring relative bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
              <Phone className="size-5" />
              <span>{PHONE}</span>
            </a>
          </div>
          <div className="text-white/80 space-y-1">
            <p><a href={`mailto:${EMAIL}`} className="hover:text-ade-blue inline-flex items-center gap-2"><Mail className="size-4" /> {EMAIL}</a></p>
            <p className="text-white/50 text-sm">Woodbridge, VA · Serving Washington DC, Maryland &amp; Northern Virginia</p>
          </div>
          <p className="text-white/50 text-sm mt-6">17 Years of Industry Experience. Professional. Local. Transparent.</p>
        </Reveal>
      </div>
    </section>
  );
}
