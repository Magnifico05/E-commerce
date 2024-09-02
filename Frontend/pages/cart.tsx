// import { useEffect, useState } from "react";
// import type { NextPage } from "next";
// import axios from "axios";
// import CartMainSection from "../components/cart-main-section";
// import CartSection from "../components/cart-section";
// import Actions from "../components/actions";
// import styles from "./cart.module.css";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
// };

// type CartItem = {
//   id: number;
//   product: Product;
//   quantity: number;
// };

// const Cart: NextPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get<CartItem[]>('http://localhost:8000/user-cart/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCartItems(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load cart items");
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleQuantityChange = async (id: number, newQuantity: number) => {
//     if (newQuantity < 1) return; // Prevent quantity less than 1

//     try {
//       const token = localStorage.getItem("token");
//       await axios.patch(
//         `http://localhost:8000/cart-items/${id}/`,
//         { quantity: newQuantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === id ? { ...item, quantity: newQuantity } : item
//         )
//       );
//     } catch (err) {
//       console.error("Failed to update quantity");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className={styles.cart}>
//       <CartMainSection />
//       {cartItems.map((item) => (
//         <CartSection
//           key={item.id}
//           cartItem={item}
//           onQuantityChange={handleQuantityChange}
//           propPosition="relative"
//           g922500x5001={item.product.image_url}
//           propHeight="72.22%"
//           propWidth="92.59%"
//           propTop="14.81%"
//           propRight="3.7%"
//           propBottom="12.96%"
//           propLeft="3.7%"
//           lCDMonitor={item.product.name}
//           propMinWidth="96px"
//           propWidth1="146px"
//           gamepadDivider={`$${item.product.price}`}
//           propWidth2="176px"
//           prop={`$${item.product.price * item.quantity}`}
//           iconCancel1={true}
//           propPosition1="absolute"
//           propMargin="0 !important"
//           propTop1="20px"
//           propLeft1="30px"
//           gamepadQuantityNumber={item.quantity.toString()}
//           propGap="16px"
//           propMinWidth1="16px"
//         />
//       ))}
//       <Actions />
//     </div>
//   );
// };

// export default Cart;

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import CartMainSection from "../components/cart-main-section";
import CartSection from "../components/cart-section";
import Actions from "../components/actions";
import styles from "./cart.module.css";
import FrameComponent from "../components/frame-component";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

const Cart: NextPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<CartItem[]>("http://localhost:8000/user-cart/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cart items");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate subtotal whenever cartItems change
    const calculatedSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setSubtotal(calculatedSubtotal);
    console.log("Subtotal updated:", calculatedSubtotal);
    const shippingCost = subtotal > 200 ? 0 : 30;

    const totalCost = subtotal + shippingCost;
  }, [cartItems]);

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    try {
      const token = localStorage.getItem("token");
  
      if (newQuantity < 1) {
        // Remove item from cart
        await axios.delete(`http://localhost:8000/cart-items/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Remove item from state
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        // Update item quantity
        await axios.patch(
          `http://localhost:8000/cart-items/${id}/`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Update item quantity in state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to update quantity");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.cart}>
      <CartMainSection />
      {cartItems.map((item) => (
        <CartSection
          key={item.id}
          cartItem={item}
          onQuantityChange={handleQuantityChange}
          propPosition="relative"
          g922500x5001={item.product.image_url}
          propHeight="72.22%"
          propWidth="92.59%"
          propTop="14.81%"
          propRight="3.7%"
          propBottom="12.96%"
          propLeft="3.7%"
          lCDMonitor={item.product.name}
          propMinWidth="96px"
          propWidth1="146px"
          gamepadDivider={`$${item.product.price}`}
          propWidth2="176px"
          prop={`$${item.product.price * item.quantity}`}
          iconCancel1={true}
          propPosition1="absolute"
          propMargin="0 !important"
          propTop1="20px"
          propLeft1="30px"
          gamepadQuantityNumber={item.quantity.toString()}
          propGap="16px"
          propMinWidth1="16px"
        />
      ))}
      {/* <div className={styles.subtotal}>
        <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
      </div> */}
      <div>
      <FrameComponent cartItems={cartItems} subtotal={subtotal} />
      </div>
      {/* <Actions /> */}
    </div>
  );
};

export default Cart;
