import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { CategoryFilter } from './components/food/CategoryFilter';
import { FoodGrid } from './components/food/FoodGrid';
import { CartSidebar } from './components/cart/CartSidebar';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { useCart } from './hooks/useCart';
import { useFoods } from './hooks/useFoods';
import { useCategories } from './hooks/useCategories';
import { createOrder } from './services/api';

function App() {
  const { foods, loading, error } = useFoods();
  const { categories, selectedCategory, filterByCategory } = useCategories();
  const { cartItems, addToCart, updateQuantity, removeItem, total, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = async (customerData: {
    customerName: string;
    address: string;
    phone: string;
  }) => {
    try {
      await createOrder({
        items: cartItems,
        totalAmount: total,
        ...customerData,
      });
      clearCart();
      setIsCheckoutOpen(false);
      alert('Order placed successfully!');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={filterByCategory}
        />

        <FoodGrid
          foods={foods}
          selectedCategory={selectedCategory}
          onAddToCart={addToCart}
        />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        total={total}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
      />
    </div>
  );
}

export default App;