import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./quantity.module.css";

export type QuantityType = {
  className?: string;
  gamepadQuantityNumber?: string;
  onChange: (newQuantity: number) => void;

  /** Style props */
  propGap?: CSSProperties["gap"];
  propMinWidth?: CSSProperties["minWidth"];
};

const Quantity: NextPage<QuantityType> = ({
  className = "",
  propGap,
  gamepadQuantityNumber,
  propMinWidth,
  onChange,
}) => {
  const gamepadQuantityFieldStyle: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const gamepadQuantityNumberStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const handleIncrement = () => {
    const newQuantity = parseInt(gamepadQuantityNumber || "0", 10) + 1;
    onChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = parseInt(gamepadQuantityNumber || "0", 10) - 1;
    onChange(newQuantity);
  };

  return (
    <div className={[styles.quantity, className].join(" ")}>
      <div
        className={styles.gamepadQuantityField}
        style={gamepadQuantityFieldStyle}
      >
        <div className={styles.gamepadQuantityValue}>
          <div
            className={styles.gamepadQuantityNumber}
            style={gamepadQuantityNumberStyle}
          >
            {gamepadQuantityNumber}
          </div>
        </div>
        <div className={styles.gamepadQuantityDropdown}>
          <img
            className={styles.dropUpSmallIcon}
            alt="Increase"
            src="/dropupsmall@2x.png"
            onClick={handleIncrement} // Increment quantity
          />
          <img
            className={styles.dropDownSmallIcon}
            alt="Decrease"
            src="/dropdownsmall.svg"
            onClick={handleDecrement} // Decrement quantity
          />
        </div>
      </div>
    </div>
  );
};

export default Quantity;
