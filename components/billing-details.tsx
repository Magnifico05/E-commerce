import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import styles from "./billing-details.module.css";

export type BillingDetailsType = {
  className?: string;
};

const BillingDetails: NextPage<BillingDetailsType> = ({ className = "" }) => {
  return (
    <div className={[styles.billingDetails, className].join(" ")}>
      <main className={styles.billingDetailsParent}>
        <h1 className={styles.billingDetails1}>Billing Details</h1>
        <section className={styles.addressFieldsParent}>
          <div className={styles.addressFields}>
            <a className={styles.firstName}>
              <span>First Name</span>
              <span className={styles.span}>*</span>
            </a>
            <div className={styles.addressFieldsChild} />
          </div>
          <div className={styles.addressFields1}>
            <div className={styles.companyName}>Company Name</div>
            <div className={styles.addressFieldsChild} />
          </div>
          <div className={styles.addressFields}>
            <div className={styles.streetAddress}>
              <span>Street Address</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.addressFieldsChild} />
          </div>
          <div className={styles.addressFields1}>
            <div className={styles.companyName}>
              Apartment, floor, etc. (optional)
            </div>
            <div className={styles.addressFieldsChild} />
          </div>
          <div className={styles.addressFields}>
            <div className={styles.towncity}>
              <span>Town/City</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.addressFieldsChild} />
          </div>
          <div className={styles.addressFields}>
            <div className={styles.phoneNumber}>
              <span>Phone Number</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.addressFieldsChild} />
          </div>
          <div className={styles.addressFields}>
            <div className={styles.emailAddress}>
              <span>Email Address</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.addressFieldsChild} />
          </div>
        </section>
      </main>
      <div className={styles.checkoutOptions}>
        <Form.Check className={styles.iconCheckboxFormcheck} label />
        <div className={styles.companyName}>
          Save this information for faster check-out next time
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
