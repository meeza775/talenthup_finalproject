import React from 'react';
import { Plus } from 'lucide-react';
import { Food } from '../types';

interface FoodCardProps {
  food: Food;
  onAddToCart: (food: Food) => void;
}

export function FoodCard({ food, onAddToCart }: FoodCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={food.image} 
        alt={food.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{food.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${food.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(food)}
            className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-600 transition-colors"
          >
            <Plus size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}