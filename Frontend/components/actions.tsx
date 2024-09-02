import type { NextPage } from "next";
import React from "react";
import Button from "./button";
import CouponCode from "./coupon-code";
import FrameComponent from "./frame-component";
import styles from "./actions.module.css";

export type ActionsType = {
  className?: string;
};


const Actions: NextPage<ActionsType> = ({ className = "" }) => {
  return (
    <div className={[styles.actions, className].join(" ")}>
      <div className={styles.viewProducts}>
        {/* <a href="/">
        <Button
          propBackgroundColor="unset"
          propBorder="1px solid rgba(0, 0, 0, 0.5)"
          viewAllProducts="Return To Shop"
          propColor="#000"
          propMinWidth="122px"
          propDisplay="inline-block"
        />
        </a> */}
        {/* <CouponCode
          propFlexWrap="unset"
          viewAllProducts="Apply Coupon"
          propBackgroundColor="#db4444"
          propBorder="unset"
          propColor="#fafafa"
          propMinWidth="115px"
          propDisplay="inline-block"
        /> */}
      </div>
      <div className={styles.buttonParent}>
        {/* <Button
          propBackgroundColor="unset"
          propBorder="1px solid rgba(0, 0, 0, 0.5)"
          viewAllProducts="Update Cart"
          propColor="#000"
          propMinWidth="99px"
          propDisplay="inline-block"
        /> */}
        {/* <FrameComponent /> */}
      </div>
    </div>
  );
};

export default Actions;
