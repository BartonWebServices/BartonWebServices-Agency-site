import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy & Security",
  description:
    "How Barton Web Services handles data, security, and liability across the sites we build and maintain.",
};

const sections = [
  {
    heading: "Overview",
    body: "This policy explains how Barton Web Services handles information submitted through this site, and how security is approached across the sites we build and maintain.",
  },
  {
    heading: "Information We Collect",
    body: "The only information collected through this site is what you choose to submit through the quote or contact forms: name, email address, business name, and project details. This site does not use tracking cookies, analytics scripts, or any other third-party tracking.",
  },
  {
    heading: "How Form Submissions Work",
    body: "Quote and contact forms on this site do not store your information on a server or in a database. Submitting a form opens your own email client with your details prefilled, addressed directly to us. Your information is sent through your email provider, not through Barton Web Services infrastructure.",
  },
  {
    heading: "How We Use Information",
    body: "Any information you send us is used solely to respond to your inquiry and, where relevant, to scope and deliver your project. It is not sold, shared, or used for any other purpose.",
  },
  {
    heading: "Security",
    body: "Security is a top priority. Every site we deploy enforces full HTTPS encryption, and all projects run on modern Next.js and Vercel hosting infrastructure. We do not rely on third-party databases or backend platforms to store client site data.",
  },
  {
    heading: "Third-Party Services & Liability",
    body: "While we prioritize data protection and follow industry-standard security practices, no system is completely immune to risk. Barton Web Services assumes no liability for data loss, downtime, or security breaches caused by external services, third parties, or factors outside our direct control.",
  },
  {
    heading: "Changes to This Policy",
    body: "This policy may be updated from time to time to reflect changes to how this site operates. The date below reflects the most recent update.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} strokeWidth={1.5} />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              Privacy &amp; Security
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-3 text-sm text-zinc-500">
            Last updated: 19 September 2026
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 40}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <p className="mt-3 text-zinc-500">{section.body}</p>
            </Reveal>
          ))}

          <Reveal delay={sections.length * 40}>
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="mt-3 text-zinc-500">
              Questions about this policy can be sent to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-black underline underline-offset-2 hover:text-zinc-600"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
