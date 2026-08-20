import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, ChevronDown, Wind, DollarSign, CalendarClock, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ | Air Duct Experts — Complete HVAC System Cleaning in the DMV" },
      { name: "description", content: "Answers on what complete HVAC system cleaning includes, how estimates work, and what to expect from Air Duct Experts in Washington DC, Maryland & Northern Virginia." },
      { property: "og:title", content: "FAQ | Air Duct Experts" },
      { property: "og:description", content: "What complete HVAC system cleaning means, how pricing works, and what to expect when you book." },
      { property: "og:url", content: "https://getairductexperts.com/faq" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://getairductexperts.com/faq" },
    ],
  }),
});

interface FaqItem { q: string; a: string }
interface FaqSection { id: string; label: string; icon: React.ElementType; items: FaqItem[] }

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "complete-cleaning",
    label: "What Complete Cleaning Means",
    icon: Wind,
    items: [
      {
        q: "What does complete HVAC system cleaning actually mean?",
        a: "It means cleaning the entire path air travels through your home — supply ducts, return ducts, registers and grilles, main trunk lines, the blower compartment and motor, the evaporator coil, and the air handler or furnace cabinet. Not just the vent openings you can see in each room.",
      },
      {
        q: "Why isn't cleaning only the vents enough?",
        a: "The vents you see are only the very end of the system. Dust, allergens, pet dander and debris build up throughout the ductwork and inside the blower and coil — areas a quick vent-only cleaning never touches. If those areas aren't cleaned, air continues circulating through a dirty system.",
      },
      {
        q: "What should be included in professional air duct cleaning?",
        a: "At minimum: supply and return ducts, registers and grilles, and the main trunk line. A truly complete cleaning also includes the blower compartment, blower motor or wheel, evaporator coil, and the air handler or furnace cabinet — plus sanitizing or deodorizing where your technician recommends it.",
      },
      {
        q: "What questions should I ask before hiring a duct cleaning company?",
        a: "Ask exactly what's included — does the price cover the blower, coil and air handler, or only the visible vents? Ask whether the estimate is final or subject to on-site verification. Ask what happens if the technician recommends additional work. A company that can't answer clearly is worth a second look.",
      },
      {
        q: "What does a $199 duct-cleaning advertisement actually include?",
        a: "Very often, a low flat-rate ad covers a limited number of vents and doesn't reach the blower, coil, or air handler — the parts of the system that do the most to recirculate dust. Some ads also add per-vent fees once a technician is in your home. We'd rather explain the full scope up front.",
      },
      {
        q: "How do you know your ducts need cleaning?",
        a: "Common signs include visible dust around vents or on furniture, a musty smell when the HVAC system runs, recent renovation or move-in dust, allergy symptoms that ease when you leave the house, or simply not knowing when — or if — the ducts were last cleaned.",
      },
    ],
  },
  {
    id: "other-services",
    label: "Dryer Vents & Other Services",
    icon: ShieldCheck,
    items: [
      {
        q: "How often should dryer vents be cleaned?",
        a: "Most homes benefit from an annual dryer vent cleaning. Longer vent runs, larger households, or noticeably longer drying times can mean it's needed more often.",
      },
      {
        q: "Can dirty ducts contribute to dust throughout your home?",
        a: "Yes. Air moving through a dirty duct system can pick up and redistribute dust and debris every time your HVAC system runs — one reason we clean the complete system, not just what's visible.",
      },
      {
        q: "Can I bundle carpet or upholstery cleaning with a duct cleaning visit?",
        a: "Yes — carpet cleaning, upholstery cleaning, and dryer vent cleaning can all be added to the same appointment as your HVAC system cleaning.",
      },
      {
        q: "Do you offer mold remediation?",
        a: "We do not advertise regulated mold-remediation services. If a technician notices something during a cleaning that looks like it goes beyond standard duct cleaning and sanitizing, we'll tell you honestly and recommend you consult a certified specialist.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Estimates",
    icon: DollarSign,
    items: [
      {
        q: "How much will this cost?",
        a: "It depends on your home size, number of HVAC systems, number of vents, and which additional services you'd like. Use the Get My Estimate form or call us — we'll give you an estimate based on what you share.",
      },
      {
        q: "Is the online estimate a final price?",
        a: "No. It's an estimate based on the information you provide. Your technician verifies the actual HVAC configuration and scope of work when they arrive at your home.",
      },
      {
        q: "What happens if the technician finds more work is needed once they're on-site?",
        a: "We explain what we found and why additional work is recommended, and get your approval before doing anything beyond the original estimate. You're never billed for extra work you didn't agree to.",
      },
      {
        q: "Why isn't Air Duct Experts the cheapest option in the DMV?",
        a: "Because we clean the complete system — not just the vents. We'd rather be clear about what's included and price it honestly than advertise a low number that doesn't cover the whole job.",
      },
    ],
  },
  {
    id: "booking",
    label: "Booking & Service Area",
    icon: CalendarClock,
    items: [
      {
        q: "How do I book an appointment?",
        a: "Call or text (571) 337-9306, or use the Get My Estimate form on our homepage. We'll follow up to confirm details and get you on the schedule.",
      },
      {
        q: "What areas does Air Duct Experts serve?",
        a: "We're headquartered in Woodbridge, VA and serve homeowners across Washington DC, Maryland and Northern Virginia — with priority coverage in Woodbridge, Dale City, Lake Ridge, Manassas, Lorton, Springfield, Fairfax, Burke, Alexandria, Arlington, Falls Church and Stafford.",
      },
      {
        q: "Do you work with property managers, realtors, or commercial properties?",
        a: "Yes. While our primary focus is residential homeowners, we also support property managers, apartment communities, realtors, and small commercial properties.",
      },
    ],
  },
];

const ALL_FAQ_ITEMS = FAQ_SECTIONS.flatMap((s) => s.items);

function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
      <div className="min-h-screen bg-background text-navy">
        <SiteHeader />

        <section className="bg-navy text-white py-20 px-5 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <ShieldCheck className="size-3.5" /> Straight Answers, No Upsells
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-6">
              Frequently Asked Questions<span className="text-ade-blue">.</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              What complete HVAC system cleaning actually means, how estimates work, and what to expect from Air Duct Experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#estimate"
                className="bg-ade-blue text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                Get My Estimate <ArrowRight className="size-4" />
              </a>
              <a href={`tel:${PHONE_TEL}`}
                className="border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        <div className="bg-white border-b border-border sticky top-16 z-30">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 flex gap-1 overflow-x-auto py-3">
            {FAQ_SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.id} href={`#${s.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-navy/70 hover:bg-ade-blue/10 hover:text-navy whitespace-nowrap transition">
                  <Icon className="size-4 text-ade-blue" /> {s.label}
                </a>
              );
            })}
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 space-y-16">
            {FAQ_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-ade-blue/10 flex items-center justify-center">
                      <Icon className="size-5 text-ade-blue" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-navy">{section.label}</h2>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item, i) => {
                      const key = `${section.id}-${i}`;
                      const isOpen = openItem === key;
                      return (
                        <div key={key} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenItem(isOpen ? null : key)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-navy hover:bg-secondary/40 transition"
                          >
                            <span className="pr-4">{item.q}</span>
                            <ChevronDown className={`size-4 text-ade-blue shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-20 bg-navy text-white text-center px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-semibold mb-4">Still Have a Question?</h2>
            <p className="text-white/70 mb-8 text-lg">Call or text us directly, or get an estimate online.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#estimate"
                className="bg-ade-blue text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                Get My Estimate
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
