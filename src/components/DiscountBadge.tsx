export default function DiscountBadge({ percentage }: { percentage?: number }) {
  if (!percentage || percentage <= 0) return null;
  return (
    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500 text-white shadow-sm">
      -{Math.round(percentage)}%
    </div>
  );
}
