"use client";

import { useEffect, useRef } from "react";

/** Fades in each top-level block of the rendered markdown as it scrolls into view. */
export function RevealHtml({ html, className = "" }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const blocks = Array.from(container.children);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={ref}
      className={`reveal-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
