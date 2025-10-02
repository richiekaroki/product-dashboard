// src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
}
