import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./category-phone.module.css";

export type CategoryPhoneType = {
  className?: string;
  categoryHeadphone?: string;
  headPhones?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
};

const CategoryPhone: NextPage<CategoryPhoneType> = ({
  className = "",
  categoryHeadphone,
  headPhones,
  propMinWidth,
}) => {
  const headPhonesStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className={[styles.categoryPhone, className].join(" ")}>
      <div className={styles.categoryHeadphoneWrapper}>
        <img
          className={styles.categoryHeadphoneIcon}
          loading="lazy"
          alt=""
          src={categoryHeadphone}
        />
      </div>
      <div className={styles.headphones} style={headPhonesStyle}>
        {headPhones}
      </div>
    </div>
  );
};

export default CategoryPhone;
