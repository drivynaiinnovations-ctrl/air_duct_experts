import { useCallback, useRef, useState } from "react";
import { Camera, MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  title: string;
  beforeSrc?: string;
  afterSrc?: string;
}

/**
 * Drag/swipe comparison slider. With no beforeSrc/afterSrc supplied it shows
 * a clearly-labeled placeholder panel instead of a fake stock photo — swap in
 * real job photos by passing beforeSrc/afterSrc once they exist.
 */
export function BeforeAfterSlider({ title, beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const [pct, setPct] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(96, Math.max(4, next)));
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border select-none touch-none"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* After (full width, base layer) */}
      <div className="absolute inset-0">
        {afterSrc ? (
          <img src={afterSrc} alt={`${title} — after`} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-navy flex flex-col items-center justify-center gap-2">
            <Camera className="size-8 text-ade-blue/50" />
            <span className="text-white/50 text-xs font-medium">After photo coming soon</span>
          </div>
        )}
        <span className="absolute top-3 right-3 bg-ade-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          After
        </span>
      </div>

      {/* Before (clipped to pct, overlays on top) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {beforeSrc ? (
          <img src={beforeSrc} alt={`${title} — before`} className="h-full object-cover" style={{ width: trackRef.current?.clientWidth ?? "100%" }} />
        ) : (
          <div className="h-full bg-secondary flex flex-col items-center justify-center gap-2" style={{ width: trackRef.current?.clientWidth ?? "100vw" }}>
            <Camera className="size-8 text-navy/30" />
            <span className="text-navy/50 text-xs font-medium">Before photo coming soon</span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-white text-navy text-xs font-semibold px-2.5 py-1 rounded-full border border-border">
          Before
        </span>
      </div>

      {/* Divider handle */}
      <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pct}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white/80" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-9 rounded-full bg-white shadow-luxe flex items-center justify-center">
          <MoveHorizontal className="size-4 text-navy" />
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-navy/80 text-white text-xs font-medium px-3 py-1 rounded-full">
        {title}
      </div>
    </div>
  );
}
