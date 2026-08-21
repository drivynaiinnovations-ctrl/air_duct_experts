import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const CANONICAL_HOST = "getairductexperts.com";

function wwwRedirectResponse(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.hostname !== `www.${CANONICAL_HOST}`) return null;
  url.hostname = CANONICAL_HOST;
  return Response.redirect(url.toString(), 301);
}

const TEAM_AUTH_REALM = "Air Duct Experts Team";
const TEAM_AUTH_USER = "marcus";

function unauthorizedResponse(): Response {
  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${TEAM_AUTH_REALM}"` },
  });
}

// Gates /team* behind HTTP Basic Auth at the edge, before the page ever renders.
function teamAuthResponse(request: Request, env: unknown): Response | null {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/team")) return null;

  const expectedPassword = (env as { TEAM_PASSWORD?: string } | undefined)?.TEAM_PASSWORD;
  if (!expectedPassword) return unauthorizedResponse();

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return unauthorizedResponse();

  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6));
  } catch {
    return unauthorizedResponse();
  }

  const separatorIndex = decoded.indexOf(":");
  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);
  if (user !== TEAM_AUTH_USER || pass !== expectedPassword) return unauthorizedResponse();

  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = wwwRedirectResponse(request);
      if (redirect) return redirect;

      const authRequired = teamAuthResponse(request, env);
      if (authRequired) return authRequired;

      const cf = (request as unknown as { cf?: { city?: string; regionCode?: string } }).cf;
      let handlerRequest = request;
      if (cf?.city) {
        const headers = new Headers(request.headers);
        headers.set("x-cf-city", cf.city);
        if (cf.regionCode) headers.set("x-cf-region", cf.regionCode);
        handlerRequest = new Request(request, { headers });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(handlerRequest, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
