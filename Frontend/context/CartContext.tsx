import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CartContextProps {
  cartCount: number; // Total quantity of items
  animateCart: boolean;
  addToCart: (productId: number, quantity: number) => void;
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

  // Function to fetch cart data and calculate total quantity
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get('http://localhost:8000/user-cart/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Sum the quantities of all items in the cart
        const totalQuantity = response.data.reduce((total: number, item: any) => total + item.quantity, 0);
        setCartCount(totalQuantity);
        localStorage.setItem("cartCount", totalQuantity.toString());
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post('http://localhost:8000/cart-items/add_to_cart/', {
          product_id: productId,
          quantity: quantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Fetch updated cart count after adding to cart
        fetchCartCount();
        setAnimateCart(true);
        setTimeout(() => setAnimateCart(false), 500);
      }
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
