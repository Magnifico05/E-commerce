import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import styles from './checkout.module.css';

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

const Checkout: NextPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(30);
  const [totalCost, setTotalCost] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<CartItem[]>('http://localhost:8000/user-cart/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);

    const calculatedShippingCost = calculatedSubtotal > 200 ? 0 : 30;
    setShippingCost(calculatedShippingCost);

    const calculatedTotalCost = calculatedSubtotal + calculatedShippingCost;
    setTotalCost(calculatedTotalCost);
  }, [cartItems]);

  const handleCashPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/checkout/', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderConfirmed(true);
    } catch (err) {
      setError('Failed to confirm order');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      {!orderConfirmed ? (
        <div className={styles.checkoutContent}>
          <h2>Cart Details</h2>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>${item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.product.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.summary}>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Shipping Cost:</strong> ${shippingCost}</p>
            <p><strong>Total Cost:</strong> ${totalCost}</p>
          </div>
          <button className={styles.cashButton} onClick={handleCashPayment}>
            Pay by Cash
          </button>
        </div>
      ) : (
        <div className={styles.orderConfirmation}>
          <h2>Order Confirmed!</h2>
          <p>Your order has been successfully placed. Please prepare the cash for payment upon delivery.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
