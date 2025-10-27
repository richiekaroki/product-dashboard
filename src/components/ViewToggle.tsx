"use client";

import { LayoutGrid, List } from "lucide-react";

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-700 rounded-md p-1 bg-white dark:bg-gray-800">
      <button
        onClick={() => onChange('grid')}
        className={`p-2 rounded transition-colors ${
          value === 'grid'
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-2 rounded transition-colors ${
          value === 'list'
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="List view"
      >
        <List size={18} />
      </button>
    </div>
  );
}
