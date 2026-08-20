/**
 * Per-service accent color, shared by the header nav, homepage service grid,
 * and service detail pages so each service reads consistently everywhere —
 * without turning the whole site into a rainbow. ADE Blue stays the primary
 * brand color; teal and amber are supporting accents used sparingly.
 */
export type ServiceAccent = "blue" | "teal" | "amber";

export const SERVICE_ACCENT: Record<string, ServiceAccent> = {
  "air-duct-cleaning": "blue",
  "dryer-vent-cleaning": "amber",
  "carpet-cleaning": "teal",
  "upholstery-cleaning": "teal",
  "indoor-air-quality": "blue",
};

const ICON_BG: Record<ServiceAccent, string> = {
  blue: "bg-ade-blue/10",
  teal: "bg-teal/10",
  amber: "bg-amber/15",
};

const ICON_TEXT: Record<ServiceAccent, string> = {
  blue: "text-ade-blue",
  teal: "text-teal",
  amber: "text-amber",
};

const BORDER: Record<ServiceAccent, string> = {
  blue: "border-ade-blue",
  teal: "border-teal",
  amber: "border-amber",
};

// Full literal class strings (not string-concatenated) so Tailwind's
// content scanner can find them as static tokens in this file.
const HOVER_TEXT: Record<ServiceAccent, string> = {
  blue: "hover:text-ade-blue",
  teal: "hover:text-teal",
  amber: "hover:text-amber",
};

const HOVER_BORDER: Record<ServiceAccent, string> = {
  blue: "hover:border-ade-blue/50",
  teal: "hover:border-teal/50",
  amber: "hover:border-amber/50",
};

export function accentIconBg(accent: ServiceAccent): string {
  return ICON_BG[accent];
}

export function accentText(accent: ServiceAccent): string {
  return ICON_TEXT[accent];
}

export function accentBorder(accent: ServiceAccent): string {
  return BORDER[accent];
}

export function accentHoverText(accent: ServiceAccent): string {
  return HOVER_TEXT[accent];
}

export function accentHoverBorder(accent: ServiceAccent): string {
  return HOVER_BORDER[accent];
}
