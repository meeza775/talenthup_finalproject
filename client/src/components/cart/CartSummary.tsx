import React from 'react';
import { formatPrice } from '../../utils/format';

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onCheckout: () => void;
}

export function CartSummary({ total, itemCount, onCheckout }: CartSummaryProps) {
  return (
    <div className="border-t p-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery Fee</span>
          <span>{formatPrice(5.99)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total</span>
          <span>{formatPrice(total + 5.99)}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}