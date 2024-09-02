import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Quantity from "./quantity";
import styles from "./cart-section.module.css";

export type CartItem = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    // image_url: string;
  };
  quantity: number;
};

// export type QuantityType = {
//   propGap?: string;
//   gamepadQuantityNumber?: string;
//   propMinWidth?: string;
//   onChange: (newQuantity: number) => void; // Add this line
// };


export type CartSectionType = {
  className?: string;
  cartItem: CartItem; // Added prop
  onQuantityChange: (id: number, newQuantity: number) => void; // Added prop
  // g922500x5001?: string;
  lCDMonitor?: string;
  gamepadDivider?: string;
  prop?: string;
  iconCancel1?: boolean;
  gamepadQuantityNumber?: string;
  propGap?: string;
  propMinWidth1?: string;

  /** Style props */
  propPosition?: CSSProperties["position"];
  propHeight?: CSSProperties["height"];
  propWidth?: CSSProperties["width"];
  propTop?: CSSProperties["top"];
  propRight?: CSSProperties["right"];
  propBottom?: CSSProperties["bottom"];
  propLeft?: CSSProperties["left"];
  propMinWidth?: CSSProperties["minWidth"];
  propWidth1?: CSSProperties["width"];
  propWidth2?: CSSProperties["width"];
  propPosition1?: CSSProperties["position"];
  propMargin?: CSSProperties["margin"];
  propTop1?: CSSProperties["top"];
  propLeft1?: CSSProperties["left"];
};

const CartSection: NextPage<CartSectionType> = ({
  className = "",
  cartItem,
  onQuantityChange,
  propPosition,
  // g922500x5001,
  propHeight,
  propWidth,
  propTop,
  propRight,
  propBottom,
  propLeft,
  lCDMonitor,
  propMinWidth,
  propWidth1,
  gamepadDivider,
  propWidth2,
  prop,
  iconCancel1,
  propPosition1,
  propMargin,
  propTop1,
  propLeft1,
  gamepadQuantityNumber,
  propGap,
  propMinWidth1,
}) => {
  const cartSectionStyle: CSSProperties = useMemo(() => {
    return {
      position: propPosition,
    };
  }, [propPosition]);

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(cartItem.id, newQuantity);
  };

  const g922500x5001IconStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      width: propWidth,
      top: propTop,
      right: propRight,
      bottom: propBottom,
      left: propLeft,
    };
  }, [propHeight, propWidth, propTop, propRight, propBottom, propLeft]);

  const lCDMonitorStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const gamepadSeparatorStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  const gamepadQuantityStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth2,
    };
  }, [propWidth2]);

  const iconCancelStyle: CSSProperties = useMemo(() => {
    return {
      position: propPosition1,
      margin: propMargin,
      top: propTop1,
      left: propLeft1,
    };
  }, [propPosition1, propMargin, propTop1, propLeft1]);

  return (
    <div
      className={[styles.cartSection, className].join(" ")}
      style={cartSectionStyle}
    >
      <div className={styles.gamepadDetails}>
        <div className={styles.gamepadCartSmall}>
          {/* <img
            className={styles.g922500x5001Icon}
            loading="lazy"
            alt=""
            src={g922500x5001}
            style={g922500x5001IconStyle}
          /> */}
        </div>

        <div className={styles.gamepadName}>
          <div className={styles.lcdMonitor} style={lCDMonitorStyle}>
            {lCDMonitor}
          </div>
        </div>
      </div>
      <div className={styles.gamepadSeparator} style={gamepadSeparatorStyle}>
        <div className={styles.gamepadDivider}>{gamepadDivider}</div>
      </div>
      <div className={styles.gamepadQuantity} style={gamepadQuantityStyle}>
        {/* <Quantity
          propGap={propGap}
          gamepadQuantityNumber={cartItem.quantity.toString()} // Update the displayed quantity
          propMinWidth={propMinWidth1}
          onChange={(newQuantity) => onQuantityChange(cartItem.id, newQuantity)} // Handle quantity change
        /> */}
        <Quantity
          propGap="16px"
          gamepadQuantityNumber={cartItem.quantity.toString()}
          propMinWidth="16px"
          onChange={handleQuantityChange}
        />
      </div>
      <div className={styles.gamepadName}>
        <div className={styles.gamepadDivider}>{prop}</div>
      </div>
      {!iconCancel1 && (
        <img
          className={styles.iconCancel}
          alt=""
          src="/iconcancel.svg"
          style={iconCancelStyle}
        />
      )}
    </div>
  );
};

export default CartSection;


// import type { NextPage } from "next";
// import { useMemo, type CSSProperties } from "react";
// import Quantity from "./quantity";
// import styles from "./cart-section.module.css";

// export type CartSectionType = {
//   className?: string;
//   g922500x5001?: string;
//   lCDMonitor?: string;
//   gamepadDivider?: string;
//   prop?: string;
//   iconCancel1?: boolean;
//   gamepadQuantityNumber?: string;
//   propGap?: string;
//   propMinWidth1?: string;

//   /** Style props */
//   propPosition?: CSSProperties["position"];
//   propHeight?: CSSProperties["height"];
//   propWidth?: CSSProperties["width"];
//   propTop?: CSSProperties["top"];
//   propRight?: CSSProperties["right"];
//   propBottom?: CSSProperties["bottom"];
//   propLeft?: CSSProperties["left"];
//   propMinWidth?: CSSProperties["minWidth"];
//   propWidth1?: CSSProperties["width"];
//   propWidth2?: CSSProperties["width"];
//   propPosition1?: CSSProperties["position"];
//   propMargin?: CSSProperties["margin"];
//   propTop1?: CSSProperties["top"];
//   propLeft1?: CSSProperties["left"];
// };

// const CartSection: NextPage<CartSectionType> = ({
//   className = "",
//   propPosition,
//   g922500x5001,
//   propHeight,
//   propWidth,
//   propTop,
//   propRight,
//   propBottom,
//   propLeft,
//   lCDMonitor,
//   propMinWidth,
//   propWidth1,
//   gamepadDivider,
//   propWidth2,
//   prop,
//   iconCancel1,
//   propPosition1,
//   propMargin,
//   propTop1,
//   propLeft1,
//   gamepadQuantityNumber,
//   propGap,
//   propMinWidth1,
// }) => {
//   const cartSectionStyle: CSSProperties = useMemo(() => {
//     return {
//       position: propPosition,
//     };
//   }, [propPosition]);

//   const g922500x5001IconStyle: CSSProperties = useMemo(() => {
//     return {
//       height: propHeight,
//       width: propWidth,
//       top: propTop,
//       right: propRight,
//       bottom: propBottom,
//       left: propLeft,
//     };
//   }, [propHeight, propWidth, propTop, propRight, propBottom, propLeft]);

//   const lCDMonitorStyle: CSSProperties = useMemo(() => {
//     return {
//       minWidth: propMinWidth,
//     };
//   }, [propMinWidth]);

//   const gamepadSeparatorStyle: CSSProperties = useMemo(() => {
//     return {
//       width: propWidth1,
//     };
//   }, [propWidth1]);

//   const gamepadQuantityStyle: CSSProperties = useMemo(() => {
//     return {
//       width: propWidth2,
//     };
//   }, [propWidth2]);

//   const iconCancelStyle: CSSProperties = useMemo(() => {
//     return {
//       position: propPosition1,
//       margin: propMargin,
//       top: propTop1,
//       left: propLeft1,
//     };
//   }, [propPosition1, propMargin, propTop1, propLeft1]);

//   return (
//     <div
//       className={[styles.cartSection, className].join(" ")}
//       style={cartSectionStyle}
//     >
//       <div className={styles.gamepadDetails}>
//         <div className={styles.gamepadCartSmall}>
//           <img
//             className={styles.g922500x5001Icon}
//             loading="lazy"
//             alt=""
//             src={g922500x5001}
//             style={g922500x5001IconStyle}
//           />
//         </div>
//         <div className={styles.gamepadName}>
//           <div className={styles.lcdMonitor} style={lCDMonitorStyle}>
//             {lCDMonitor}
//           </div>
//         </div>
//       </div>
//       <div className={styles.gamepadSeparator} style={gamepadSeparatorStyle}>
//         <div className={styles.gamepadDivider}>{gamepadDivider}</div>
//       </div>
//       <div className={styles.gamepadQuantity} style={gamepadQuantityStyle}>
//         <Quantity
//           propGap={propGap}
//           gamepadQuantityNumber={gamepadQuantityNumber}
//           propMinWidth={propMinWidth1}
//         />
//       </div>
//       <div className={styles.gamepadName}>
//         <div className={styles.gamepadDivider}>{prop}</div>
//       </div>
//       {!iconCancel1 && (
//         <img
//           className={styles.iconCancel}
//           alt=""
//           src="/iconcancel.svg"
//           style={iconCancelStyle}
//         />
//       )}
//     </div>
//   );
// };

// export default CartSection;
