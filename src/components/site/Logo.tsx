import logoFull from "@/assets/logo-full.png";

export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const taglineColor = variant === "dark" ? "text-white/50" : "text-navy/50";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logoFull} alt="Air Duct Experts" className="h-9 w-auto shrink-0" />
      <span className={`hidden sm:block text-[10px] font-semibold tracking-[0.18em] uppercase ${taglineColor}`}>
        Complete HVAC Cleaning
      </span>
    </div>
  );
}
