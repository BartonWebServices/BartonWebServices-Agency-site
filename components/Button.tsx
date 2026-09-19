import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid-dark" | "solid-light" | "outline-dark" | "outline-light";

const styles: Record<Variant, string> = {
  "solid-dark":
    "border border-black bg-black text-white hover:bg-white hover:text-black",
  "solid-light":
    "border border-white bg-white text-black hover:bg-black hover:text-white",
  "outline-dark":
    "border border-black bg-transparent text-black hover:bg-black hover:text-white",
  "outline-light":
    "border border-white bg-transparent text-white hover:bg-white hover:text-black",
};

export default function Button({
  href,
  children,
  variant = "solid-dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
