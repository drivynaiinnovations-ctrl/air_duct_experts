import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

interface SendQuoteInput {
  to: string;
  customerName: string;
  subject: string;
  text: string;
}

interface EmailBinding {
  send(message: {
    to: string;
    from: { email: string; name?: string };
    replyTo?: { email: string; name?: string };
    subject: string;
    text: string;
    html?: string;
  }): Promise<unknown>;
}

export const sendQuoteEmail = createServerFn({ method: "POST" })
  .validator((data: SendQuoteInput) => data)
  .handler(async ({ data }) => {
    const binding = (env as unknown as { EMAIL?: EmailBinding }).EMAIL;

    if (!binding) {
      throw new Error("Email sending isn't configured yet — the domain still needs to be onboarded in the Cloudflare dashboard.");
    }

    const html = data.text
      .split("\n")
      .map((line) => (line ? `<p style="margin:0 0 8px">${line}</p>` : "<br/>"))
      .join("");

    await binding.send({
      to: data.to,
      from: { email: "quotes@getairductexperts.com", name: "Air Duct Experts" },
      replyTo: { email: "happy@getairductexperts.com", name: "Air Duct Experts" },
      subject: data.subject,
      text: data.text,
      html,
    });

    return { ok: true as const };
  });
