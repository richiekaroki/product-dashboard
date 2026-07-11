// src/components/Footer.tsx
"use client";

import { Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import BackToTop from "./BackToTop";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTop />
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0B0F14] mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                WAM Dashboard
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Browse, filter, and explore 100+ products from DummyJSON. Built with Next.js 15, React Query, and Tailwind CSS v4.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Product
              </h3>
              <ul className="space-y-2.5">
                <FooterLink href="/">Browse Products</FooterLink>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Connect
              </h3>
              <div className="flex items-center gap-2.5">
                <SocialLink
                  href="https://github.com/dummyjson"
                  icon={<Github className="w-4 h-4" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://twitter.com/dummyjson"
                  icon={<Twitter className="w-4 h-4" />}
                  label="Twitter"
                />
                <SocialLink
                  href="https://dummyjson.com"
                  icon={<ExternalLink className="w-4 h-4" />}
                  label="DummyJSON"
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              &copy; {currentYear} WAM Dashboard
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              Data from <a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">DummyJSON</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-lg
               border border-slate-200 dark:border-slate-700
               bg-white dark:bg-slate-800
               text-slate-500 dark:text-slate-400
               hover:text-slate-900 dark:hover:text-white
               hover:bg-slate-50 dark:hover:bg-slate-700
               hover:shadow-sm
               transition-all duration-150"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}
