// src/hooks/useDarkMode.ts
"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "wam-theme:v1";

export function useDarkMode() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialTheme = saved || (systemPrefersDark ? "dark" : "light");
      setTheme(initialTheme);

      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // localStorage throws in incognito/private browsing
    }

    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // localStorage throws in incognito/private browsing
      }

      return newTheme;
    });
  }, []);

  return { theme, toggleTheme, mounted };
}
