// src/components/Breadcrumbs.tsx
"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <ol className="flex items-center gap-2 text-sm">
          {/* Home */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only md:not-sr-only">Home</span>
            </Link>
          </li>

          {/* Dynamic segments */}
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

