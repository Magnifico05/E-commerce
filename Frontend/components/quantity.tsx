import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./quantity.module.css";

export type QuantityType = {
  className?: string;
  gamepadQuantityNumber?: string;

  /** Style props */
  propGap?: CSSProperties["gap"];
  propMinWidth?: CSSProperties["minWidth"];
};

const Quantity: NextPage<QuantityType> = ({
  className = "",
  propGap,
  gamepadQuantityNumber,
  propMinWidth,
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
            alt=""
            src="/dropupsmall@2x.png"
          />
          <img
            className={styles.dropDownSmallIcon}
            alt=""
            src="/dropdownsmall.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Quantity;
