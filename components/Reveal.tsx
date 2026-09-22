"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "up" | "scale" | "blur";

const variants: Record<Variant, { hidden: string; visible: string }> = {
  up: {
    hidden: "translate-y-8 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  scale: {
    hidden: "scale-95 opacity-0",
    visible: "scale-100 opacity-100",
  },
  blur: {
    hidden: "translate-y-4 opacity-0 blur-sm",
    visible: "translate-y-0 opacity-100 blur-none",
  },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const states = variants[variant];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? states.visible : states.hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
