import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import styles from "./button-primary.module.css";

export type ButtonPrimaryType = {
  className?: string;
  addToCart?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propPadding?: CSSProperties["padding"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propFontWeight?: CSSProperties["fontWeight"];
  propColor?: CSSProperties["color"];
};

const ButtonPrimary: NextPage<ButtonPrimaryType> = ({
  className = "",
  propWidth,
  propPadding,
  propBackgroundColor,
  propBorder,
  propFlex,
  addToCart,
  propMinWidth,
  propFontWeight,
  propColor,
}) => {
  const buttonPrimaryStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      padding: propPadding,
      backgroundColor: propBackgroundColor,
      border: propBorder,
      flex: propFlex,
    };
  }, [propWidth, propPadding, propBackgroundColor, propBorder, propFlex]);

  const addToCart1Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      fontWeight: propFontWeight,
      color: propColor,
    };
  }, [propMinWidth, propFontWeight, propColor]);

  return (
    <Button
      className={[styles.buttonPrimary, className].join(" ")}
      variant="primary"
      style={buttonPrimaryStyle}
    />
  );
};

export default ButtonPrimary;
