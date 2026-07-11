// src/app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Layout from "../components/Layout";
import Providers from "../components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "WAM Dashboard — Product Inventory",
  description:
    "Browse and discover products with advanced filtering, search, and sorting.",
  openGraph: {
    title: "WAM Dashboard — Product Inventory",
    description:
      "Browse and discover products with advanced filtering, search, and sorting.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = localStorage.getItem('wam-theme:v1');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})()
`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
