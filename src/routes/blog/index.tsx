import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { accentIconBg, accentText } from "@/lib/serviceAccent";

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
  head: () => ({
    meta: [
      { title: "Blog | Air Duct Experts — HVAC & Home Cleaning Guides for the DMV" },
      { name: "description", content: "Straightforward guides on complete HVAC system cleaning, dryer vents, carpets and indoor air quality — written for DMV homeowners, not search engines." },
      { property: "og:title", content: "Air Duct Experts Blog" },
      { property: "og:description", content: "Educational guides on HVAC and duct cleaning, dryer vents, carpets and indoor air quality for Washington DC, Maryland & Northern Virginia homeowners." },
      { property: "og:url", content: "https://getairductexperts.com/blog" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://getairductexperts.com/blog" },
    ],
  }),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-background text-navy">
      <SiteHeader />

      <section className="bg-navy text-white py-20 px-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Blog" }]} className="mb-6" />
          <span className="inline-flex items-center gap-2 text-ade-blue text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Guides &amp; Education
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-6">
            The Air Duct Experts Blog
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            Straightforward answers on HVAC system cleaning, dryer vents, carpets and indoor air quality — written to help DMV homeowners understand what they're buying, not to rank for keywords.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group h-full flex flex-col rounded-2xl border border-border bg-white hover:shadow-luxe transition p-6"
                >
                  <span className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${accentIconBg(post.accent)} ${accentText(post.accent)}`}>
                    {post.category}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy mb-2 leading-snug">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-navy/50 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3.5" /> {post.readMinutes} min read</span>
                  </div>
                  <span className={`text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all ${accentText(post.accent)}`}>
                    Read the guide <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ade-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">Have a Question We Haven't Covered?</h2>
          <p className="text-white/75 mb-8">Call, text, or check our FAQ — we're happy to walk through it.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#estimate" className="bg-ade-blue text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition">
              Get My Estimate
            </a>
            <a href={`tel:${PHONE_TEL}`} className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white hover:text-navy transition">
              <Phone className="size-5" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
