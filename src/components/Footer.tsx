// src/components/Footer.tsx
"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import BackToTop from "./BackToTop";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTop />
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                MR-WAM DASHBOARD
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                A modern product management dashboard built with Next.js, React
                Query, and Tailwind CSS.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                <FooterLink href="/">Products</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                CONNECT
              </h3>
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://github.com"
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://twitter.com"
                  icon={<Twitter className="w-5 h-5" />}
                  label="Twitter"
                />
                <SocialLink
                  href="https://linkedin.com"
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              © {currentYear} mr-wam. All rights reserved.
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
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
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
      className="flex items-center justify-center w-10 h-10 rounded-lg
               bg-gray-100 hover:bg-gray-200 
               dark:bg-gray-800 dark:hover:bg-gray-700
               text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
               transition-colors duration-200"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}
