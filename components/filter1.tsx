import type { NextPage } from "next";
import CategoryList from "./category-list";
import ButtonPrimary from "./button-primary";
import InputText from "./input-text";
import styles from "./filter1.module.css";

export type Filter1Type = {
  className?: string;
};

const Filter1: NextPage<Filter1Type> = ({ className = "" }) => {
  return (
    <form className={[styles.filter, className].join(" ")}>
      <div className={styles.product}>
        <h2 className={styles.filter1}>Filter</h2>
        <img
          className={styles.iconX}
          loading="lazy"
          alt=""
          src="/icon--x.svg"
        />
      </div>
      <div className={styles.categories}>
        <a className={styles.category}>Category</a>
        <CategoryList />
      </div>
      <div className={styles.sorting}>
        <a className={styles.sortBy}>Sort By</a>
        <div className={styles.sortOptions}>
          <div className={styles.sortButtons}>
            <ButtonPrimary
              propWidth="unset"
              propPadding="unset"
              propBackgroundColor="unset"
              propBorder="unset"
              propFlex="unset"
            />
            <ButtonPrimary
              propWidth="79px"
              propPadding="unset"
              propBackgroundColor="unset"
              propBorder="unset"
              propFlex="unset"
            />
            <ButtonPrimary
              propWidth="74px"
              propPadding="unset"
              propBackgroundColor="unset"
              propBorder="unset"
              propFlex="unset"
            />
          </div>
          <div className={styles.sortButtons1}>
            <ButtonPrimary
              propWidth="unset"
              propPadding="8px 13px"
              propBackgroundColor="#fff"
              propBorder="1px solid #7f7f7f"
              propFlex="1"
              addToCart="High Price"
              propMinWidth="68px"
              propFontWeight="unset"
              propColor="#000"
            />
            <ButtonPrimary
              propWidth="unset"
              propPadding="8px 14px"
              propBackgroundColor="#fff"
              propBorder="1px solid #7f7f7f"
              propFlex="1"
              addToCart="Low Price"
              propMinWidth="64px"
              propFontWeight="unset"
              propColor="#000"
            />
            <div className={styles.buttonPrimary}>
              <div className={styles.addToCart}>specfication</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.priceRange}>Price Range</div>
        <div className={styles.priceInput}>
          <InputText />
          <InputText />
        </div>
      </div>
      <ButtonPrimary />
    </form>
  );
};

export default Filter1;
