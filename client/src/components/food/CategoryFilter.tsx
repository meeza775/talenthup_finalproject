import React from 'react';
import { CATEGORIES } from '../../config/constants';

interface CategoryFilterProps {
  selectedCategory: typeof CATEGORIES[number];
  onSelectCategory: (category: typeof CATEGORIES[number]) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}