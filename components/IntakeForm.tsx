"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Copy, Loader2 } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full border-0 border-b border-zinc-300 bg-transparent py-2 text-base text-black placeholder:text-zinc-400 focus:border-black focus:outline-none transition-colors";

// RFC 5322-ish, good enough to catch typos without rejecting valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export default function IntakeForm({
  subjectPrefix = "Project Inquiry",
  submitLabel = "Send Request",
}: {
  subjectPrefix?: string;
  submitLabel?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — left blank by humans
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCopied(false);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!details.trim()) {
      setError("Please add a few details about your project.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          business: business.trim(),
          details: details.trim(),
          subjectPrefix,
          website, // honeypot field
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError(
          data?.error ?? "Couldn't send your message. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setBusiness("");
      setDetails("");
    } catch {
      setError(
        "Couldn't reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  }

  async function handleCopyFallback() {
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business Name: ${business || "—"}`,
      "",
      "Project Details:",
      details,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard API unavailable — the mailto link below still works.
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-2 border border-black/10 bg-zinc-50 p-6">
        <p className="text-base font-medium text-black">Message sent.</p>
        <p className="text-sm text-zinc-500">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot field, hidden from real users via CSS (not display:none,
          which some bots skip when deciding what to fill). */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name">
          <input
            type="text"
            required
            maxLength={200}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            required
            maxLength={320}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field label="Business Name">
        <input
          type="text"
          maxLength={200}
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          className={inputClasses}
          placeholder="Your business name"
        />
      </Field>

      <Field label="Project Details">
        <textarea
          required
          rows={5}
          maxLength={5000}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us about your business and what you need built."
        />
      </Field>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 border border-black bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              {submitLabel}
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {error && (
          <div className="space-y-2 border border-red-200 bg-red-50 p-4 text-xs text-red-700" role="alert">
            <p>{error}</p>
            {status === "error" && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyFallback}
                  className="inline-flex items-center gap-1.5 border border-red-300 bg-white px-3 py-1.5 font-medium text-red-700 transition-colors hover:border-red-500"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy message"}
                </button>
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  or email {CONTACT_EMAIL} directly
                </a>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-zinc-500">
          Sends directly to our team at {CONTACT_EMAIL}.
        </p>
      </div>
    </form>
  );
}
