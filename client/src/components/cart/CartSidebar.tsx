import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../../types';
import { CartItemList } from './CartItemList';
import { CartSummary } from './CartSummary';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  total: number;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  total
}: CartSidebarProps) {
  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 w-full max-w-md h-full bg-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <CartItemList
              items={items}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          </div>

          <CartSummary
            total={total}
            onCheckout={onCheckout}
            itemCount={items.length}
          />
        </div>
      </div>
    </div>
  );
}