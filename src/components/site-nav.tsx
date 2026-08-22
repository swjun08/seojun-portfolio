"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/career", label: "경력" },
  { href: "/project", label: "프로젝트" },
  { href: "/blog", label: "블로그" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "max-w-xl rounded-full border border-border bg-card/90 px-4 shadow-lg backdrop-blur"
            : "max-w-5xl border-b border-transparent bg-transparent px-2"
        }`}
      >
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-sm font-bold tracking-tight"
          >
            박서준
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (pathname === item.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative pb-1 transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-[1px] left-0 right-0 mx-auto h-[2px] w-3 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </div>
  );
}
