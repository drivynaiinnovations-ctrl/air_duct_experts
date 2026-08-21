import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { HOME_SIZE_TIERS, ADD_ON_OPTIONS, HVAC_SERVICE_INCLUDES, type HomeSizeTier } from "@/lib/pricing";
import { sendQuoteEmail } from "@/lib/sendQuoteEmail";

export const Route = createFileRoute("/team")({
  component: TeamQuoteBuilder,
  head: () => ({
    meta: [
      { title: "Quote Builder — Air Duct Experts Team" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function TeamQuoteBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState<HomeSizeTier>("small");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});
  const [showSpecial, setShowSpecial] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sendError, setSendError] = useState("");

  const selectedTier = HOME_SIZE_TIERS.find((t) => t.key === tier)!;
  const isCustomTier = selectedTier.list === null;

  const toggleAddOn = (key: string) => {
    setAddOns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const lineItems = useMemo(() => {
    const items: { label: string; list: number | null; special: number | null; includes: string[]; custom?: boolean }[] = [];
    items.push({
      label: `Complete HVAC / Air Duct Cleaning — ${selectedTier.label}`,
      list: selectedTier.list,
      special: selectedTier.special,
      includes: HVAC_SERVICE_INCLUDES,
    });
    for (const key of addOns) {
      const opt = ADD_ON_OPTIONS.find((a) => a.key === key)!;
      if (opt.list !== null) {
        items.push({ label: opt.label, list: opt.list, special: opt.special, includes: opt.includes });
      } else {
        const amt = Number(customAmounts[key] || 0);
        items.push({ label: `${opt.label} (custom)`, list: amt, special: amt, includes: opt.includes, custom: true });
      }
    }
    return items;
  }, [selectedTier, addOns, customAmounts]);

  const fullTotal = lineItems.reduce((sum, it) => sum + (it.list ?? 0), 0);
  const specialTotal = lineItems.reduce((sum, it) => sum + (it.special ?? 0), 0);
  const activeTotal = showSpecial ? specialTotal : fullTotal;

  const quoteText = useMemo(() => {
    const serviceLines = lineItems.flatMap((it) => [
      `• ${it.label} — ${money(showSpecial ? (it.special ?? 0) : (it.list ?? 0))}`,
      ...it.includes.map((inc) => `    - ${inc}`),
    ]);
    const lines = [
      `Air Duct Experts — Quote for ${name || "[Customer Name]"}`,
      "",
      ...(isCustomTier
        ? ["Home size: X-Large / Multi-System — requires an on-site assessment before pricing. We'll reach out to schedule a walkthrough."]
        : serviceLines),
      ...(isCustomTier ? [] : ["", `Total: ${money(activeTotal)}${showSpecial ? " (special offer price)" : ""}`]),
      "",
      "This is an estimate. A technician confirms the exact scope on arrival, and any additional work is explained and approved by you first.",
      "",
      "— Air Duct Experts, Woodbridge, VA",
    ];
    return lines.join("\n");
  }, [name, lineItems, activeTotal, showSpecial, isCustomTier]);

  const copyQuote = async () => {
    await navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = async () => {
    if (!email) return;
    setSendState("sending");
    setSendError("");
    try {
      await sendQuoteEmail({
        data: {
          to: email,
          customerName: name,
          subject: "Your Air Duct Experts Quote",
          text: quoteText,
        },
      });
      setSendState("sent");
      setTimeout(() => setSendState("idle"), 4000);
    } catch (err) {
      setSendState("error");
      setSendError(err instanceof Error ? err.message : "Something went wrong sending this email.");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/40 py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Logo variant="light" />
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8 mb-6">
          <h1 className="font-display text-2xl font-semibold text-navy mb-1">Quote Builder</h1>
          <p className="text-sm text-muted-foreground mb-6">Internal tool — build and send a customer quote in under a minute.</p>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-ade-blue" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Customer email" type="email"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-ade-blue" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Customer phone" type="tel"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-ade-blue" />
          </div>

          <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-3">Home Size</p>
          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {HOME_SIZE_TIERS.map((t) => (
              <button key={t.key} onClick={() => setTier(t.key)}
                className={`text-left px-4 py-3 rounded-xl border transition ${
                  tier === t.key ? "border-ade-blue bg-ade-blue/10" : "border-gray-200 hover:border-ade-blue/50"
                }`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy text-sm">{t.label}</span>
                  <span className="text-sm font-bold text-ade-blue">{t.list ? money(t.special!) : "Custom"}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.ventRange}</span>
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-3">Add-Ons</p>
          <div className="flex flex-col gap-2 mb-6">
            {ADD_ON_OPTIONS.map((a) => {
              const active = addOns.includes(a.key);
              return (
                <div key={a.key} className={`rounded-xl border transition ${active ? "border-ade-blue bg-ade-blue/5" : "border-gray-200"}`}>
                  <button onClick={() => toggleAddOn(a.key)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                    <span className="text-sm font-medium text-navy">{a.label}</span>
                    <span className="text-sm text-muted-foreground">{a.list !== null ? `${money(a.special!)} / ${money(a.list)} list` : "custom amount"}</span>
                  </button>
                  {active && a.list === null && (
                    <div className="px-4 pb-3">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmounts[a.key] ?? ""}
                        onChange={(e) => setCustomAmounts((prev) => ({ ...prev, [a.key]: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ade-blue"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isCustomTier && (
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setShowSpecial(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${!showSpecial ? "bg-navy text-white" : "bg-secondary text-navy/60"}`}>
                Full Price
              </button>
              <button onClick={() => setShowSpecial(true)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${showSpecial ? "bg-ade-blue text-white" : "bg-secondary text-navy/60"}`}>
                Special Offer Price
              </button>
            </div>
          )}

          <div className="bg-navy rounded-2xl p-5 text-white mb-6">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-3">{isCustomTier ? "On-Site Assessment Required" : showSpecial ? "Special Offer — Full Scope Included" : "Full Price"}</p>
            {isCustomTier ? (
              <p className="text-sm text-white/80">X-Large / multi-system homes need a walkthrough before we can quote a price. Schedule an on-site visit with the customer.</p>
            ) : (
              <>
                <ul className="space-y-3 mb-4">
                  {lineItems.map((it) => (
                    <li key={it.label}>
                      <div className="flex justify-between text-sm text-white/90 font-medium">
                        <span>{it.label}</span>
                        <span>{money(showSpecial ? (it.special ?? 0) : (it.list ?? 0))}</span>
                      </div>
                      <ul className="mt-1 space-y-0.5">
                        {it.includes.map((inc) => (
                          <li key={inc} className="text-xs text-white/55 pl-3">– {inc}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-baseline border-t border-white/15 pt-3">
                  <span className="text-sm text-white/60">Total</span>
                  <span className="text-2xl font-bold">{money(activeTotal)}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={sendEmail}
              disabled={!email || sendState === "sending"}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                email ? "bg-ade-blue text-white hover:opacity-90" : "bg-gray-100 text-gray-400 pointer-events-none"
              }`}>
              {sendState === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
              {sendState === "sending" ? "Sending…" : sendState === "sent" ? "Sent!" : "Email Quote"}
            </button>
            <button onClick={copyQuote} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-navy hover:bg-secondary transition">
              {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy Quote Text"}
            </button>
          </div>
          {sendState === "error" && (
            <p className="mt-3 flex items-start gap-2 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0 mt-0.5" /> {sendError}
            </p>
          )}
          {!email && (
            <p className="mt-3 text-xs text-muted-foreground">Enter a customer email above to send.</p>
          )}
        </div>
      </div>
    </div>
  );
}
