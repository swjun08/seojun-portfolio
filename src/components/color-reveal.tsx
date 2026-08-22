"use client";

import { useEffect, useRef, useState } from "react";

/**
 * nextgen.kr-style reading effect: text sits dim until it scrolls into
 * view, then darkens to full color — so already-read lines read as
 * "read" and lines ahead stay muted.
 */
export function ColorReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [read, setRead] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRead(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`leading-relaxed transition-colors duration-700 ${
        read ? "text-foreground/90" : "text-muted/50"
      } ${className}`}
    >
      {children}
    </p>
  );
}
