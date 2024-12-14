import { useState } from 'react';
import { CATEGORIES } from '../config/constants';

export function useCategories() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');

  const filterByCategory = (category: typeof CATEGORIES[number]) => {
    setSelectedCategory(category);
  };

  return {
    categories: CATEGORIES,
    selectedCategory,
    filterByCategory
  };
}