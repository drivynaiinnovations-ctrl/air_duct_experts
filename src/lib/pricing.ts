/**
 * Home-size tier pricing for Complete HVAC / Air Duct Cleaning.
 *
 * "special" is the real floor Marcus set directly (never discount below it).
 * "list" is set so that a 15%-off promo lands at or just above the floor:
 * list = special / 0.85, rounded up to a clean marketing number.
 *
 * Tier boundaries are vent-count based (not sq ft) — a 1,500 sq ft home can
 * have 24 vents, so square footage alone is a bad predictor of job size.
 */
export type HomeSizeTier = "small" | "medium" | "large" | "xlarge";

export interface HomeSizeOption {
  key: HomeSizeTier;
  label: string;
  ventRange: string;
  list: number | null; // null = no flat price, on-site assessment only
  special: number | null;
}

export const HOME_SIZE_TIERS: HomeSizeOption[] = [
  { key: "small", label: "Small Home", ventRange: "Up to ~10 vents, 1 system", list: 419, special: 350 },
  { key: "medium", label: "Medium Home", ventRange: "~11–19 vents, 1 system", list: 535, special: 450 },
  { key: "large", label: "Large Home", ventRange: "~20–29 vents, usually 1 system", list: 709, special: 600 },
  { key: "xlarge", label: "X-Large / Multi-System", ventRange: "30+ vents or 2 systems — Marcus assesses on-site", list: null, special: null },
];

export interface AddOnOption {
  key: string;
  label: string;
  list: number | null; // null = enter custom amount at time of quote
  special: number | null;
}

export const ADD_ON_OPTIONS: AddOnOption[] = [
  { key: "dryer-vent", label: "Dryer Vent Cleaning", list: 229, special: 195 },
  { key: "carpet", label: "Carpet Cleaning", list: null, special: null },
  { key: "upholstery", label: "Upholstery Cleaning", list: null, special: null },
  { key: "sanitizing", label: "HVAC Sanitizing / Deodorizing", list: null, special: null },
];
