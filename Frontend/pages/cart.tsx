import type { NextPage } from "next";
import CartMainSection from "../components/cart-main-section";
import CartSection from "../components/cart-section";
import Actions from "../components/actions";
import styles from "./cart.module.css";

const Cart: NextPage = () => {
  return (
    <div className={styles.cart}>
      <CartMainSection />
      <CartSection
        propPosition="relative"
        g922500x5001="/g27cq4500x500-1@2x.png"
        propHeight="72.22%"
        propWidth="92.59%"
        propTop="14.81%"
        propRight="3.7%"
        propBottom="12.96%"
        propLeft="3.7%"
        lCDMonitor="LCD Monitor"
        propMinWidth="96px"
        propWidth1="146px"
        gamepadDivider="$650"
        propWidth2="176px"
        prop="$650"
        iconCancel1
        propPosition1="absolute"
        propMargin="0 !important"
        propTop1="20px"
        propLeft1="30px"
        gamepadQuantityNumber="01"
        propGap="16px"
        propMinWidth1="16px"
      />
      <section className={styles.cartSectionParent}>
        <CartSection
          g922500x5001="/g922500x500-1@2x.png"
          lCDMonitor="H1 Gamepad"
          gamepadDivider="$550"
          prop="$1100"
          iconCancel1={false}
          gamepadQuantityNumber="02"
        />
        <Actions />
      </section>
    </div>
  );
};

export default Cart;
