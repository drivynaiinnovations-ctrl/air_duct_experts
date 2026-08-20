/**
 * Placeholder ADE mark: "AD" badge + three curved airflow lines standing in for
 * the "E". Swap for the final vector logo once brand identity work is done.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="var(--navy)" />
      <text
        x="6"
        y="27"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight="800"
        fontSize="17"
        fill="white"
        letterSpacing="-0.5"
      >
        AD
      </text>
      <g stroke="var(--ade-blue)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M27 13 C34 13 34 13 34 13" />
        <path d="M27 20 C36 20 36 20 36 20" />
        <path d="M27 27 C34 27 34 27 34 27" />
      </g>
      <path d="M33.5 11.5 L36 13 L33.5 14.5" stroke="var(--ade-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M35.5 18.5 L38 20 L35.5 21.5" stroke="var(--ade-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M33.5 25.5 L36 27 L33.5 28.5" stroke="var(--ade-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const textColor = variant === "dark" ? "text-white" : "text-navy";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className={`font-display leading-tight ${textColor}`}>
        <span className="block text-lg font-bold tracking-tight">Air Duct Experts</span>
        <span className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-ade-blue -mt-0.5">Complete HVAC Cleaning</span>
      </span>
    </div>
  );
}
