import type { NextPage } from "next";
import CouponCode from "./coupon-code";
import Button from "./button";
import styles from "./checkout.module.css";

export type CheckoutType = {
  className?: string;
};

const Checkout: NextPage<CheckoutType> = ({ className = "" }) => {
  return (
    <div className={[styles.checkout, className].join(" ")}>
      <section className={styles.mainContent}>
        <div className={styles.productListing}>
          <div className={styles.productItems}>
            <div className={styles.gamepadCartSmall}>
              <img
                className={styles.g922500x5001Icon}
                loading="lazy"
                alt=""
                src="/g922500x500-1@2x.png"
              />
            </div>
            <div className={styles.productPricing}>
              <a className={styles.lcdMonitor}>LCD Monitor</a>
              <a className={styles.priceSeparator}>$650</a>
            </div>
          </div>
          <div className={styles.productItems1}>
            <div className={styles.gamepadCartSmall}>
              <img
                className={styles.g27cq4500x5001Icon}
                loading="lazy"
                alt=""
                src="/g27cq4500x500-1@2x.png"
              />
            </div>
            <div className={styles.lcdMonitorParent}>
              <div className={styles.lcdMonitor1}>H1 Gamepad</div>
              <a className={styles.priceSeparator}>$1100</a>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.orderSummary}>
        <div className={styles.summaryDetails}>
          <div className={styles.summaryValuesParent}>
            <div className={styles.summaryValues}>
              <div className={styles.summaryItems}>
                <div className={styles.subtotalParent}>
                  <div className={styles.subtotal}>Subtotal:</div>
                  <div className={styles.subtotalValue}>$1750</div>
                </div>
                <img
                  className={styles.underlineIcon}
                  loading="lazy"
                  alt=""
                  src="/underline.svg"
                />
              </div>
              <div className={styles.subtotalParent}>
                <a className={styles.shipping}>Shipping:</a>
                <a className={styles.free}>Free</a>
              </div>
            </div>
            <img
              className={styles.underlineIcon}
              loading="lazy"
              alt=""
              src="/underline.svg"
            />
          </div>
          <div className={styles.subtotalParent}>
            <a className={styles.total}>Total:</a>
            <div className={styles.subtotalValue}>$1750</div>
          </div>
        </div>
      </section>
      <div className={styles.paymentOptions}>
        <div className={styles.paymentSelection}>
          <img
            className={styles.radioButtonIcon}
            loading="lazy"
            alt=""
            src="/radio-button.svg"
          />
          <div className={styles.cashOnDelivery}>Cash on delivery</div>
        </div>
      </div>
      <CouponCode
        viewAllProducts="Apply Coupon"
        propBackgroundColor="#db4444"
        propBorder="unset"
        propColor="#fafafa"
        propMinWidth="115px"
        propDisplay="inline-block"
      />
      <div className={styles.paymentOptions}>
        <Button viewAllProducts="Place Order" />
      </div>
    </div>
  );
};

export default Checkout;
