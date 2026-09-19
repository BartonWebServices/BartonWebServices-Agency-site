"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const subject = `${subjectPrefix} — ${name || "New Inquiry"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business Name: ${business || "—"}`,
      "",
      "Project Details:",
      details,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name">
          <input
            type="text"
            required
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
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us about your business and what you need built."
        />
      </Field>

      <div className="space-y-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 border border-black bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-black"
        >
          {submitLabel}
          <ArrowRight size={16} />
        </button>
        <p className="text-xs text-zinc-500">
          Submitting opens your email client with these details prefilled,
          addressed to {CONTACT_EMAIL}.
        </p>
      </div>
    </form>
  );
}
