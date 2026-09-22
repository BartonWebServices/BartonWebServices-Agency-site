import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 200,
  email: 320,
  business: 200,
  subjectPrefix: 100,
  details: 5000,
} as const;

// Best-effort in-memory rate limit. Resets on cold start / per instance,
// so it's a spam speed bump, not a hard guarantee — fine for a low-traffic
// contact form with no database to back a real limiter.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// Strips control characters (incl. CR/LF) so a field can't smuggle extra
// headers into the outgoing email or corrupt the message layout.
function sanitizeLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\x00-\x1f\x7f]+/g, " ").trim();
}

function sanitizeBlock(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\x00-\x09\x0b\x0c\x0e-\x1f\x7f]+/g, "").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: a hidden field real users never fill in. Bots that
  // auto-fill every input will trip it.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = sanitizeLine(payload.name).slice(0, MAX_LENGTHS.name);
  const email = sanitizeLine(payload.email).slice(0, MAX_LENGTHS.email);
  const business = sanitizeLine(payload.business).slice(0, MAX_LENGTHS.business);
  const subjectPrefix = sanitizeLine(payload.subjectPrefix).slice(
    0,
    MAX_LENGTHS.subjectPrefix,
  ) || "Project Inquiry";
  const details = sanitizeBlock(payload.details).slice(0, MAX_LENGTHS.details);

  if (!name) {
    return Response.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!details) {
    return Response.json(
      { ok: false, error: "Please add a few details about your project." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json(
      { ok: false, error: "Email sending is not configured yet." },
      { status: 503 },
    );
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const toAddress = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;

  const subject = `${subjectPrefix} — ${name}`;
  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business Name: ${business || "—"}`,
    "",
    "Project Details:",
    details,
  ].join("\n");
  const htmlBody = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Business Name:</strong> ${escapeHtml(business || "—")}</p>`,
    `<p><strong>Project Details:</strong></p>`,
    `<p>${escapeHtml(details).replace(/\n/g, "<br />")}</p>`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Barton Web Services <${fromAddress}>`,
      to: [toAddress],
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { ok: false, error: "Couldn't send your message. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return Response.json(
      { ok: false, error: "Couldn't send your message. Please try again." },
      { status: 500 },
    );
  }
}
