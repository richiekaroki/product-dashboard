// src/components/Layout.tsx
"use client";

import { ReactNode } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, mounted } = useDarkMode();

  // Apply theme class directly to the main container
  const themeClass =
    theme === "dark"
      ? "dark:bg-black dark:text-gray-100"
      : "bg-white text-gray-900";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClass}`}
    >
      <Header />
      <Breadcrumbs />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
