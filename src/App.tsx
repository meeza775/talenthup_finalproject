import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { FoodCard } from './components/FoodCard';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { foods } from './data/mockData';
import { CartItem, Food } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const addToCart = (food: Food) => {
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
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = (customerData: {
    customerName: string;
    address: string;
    phone: string;
  }) => {
    // Here we would normally send the order to the backend
    console.log('Order placed:', {
      items: cartItems,
      ...customerData,
      totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });
    setCartItems([]);
    setIsCheckingOut(false);
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Food Ordering</h1>
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-orange-500" />
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {foods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            {isCheckingOut ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                <CheckoutForm onSubmit={handlePlaceOrder} />
              </div>
            ) : (
              <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;