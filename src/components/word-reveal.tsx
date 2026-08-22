"use client";

import { useEffect, useRef } from "react";

/**
 * nextgen.kr/team's exact reading effect: every word is its own inline
 * span. As you scroll, each word darkens once it crosses a line near the
 * bottom of the viewport (roughly where you're actually reading) — and
 * dims back if you scroll back up. Words are re-observed on rerender.
 */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const words = Array.from(container.querySelectorAll<HTMLElement>("[data-word]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-read", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0 }
    );
    words.forEach((w) => observer.observe(w));
    return () => observer.disconnect();
  }, [text]);

  return (
    <p ref={ref} className={`text-pretty text-justify leading-relaxed ${className}`}>
      {text.split(" ").flatMap((word, i, arr) => {
        const span = (
          <span key={i} data-word className="word-reveal inline-block">
            {word}
          </span>
        );
        return i < arr.length - 1 ? [span, " "] : [span];
      })}
    </p>
  );
}
