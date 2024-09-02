import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./button.module.css";

export type ButtonType = {
  className?: string;
  viewAllProducts?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
  propMinWidth?: CSSProperties["minWidth"];
  propDisplay?: CSSProperties["display"];
};

const Button: NextPage<ButtonType> = ({
  className = "",
  propBackgroundColor,
  propBorder,
  viewAllProducts,
  propColor,
  propMinWidth,
  propDisplay,
}) => {
  const button1Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      border: propBorder,
    };
  }, [propBackgroundColor, propBorder]);

  const viewAllProductsStyle: CSSProperties = useMemo(() => {
    return {
      color: propColor,
      minWidth: propMinWidth,
      display: propDisplay,
    };
  }, [propColor, propMinWidth, propDisplay]);

  return (
    <div className={[styles.button, className].join(" ")} style={button1Style}>
      <div className={styles.viewAllProducts} style={viewAllProductsStyle}>
        {viewAllProducts}
      </div>
    </div>
  );
};

export default Button;
