import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, ChevronDown, ChevronUp, ArrowRight, Phone, List } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SERVICE_NAV, LOCATIONS_NAV } from "@/components/site/SiteHeader";
import { getPostBySlug, getRelatedPosts, type BlogBlock } from "@/lib/blogPosts";
import { accentIconBg, accentText } from "@/lib/serviceAccent";

const PHONE = "(571) 337-9306";
const PHONE_TEL = "5713379306";
const SITE_URL = "https://getairductexperts.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.slug) return {};
    const post = getPostBySlug(loaderData.slug);
    if (!post) return {};
    const canonical = `${SITE_URL}/blog/${post.slug}`;
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.description },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        { rel: "canonical", href: canonical },
      ],
    };
  },
  component: BlogPostPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function TocLink({ id, text }: { id: string; text: string }) {
  return (
    <a href={`#${id}`} className="block py-1.5 text-sm text-navy/70 hover:text-ade-blue transition">
      {text}
    </a>
  );
}

function Block({ block, accentClass }: { block: BlogBlock; accentClass: string }) {
  if (block.type === "h2") {
    return (
      <h2 id={block.id} className="font-display text-2xl md:text-3xl font-semibold text-navy mt-10 mb-4 scroll-mt-32">
        {block.text}
      </h2>
    );
  }
  if (block.type === "p") {
    return <p className="text-navy/80 leading-relaxed mb-5">{block.text}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul className="space-y-2.5 mb-6">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-navy/80 leading-relaxed">
            <span className={`mt-2 size-1.5 rounded-full shrink-0 ${accentClass.replace("text-", "bg-")}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  // cta
  return (
    <div className="my-8 rounded-2xl border border-border bg-secondary/40 p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <p className="text-navy font-medium">{block.text}</p>
      <a
        href={block.href}
        className="shrink-0 bg-ade-blue text-white font-semibold px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-blue transition"
      >
        {block.label} <ArrowRight className="size-4" />
      </a>
    </div>
  );
}

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

function BlogPostPage() {
  const { slug } = Route.useLoaderData();
  const post = getPostBySlug(slug)!;
  const related = getRelatedPosts(slug, 3);
  const accentClass = accentText(post.accent);
  const headings = post.body.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2");
  const canonical = `${SITE_URL}/blog/${post.slug}`;

  const relatedServiceLinks = SERVICE_NAV.filter((s) => post.relatedServices.includes(s.href.split("/").pop()!));
  const relatedLocationLinks = LOCATIONS_NAV.filter((l) => post.relatedLocations.includes(l.href.split("/").pop()!));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Marcus Hines" },
    publisher: {
      "@type": "Organization",
      name: "Air Duct Experts",
      url: SITE_URL,
    },
    mainEntityOfPage: canonical,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-navy">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <SiteHeader />

      <section className="bg-navy text-white py-16 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} className="mb-6" />
          <span className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold mb-5 ${accentIconBg(post.accent)} ${accentClass}`}>
            {post.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] mb-5">{post.title}</h1>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><Calendar className="size-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-4" /> {post.readMinutes} min read</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 grid lg:grid-cols-[220px_1fr] gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <List className="size-3.5" /> On This Page
              </p>
              <nav>
                {headings.map((h) => (
                  <TocLink key={h.id} id={h.id} text={h.text} />
                ))}
              </nav>
            </div>
          </aside>

          <article>
            <Reveal>
              <p className="text-lg text-navy/70 leading-relaxed mb-2 italic">{post.excerpt}</p>
            </Reveal>
            {post.body.map((block, i) => (
              <Block key={i} block={block} accentClass={accentClass} />
            ))}

            {(relatedServiceLinks.length > 0 || relatedLocationLinks.length > 0) && (
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-3">Related Reading</p>
                <div className="flex flex-wrap gap-2">
                  {relatedServiceLinks.map((s) => (
                    <Link key={s.href} to={s.href} className="inline-flex items-center gap-1.5 bg-secondary/60 hover:bg-secondary border border-border px-4 py-2 rounded-full text-sm font-medium text-navy transition">
                      <s.icon className={`size-3.5 ${accentText(s.accent)}`} /> {s.label}
                    </Link>
                  ))}
                  {relatedLocationLinks.map((l) => (
                    <Link key={l.href} to={l.href} className="inline-flex items-center gap-1.5 bg-secondary/60 hover:bg-secondary border border-border px-4 py-2 rounded-full text-sm font-medium text-navy transition">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-navy mb-5">Quick FAQ</h2>
                <div className="space-y-3">
                  {post.faq.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-secondary/40">
          <div className="max-w-6xl mx-auto px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-navy mb-8 text-center">More From the Blog</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group h-full flex flex-col rounded-2xl border border-border bg-white hover:shadow-luxe transition p-6"
                >
                  <span className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${accentIconBg(r.accent)} ${accentText(r.accent)}`}>
                    {r.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-navy mb-2 leading-snug">{r.title}</h3>
                  <span className={`mt-auto text-sm font-semibold flex items-center gap-1.5 ${accentText(r.accent)}`}>
                    Read the guide <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ade-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/75 mb-8">Get an estimate built around your home, or call directly.</p>
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

