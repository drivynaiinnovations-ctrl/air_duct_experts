import { Phone, MessageSquare, Calendar } from "lucide-react";

const PHONE_TEL = "5713379306";

/**
 * Sticky bottom action bar, mobile only. Real, functional friction reduction —
 * one tap to call, text, or jump to the estimate form. No backend required.
 */
export function MobileActionBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border grid grid-cols-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={`tel:${PHONE_TEL}`} className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-navy active:bg-secondary">
        <Phone className="size-5 text-ade-blue" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a href={`sms:${PHONE_TEL}`} className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-navy border-x border-border active:bg-secondary">
        <MessageSquare className="size-5 text-ade-blue" />
        <span className="text-[11px] font-medium">Text</span>
      </a>
      <a href="/#estimate" className="flex flex-col items-center justify-center gap-0.5 py-2.5 bg-ade-blue text-white active:opacity-90">
        <Calendar className="size-5" />
        <span className="text-[11px] font-medium">Estimate</span>
      </a>
    </div>
  );
}
