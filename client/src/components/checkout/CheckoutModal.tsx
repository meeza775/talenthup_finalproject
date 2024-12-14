import React from 'react';
import { X } from 'lucide-react';
import { CheckoutForm } from './CheckoutForm';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    customerName: string;
    address: string;
    phone: string;
  }) => void;
}

export function CheckoutModal({ isOpen, onClose, onSubmit }: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4">
            <CheckoutForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}