// src/app/layout.tsx
import type { ReactNode } from "react";
import Layout from "../components/Layout";
import Providers from "../components/Providers";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
