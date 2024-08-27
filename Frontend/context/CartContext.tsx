import React, { createContext, useContext, useState } from 'react';

interface CartContextProps {
  cartCount: number;
  animateCart: boolean;
  addToCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);

  const addToCart = () => {
    setCartCount(cartCount + 1);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 500);
  };

  return (
    <CartContext.Provider value={{ cartCount, animateCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
