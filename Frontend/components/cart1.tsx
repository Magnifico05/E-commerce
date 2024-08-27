import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./cart1.module.css";

export type Cart1Type = {
  className?: string;
  imageUrl?: string;
  productName?: string; // Product Name
  productPrice?: string; // Product Price

  /** Style props */
  propPadding?: CSSProperties["padding"];
};

const Cart1: NextPage<Cart1Type> = ({

  className = '',
  imageUrl,
  productName,
  productPrice,
  propPadding,
}) => {
  console.log('Image Path:', imageUrl); // Log the image path to verify it

  const productDescriptionStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className={[styles.cart, className].join(' ')}>
      <div className={styles.cart1}>
        <div className={styles.fillHeartParent}>
          <img className={styles.fillHeartIcon} alt="" src="/fill-heart.svg" />
          <img className={styles.fillHeartIcon} alt="" src="/fill-eye.svg" />
        </div>
        <div className={styles.productImage}>
          <img
            className={styles.productImageIcon}
            alt={productName}
            src={imageUrl}
          />
        </div>
      </div>
      <div className={styles.productDescription} style={productDescriptionStyle}>
        <div className={styles.productName}>{productName}</div>
        <div className={styles.price}>
          <div className={styles.currentPrice}>{productPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart1;
