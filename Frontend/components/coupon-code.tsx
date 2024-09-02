import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Button from "./button";
import styles from "./coupon-code.module.css";

export type CouponCodeType = {
  className?: string;
  viewAllProducts?: string;
  propBackgroundColor?: string;
  propBorder?: string;
  propColor?: string;
  propMinWidth?: string;
  propDisplay?: string;

  /** Style props */
  propFlexWrap?: CSSProperties["flexWrap"];
};

const CouponCode: NextPage<CouponCodeType> = ({
  className = "",
  propFlexWrap,
  viewAllProducts,
  propBackgroundColor,
  propBorder,
  propColor,
  propMinWidth,
  propDisplay,
}) => {
  const couponCodeStyle: CSSProperties = useMemo(() => {
    return {
      flexWrap: propFlexWrap,
    };
  }, [propFlexWrap]);

  return (
    <div
      className={[styles.couponCode, className].join(" ")}
      style={couponCodeStyle}
    >
      <div className={styles.couponInput}>
        <div className={styles.couponCode1}>Coupon Code</div>
      </div>
      <Button
        propBackgroundColor={propBackgroundColor}
        propBorder={propBorder}
        viewAllProducts={viewAllProducts}
        propColor={propColor}
        propMinWidth={propMinWidth}
        propDisplay={propDisplay}
      />
    </div>
  );
};

export default CouponCode;
