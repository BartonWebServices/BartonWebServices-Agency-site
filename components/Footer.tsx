import Link from "next/link";
import Logo from "./Logo";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-sm font-semibold tracking-tight">
                Barton Web Services
              </span>
            </Link>
            <p className="text-sm text-zinc-400">
              Custom-coded websites, built and maintained for your business.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Site
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-zinc-300 transition-colors hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="text-zinc-300 transition-colors hover:text-white"
                  >
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-zinc-300 transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Legal
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-zinc-300 transition-colors hover:text-white"
                  >
                    Privacy &amp; Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Get in Touch
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Barton Web Services. All rights reserved.</p>
          <p>Built with Next.js. Secured with HTTPS.</p>
        </div>
      </div>
    </footer>
  );
}
