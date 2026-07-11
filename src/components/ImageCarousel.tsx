"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="relative w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 p-2.5 rounded-xl shadow-lg transition-all duration-150 hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-slate-900 dark:text-white" size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 p-2.5 rounded-xl shadow-lg transition-all duration-150 hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="text-slate-900 dark:text-white" size={20} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                idx === currentIndex
                  ? 'border-indigo-500 dark:border-indigo-400 shadow-sm'
                  : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="text-center mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium tabular-nums">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
