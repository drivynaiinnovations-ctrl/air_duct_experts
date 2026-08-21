import { createFileRoute } from "@tanstack/react-router";
import { Phone, Calendar, ArrowRight, GraduationCap, Eye, Camera, Clock4, MapPin, Award } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Air Duct Experts | Woodbridge, VA — 17 Years of Industry Experience" },
      { name: "description", content: "Air Duct Experts was founded by Marcus Hines on 17 years of hands-on HVAC and duct-cleaning experience. Meet the team behind complete HVAC system cleaning in the DMV." },
      { property: "og:title", content: "About Air Duct Experts" },
      { property: "og:description", content: "17 years of industry experience, built into a local Woodbridge, VA company doing complete HVAC system cleaning the right way." },
      { property: "og:url", content: "https://getairductexperts.com/about" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://getairductexperts.com/about" },
    ],
  }),
});

const PILLARS = [
  { icon: GraduationCap, title: "Education", body: "We explain what complete HVAC system cleaning actually involves before you book — not after." },
  { icon: Eye, title: "Transparency", body: "Estimates are based on what you tell us, and your technician confirms the real scope before any work starts." },
  { icon: Camera, title: "Proof", body: "We're documenting real before-and-after results from every job — not stock photography." },
  { icon: Clock4, title: "Convenience", body: "Call, text, or request an appointment online — whatever's easiest for you." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-navy">
      <SiteHeader />

      <section className="bg-navy text-white py-20 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "About" }]} className="mb-6" />
          <span className="inline-flex items-center gap-2 text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            <Award className="size-3.5" /> About Air Duct Experts
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-6">
            Built on 17 Years of <span className="text-ade-blue">Doing This the Right Way.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            Air Duct Experts is a Woodbridge, VA-based HVAC and home-cleaning company, founded to give DMV homeowners something the $199 duct-cleaning ads don't: a clear explanation of what's actually being cleaned.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-[220px_1fr] gap-10 items-start">
          <Reveal>
            <div className="mx-auto md:mx-0 size-40 rounded-2xl bg-navy flex items-center justify-center shrink-0">
              <span className="font-display text-5xl font-bold text-white">MH</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Owner &amp; Founder</p>
              <h2 className="font-display text-3xl font-semibold text-navy mb-4">Marcus Hines</h2>
              <p className="text-navy/75 leading-relaxed mb-4">
                Marcus founded Air Duct Experts on 17 years of hands-on industry experience, after seeing too many homeowners sold a quick vent wipe and told it was a complete duct cleaning. Air Duct Experts was built around a simpler idea: explain exactly what a complete HVAC system cleaning involves — supply and return ducts, the blower, the coil, the air handler — and let homeowners decide with real information, not a guess.
              </p>
              <p className="text-navy/75 leading-relaxed mb-4">
                Based in Woodbridge, Air Duct Experts serves homeowners across Washington DC, Maryland and Northern Virginia, with a focus on residential work and a growing presence with property managers and realtors across the DMV.
              </p>
              <p className="text-navy/75 leading-relaxed">
                The goal isn't to be the cheapest duct-cleaning company in the DMV — it's to build enough trust, one honest estimate and one clean system at a time, that homeowners recommend Air Duct Experts to their neighbors.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-ade-blue/5">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">How We Do Business</p>
              <h2 className="font-display text-4xl font-semibold text-navy">Four Things We Won't Compromise On</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full bg-white rounded-2xl border border-border p-7 text-center">
                  <div className="size-12 rounded-xl bg-ade-blue/10 flex items-center justify-center mx-auto mb-4">
                    <p.icon className="size-6 text-ade-blue" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Homeowners Call Us</p>
              <h2 className="font-display text-4xl font-semibold text-navy">The Air Duct Experts Standard</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: "17 Years of Industry Experience" },
              { icon: MapPin, label: "Locally Owned — Woodbridge, VA" },
              { icon: Eye, label: "Transparent, Upfront Estimates" },
              { icon: Camera, label: "Real Before &amp; After Documentation" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-secondary/40">
                <item.icon className="size-7 text-ade-blue" />
                <span className="text-sm font-medium text-navy" dangerouslySetInnerHTML={{ __html: item.label }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-soft py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ade-blue/20 via-ade-blue/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
              Ready to Meet the Team <span className="text-ade-blue">in Person?</span>
            </h2>
            <p className="text-white/75 text-lg mb-8">Get your estimate or call directly — Air Duct Experts is ready for your home.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#estimate" className="bg-ade-blue text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition">
                <Calendar className="size-5" /> Get My Estimate <ArrowRight className="size-4" />
              </a>
              <a href={`tel:${PHONE_TEL}`} className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
