import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, Phone } from "lucide-react";

const DWELL_MS = 3000;
const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";

type Slide = { src: string; headline: string; label: string };

const slides: Slide[] = [
  { src: "/videos/hero-dust.mp4", headline: "Is That Dust... or Something Worse?", label: "Dust" },
  { src: "/videos/hero-dirtyvent.mp4", headline: "This Is What's Behind Your Vent Cover.", label: "Dirty vents" },
  { src: "/videos/hero-allergies.mp4", headline: "Your Allergies Aren't Random.", label: "Allergies" },
  { src: "/videos/hero-pet.mp4", headline: "Pet Hair Doesn't Stay on the Couch.", label: "Pet dander" },
  { src: "/videos/hero-odor.mp4", headline: "That Smell When the AC Kicks On?", label: "Odor" },
  { src: "/videos/hero-dryer.mp4", headline: "Your Dryer Shouldn't Take Two Cycles.", label: "Dryer vent" },
  { src: "/videos/hero-newhome.mp4", headline: "New House. Old Dust.", label: "New home" },
  { src: "/videos/hero-smoke.mp4", headline: "Smoke Doesn't Leave When the Guest Does.", label: "Smoke" },
];

// The main pain point — leads on mobile as a single static headline (no
// video/carousel), matching the EPR mobile hero's clean, lightweight panel.
const MAIN_PAIN_POINT = slides[0];

function MobileHero() {
  return (
    <section className="md:hidden bg-navy px-5 py-10 flex flex-col gap-5">
      <div>
        <p className="text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          DC · Maryland · Northern Virginia
        </p>
        <h1 className="font-display font-black text-white leading-[1.05] mb-4" style={{ fontSize: "min(11vw, 3.2rem)" }}>
          {MAIN_PAIN_POINT.headline}
        </h1>
        <p className="text-white/70 text-base leading-relaxed">
          Professional residential air duct and dryer vent cleaning — clear answers, no scare tactics.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <a href="#estimate"
          className="bg-ade-blue text-white font-semibold px-6 py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition">
          <Calendar className="size-5" /> Get My Estimate
        </a>
        <a href={`tel:${PHONE_TEL}`}
          className="border-2 border-white/30 text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:border-ade-blue hover:text-ade-blue transition">
          <Phone className="size-5" /> Call to Book — {PHONE}
        </a>
      </div>
    </section>
  );
}

function DesktopSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(index + 1), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  return (
    <section
      className="hidden md:block relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setPaused(false);
        if (start === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
      }}
      aria-roledescription="carousel"
      aria-label="Common air duct problems"
    >
      {slides.map((slide, i) => (
        <video
          key={slide.src}
          src={slide.src}
          autoPlay
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />

      <div className="relative flex h-full items-end">
        <div className="w-full max-w-6xl px-6 pb-16 sm:px-10 sm:pb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-ade-blue/40 bg-ade-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ade-blue">
              DC · Maryland · Northern Virginia
            </span>
            {/* Not an <h1> — the page's single H1 lives in the mobile hero
                (what Google's mobile-first indexing actually renders). */}
            <p
              key={index}
              className="mt-5 animate-hero-in font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl"
            >
              {slides[index]?.headline}
            </p>
            <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              Professional residential air duct and dryer vent cleaning — clear answers, no scare tactics.
            </p>
            <a
              href="#estimate"
              className="mt-7 inline-flex items-center justify-center rounded-md bg-ade-blue px-6 py-3 text-base font-semibold text-white shadow-blue transition-colors hover:opacity-90"
            >
              Get My Estimate
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-8 sm:right-10">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => go(i)}
            aria-label={`Show slide: ${slide.label}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-ade-blue" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function HeroSlider() {
  return (
    <>
      <MobileHero />
      <DesktopSlider />
    </>
  );
}
