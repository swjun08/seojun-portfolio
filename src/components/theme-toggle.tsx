"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="테마 전환"
      className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition hover:text-foreground"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
