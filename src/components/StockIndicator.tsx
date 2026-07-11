interface StockIndicatorProps {
  stock: number;
}

export default function StockIndicator({ stock }: StockIndicatorProps) {
  const getStockStatus = () => {
    if (stock === 0) {
      return {
        text: 'Out of Stock',
        dot: 'bg-red-500',
        classes: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400',
      };
    }
    if (stock < 10) {
      return {
        text: `Only ${stock} left`,
        dot: 'bg-orange-500',
        classes: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
      };
    }
    if (stock < 50) {
      return {
        text: `${stock} in stock`,
        dot: 'bg-amber-500',
        classes: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
      };
    }
    return {
      text: 'In Stock',
      dot: 'bg-emerald-500',
      classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
    };
  };

  const status = getStockStatus();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${status.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
      {status.text}
    </span>
  );
}
