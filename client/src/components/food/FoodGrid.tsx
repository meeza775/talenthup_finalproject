import React from 'react';
import { Food } from '../../types';
import { FoodCard } from './FoodCard';

interface FoodGridProps {
  foods: Food[];
  selectedCategory: string;
  onAddToCart: (food: Food) => void;
}

export function FoodGrid({ foods, selectedCategory, onAddToCart }: FoodGridProps) {
  const filteredFoods = selectedCategory === 'All'
    ? foods
    : foods.filter(food => food.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFoods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}