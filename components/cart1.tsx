import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./cart1.module.css";

export type Cart1Type = {
  className?: string;
  zAH9D56260021000000Ligh?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
};

const Cart1: NextPage<Cart1Type> = ({
  className = "",
  zAH9D56260021000000Ligh,
  propPadding,
}) => {
  const productDescriptionStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className={[styles.cart, className].join(" ")}>
      <div className={styles.cart1}>
        <div className={styles.fillHeartParent}>
          <img className={styles.fillHeartIcon} alt="" src="/fill-heart.svg" />
          <img className={styles.fillHeartIcon} alt="" src="/fill-eye.svg" />
        </div>
        <div className={styles.productImageFour}>
          <img
            className={styles.zah9d56260021000000LightIcon}
            alt=""
            src={zAH9D56260021000000Ligh}
          />
        </div>
      </div>
      <div
        className={styles.productDescription}
        style={productDescriptionStyle}
      >
        <div className={styles.theNorthCoat}>The north coat</div>
        <div className={styles.price}>
          <div className={styles.emptyPrice}>$260</div>
          <div className={styles.div}>$360</div>
        </div>
        <div className={styles.fiveStarParent}>
          <div className={styles.fiveStar}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          </div>
          <div className={styles.div1}>(65)</div>
        </div>
      </div>
    </div>
  );
};

export default Cart1;
