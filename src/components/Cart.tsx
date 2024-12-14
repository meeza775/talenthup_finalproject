import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-4">
          <ShoppingCart size={48} className="text-gray-400" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-100 rounded"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-100 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-4 text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}