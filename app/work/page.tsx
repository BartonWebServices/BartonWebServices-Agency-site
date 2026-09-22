import type { Metadata } from "next";
import { Layers } from "lucide-react";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A showcase of custom-built client sites from Barton Web Services.",
};

const placeholders = [1, 2, 3, 4];

export default function WorkPage() {
  return (
    <section className="relative overflow-hidden bg-white text-black">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={0.12}
          className="absolute -right-20 top-0 select-none"
        >
          <span
            aria-hidden
            className="block text-[28vw] font-bold leading-none text-black/[0.06]"
          >
            B
          </span>
        </Parallax>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            Our Work
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            A Growing Showcase of Custom Builds
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-lg text-zinc-500">
            Client demo sites and live builds are featured here as they
            launch. Check back as this page fills in.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
          {placeholders.map((n, i) => (
            <Reveal
              key={n}
              variant="scale"
              delay={i * 80}
              className="group flex aspect-video flex-col items-center justify-center gap-4 bg-white/50 p-8 text-center backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 hover:bg-white/80"
            >
              <Layers
                size={28}
                strokeWidth={1.5}
                className="text-zinc-400 transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <p className="text-lg font-semibold">
                  Demo Site {String(n).padStart(2, "0")}
                </p>
                <span className="mt-2 inline-block border border-zinc-300 px-2.5 py-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Coming Soon
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
