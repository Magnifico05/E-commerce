import type { NextPage } from "next";
import { useEffect, useState } from 'react';
import Button from "./button";
import styles from "./frame-component.module.css";
import axios from 'axios';

export type FrameComponentType = {
  className?: string;
};

export type FrameComponentProps = {
  className?: string;
  cartItems: any[];  // You may replace `any` with a more specific type if you have one
  subtotal: number;
};

const FrameComponent: NextPage<FrameComponentProps> = ({ className = "", cartItems, subtotal }) => {

  const shippingCost = subtotal >= 200 ? 0 : 30;

  const totalCost = subtotal + shippingCost;
  return (
    <div className={[styles.cartTotalParent, className].join(" ")}>
      <div className={styles.cartTotal}>Cart Total</div>
      <div className={styles.totalDetails}>
        <div className={styles.totalValues}>
          <div className={styles.subtotal}>Subtotal:</div>
          <div className={styles.shippingValue}>${subtotal}</div>
        </div>
        <img
          className={styles.underlineIcon}
          loading="lazy"
          alt=""
          src="/underline.svg"
        />
        <div className={styles.totalValues}>
          <div className={styles.shipping}>Shipping:</div>
          <div className={styles.shippingValue}>
            {shippingCost === 0 ? "Free" : `$${shippingCost}`}
          </div>
        </div>
        <img
          className={styles.underlineIcon}
          loading="lazy"
          alt=""
          src="/underline.svg"
        />
        <div className={styles.totalValues}>
          <div className={styles.total}>Total:</div>
          <div className={styles.shippingValue}>${totalCost.toFixed(2)}</div>
        </div>
        <div className={styles.checkout}>
          <a href="/address">
          <Button 
            propBackgroundColor="#db4444"
            propBorder="unset"
            viewAllProducts="Proceed to checkout"
            propColor="#fafafa"
            propMinWidth="unset"
            propDisplay="unset"
          />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;



