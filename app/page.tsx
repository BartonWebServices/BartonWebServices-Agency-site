import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import Button from "@/components/Button";
import IntakeForm from "@/components/IntakeForm";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Parallax
            speed={0.2}
            className="absolute -right-16 -top-16 select-none"
          >
            <span
              aria-hidden
              className="block text-[32vw] font-bold leading-none text-white/[0.05]"
            >
              B
            </span>
          </Parallax>
        </div>

        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6 py-32 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              Barton Web Services
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              Custom-Coded Websites, Built Around Your Business.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-zinc-400">
              Every site we build is written from scratch for the business it
              serves — no templates, no page builders. We&apos;re also
              building the capability to embed complex, fully integrated web
              applications directly into your site.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#quote" variant="solid-light">
                Request a Demo
              </Button>
              <Button href="/contact" variant="outline-light">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              Process
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              A Straightforward, Two-Part Pricing Model
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg text-zinc-500">
              We keep pricing simple: one fee to build your site, one fee to
              keep it running. No hidden costs, no surprise invoices.
            </p>
          </Reveal>

          <div className="mt-16 grid border border-black/10 sm:grid-cols-2">
            <Reveal className="p-8 sm:p-10">
              <span className="font-mono text-sm text-zinc-400">01</span>
              <h3 className="mt-4 text-xl font-semibold">Build Fee</h3>
              <p className="mt-3 text-zinc-500">
                A one-time fee covering the full custom design and
                development of your site — scoped to your business and
                project requirements. No templates, no page builders.
              </p>
            </Reveal>
            <Reveal
              delay={120}
              className="border-t border-black/10 p-8 sm:border-l sm:border-t-0 sm:p-10"
            >
              <span className="font-mono text-sm text-zinc-400">02</span>
              <h3 className="mt-4 text-xl font-semibold">
                Monthly Maintenance Fee
              </h3>
              <p className="mt-3 text-zinc-500">
                An ongoing fee that covers full hosting and unlimited edits,
                subject to fair-use. Your site stays live, current, and
                maintained with no separate hosting bills.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-12">
            <Button href="#quote" variant="solid-dark">
              Request a Custom Quote
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                  What&apos;s Next
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Integrated Web Applications
                </h2>
              </Reveal>
            </div>
            <div className="space-y-6">
              <Reveal delay={120}>
                <p className="text-lg text-zinc-400">
                  Barton Web Services is expanding beyond static sites.
                  We&apos;re building the capability to embed complex, custom
                  web applications — from client portals to internal tools —
                  directly into the sites we design.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg text-zinc-400">
                  This is an active area of development, not a current
                  offering. As it becomes available, it will roll out to new
                  and existing projects under the same custom-coded, fully
                  maintained approach.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-24 bg-white text-black">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              Get Started
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Request a Free Quote or Demo
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-zinc-500">
              Tell us about your business and what you need. We&apos;ll
              follow up directly to scope your project and, where useful,
              walk you through a demo.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-12">
            <IntakeForm
              subjectPrefix="Quote & Demo Request"
              submitLabel="Request Quote"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
