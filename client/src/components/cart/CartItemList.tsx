import React from 'react';
import { CartItem } from '../../types';
import { formatPrice } from '../../utils/format';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemListProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartItemList({ items, onUpdateQuantity, onRemoveItem }: CartItemListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {items.map((item) => (
        <div key={item.id} className="flex py-4 px-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="ml-4 flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-600">{formatPrice(item.price)}</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}