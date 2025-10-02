// src/components/BackToTop.tsx
"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 
               flex items-center justify-center w-12 h-12 
               rounded-full shadow-lg
               bg-blue-600 hover:bg-blue-700 
               dark:bg-blue-500 dark:hover:bg-blue-600
               text-white
               transition-all duration-300 
               hover:scale-110 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950
               animate-bounce-slow"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
