// src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4"></div>
      <div className="space-y-2.5">
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-3/4"></div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-1/3"></div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-md w-16"></div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-12"></div>
        </div>
      </div>
    </div>
  );
}
