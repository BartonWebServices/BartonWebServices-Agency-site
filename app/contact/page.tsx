import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import IntakeForm from "@/components/IntakeForm";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Barton Web Services to discuss a custom-built website for your business.",
};

export default function ContactPage() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 sm:grid-cols-[1fr_320px] sm:gap-12">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
                Contact
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s Talk About Your Project
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg text-zinc-500">
                Share a few details about your business and what you need
                built. Every inquiry is reviewed personally.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-12">
              <IntakeForm
                subjectPrefix="Contact Inquiry"
                submitLabel="Send Message"
              />
            </Reveal>
          </div>

          <Reveal delay={160} className="border-t border-black/10 pt-10 sm:border-t-0 sm:border-l sm:pl-10 sm:pt-0">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Direct Contact
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 flex items-center gap-2 text-base font-medium text-black transition-colors hover:text-zinc-600"
            >
              <Mail size={18} strokeWidth={1.5} />
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
