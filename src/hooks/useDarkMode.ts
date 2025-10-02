// src/hooks/useDarkMode.ts
"use client";

import { useEffect, useState } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get saved theme or system preference
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = saved || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);

    // Apply theme to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Update state
    setTheme(newTheme);

    // Update DOM immediately
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme, mounted };
}
