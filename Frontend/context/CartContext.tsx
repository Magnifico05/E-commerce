//create an api to add to cart

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
  const [cartCount, setCartCount] = useState<number>(0);
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartCount = Number(localStorage.getItem("cartCount")) || 0;
      console.log('Initial cart count:', savedCartCount);  // Debugging log
      setCartCount(savedCartCount);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log('Saving cart count:', cartCount);  // Debugging log
      localStorage.setItem("cartCount", cartCount.toString());
    }
  }, [cartCount]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post('http://localhost:8000/user-cart/', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      console.log('Adding to cart, current count:', cartCount);  // Debugging log
      setCartCount(prevCount => {
        const newCount = prevCount + 1;
        console.log('New cart count:', newCount);  // Debugging log
        return newCount;
      });
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 500);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, animateCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
