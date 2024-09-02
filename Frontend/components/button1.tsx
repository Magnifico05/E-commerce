import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./button1.module.css";

export type Button1Type = {
  className?: string;
  addToCart?: string;

  /** Style props */
  propPosition?: CSSProperties["position"];
  propTop?: CSSProperties["top"];
  propLeft?: CSSProperties["left"];
  propPadding?: CSSProperties["padding"];
  propHeight?: CSSProperties["height"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  propTextDecoration?: CSSProperties["textDecoration"];
};

const Button1: NextPage<Button1Type> = ({
  className = "",
  propPosition,
  propTop,
  propLeft,
  propPadding,
  propHeight,
  addToCart,
  propDisplay,
  propMinWidth,
  propTextDecoration,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      position: propPosition,
      top: propTop,
      left: propLeft,
      padding: propPadding,
      height: propHeight,
    };
  }, [propPosition, propTop, propLeft, propPadding, propHeight]);

  const addToCartStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
      textDecoration: propTextDecoration,
    };
  }, [propDisplay, propMinWidth, propTextDecoration]);

  return (
    <div className={[styles.button, className].join(" ")} style={buttonStyle}>
      <div className={styles.addToCart} style={addToCartStyle}>
        {addToCart}
      </div>
    </div>
  );
};

export default Button1;
