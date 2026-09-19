"use client";

import { useEffect, useRef } from "react";

export default function Parallax({
  children,
  speed = 0.25,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      const offset = rect ? rect.top : 0;
      el.style.transform = `translateY(${offset * speed}px)`;
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
