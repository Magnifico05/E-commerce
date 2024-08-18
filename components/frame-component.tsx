import type { NextPage } from "next";
import Button from "./button";
import styles from "./frame-component.module.css";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
  return (
    <div className={[styles.cartTotalParent, className].join(" ")}>
      <div className={styles.cartTotal}>Cart Total</div>
      <div className={styles.totalDetails}>
        <div className={styles.totalValues}>
          <div className={styles.subtotal}>Subtotal:</div>
          <div className={styles.shippingValue}>$1750</div>
        </div>
        <img
          className={styles.underlineIcon}
          loading="lazy"
          alt=""
          src="/underline.svg"
        />
        <div className={styles.totalValues}>
          <div className={styles.shipping}>Shipping:</div>
          <div className={styles.free}>Free</div>
        </div>
        <img
          className={styles.underlineIcon}
          loading="lazy"
          alt=""
          src="/underline.svg"
        />
        <div className={styles.totalValues}>
          <div className={styles.total}>Total:</div>
          <div className={styles.shippingValue}>$1750</div>
        </div>
        <div className={styles.checkout}>
          <Button
            propBackgroundColor="#db4444"
            propBorder="unset"
            viewAllProducts="Procees to checkout"
            propColor="#fafafa"
            propMinWidth="unset"
            propDisplay="unset"
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
