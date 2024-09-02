import type { NextPage } from "next";
import styles from "./cart-main-section.module.css";

export type CartMainSectionType = {
  className?: string;
};

const CartMainSection: NextPage<CartMainSectionType> = ({ className = "" }) => {
  return (
    <header className={[styles.cartMainSection, className].join(" ")}>
      <nav className={styles.priceQuantity}>
        <a className={styles.product}>Product</a>
        <a className={styles.price}>Price</a>
        <a className={styles.quantity}>Quantity</a>
        <a className={styles.subtotal}>Subtotal</a>
      </nav>
    </header>
  );
};

export default CartMainSection;
