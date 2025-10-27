interface StockIndicatorProps {
  stock: number;
}

export default function StockIndicator({ stock }: StockIndicatorProps) {
  const getStockStatus = () => {
    if (stock === 0) {
      return {
        text: 'Out of Stock',
        color: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-100 dark:bg-red-900/30',
      };
    }
    if (stock < 10) {
      return {
        text: `Only ${stock} left`,
        color: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-100 dark:bg-orange-900/30',
      };
    }
    if (stock < 50) {
      return {
        text: `${stock} in stock`,
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      };
    }
    return {
      text: 'In Stock',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
    };
  };

  const status = getStockStatus();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
      {status.text}
    </span>
  );
}
