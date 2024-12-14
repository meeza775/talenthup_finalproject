import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 mr-4 lg:hidden" />
            <h1 className="text-2xl font-bold text-gray-900">FoodieHub</h1>
          </div>
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBag className="h-6 w-6 text-gray-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}