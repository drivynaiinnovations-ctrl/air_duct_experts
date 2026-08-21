// Minimal ambient declaration for the Cloudflare Workers built-in module.
// We only use `env` (for the EMAIL binding); avoids pulling in the full
// @cloudflare/workers-types package for one import.
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
