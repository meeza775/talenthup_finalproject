import { useState, useCallback } from 'react';
import { CartItem, Food } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((food: Food) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === food.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
  };
}