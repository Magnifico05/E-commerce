import type { NextPage } from "next";
import ProductBanner from "./product-banner";
import CategoryPhone from "./category-phone";
import styles from "./category-container.module.css";

export type CategoryContainerType = {
  className?: string;
};

const CategoryContainer: NextPage<CategoryContainerType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.categoryContainer, className].join(" ")}>
      <div className={styles.categoryHeader}>
        <div className={styles.headerRow}>
          <ProductBanner
            propFlex="unset"
            propPadding="unset"
            ourProducts="Categories"
            propMinWidth="90px"
            propTextDecoration="none"
            exploreOurProducts="Browse By Category"
          />
          <div className={styles.navigationButtons}>
            <img
              className={styles.fillWithLeftArrow}
              loading="lazy"
              alt=""
              src="/fill-with-left-arrow.svg"
            />
            <img
              className={styles.fillWithLeftArrow}
              loading="lazy"
              alt=""
              src="/fill-with-right-arrow.svg"
            />
          </div>
        </div>
        <div className={styles.categoryList}>
          <CategoryPhone
            categoryHeadphone="/categorycellphone.svg"
            headPhones="Phones"
            propMinWidth="59px"
          />
          <CategoryPhone
            categoryHeadphone="/categorycomputer.svg"
            headPhones="Computers"
            propMinWidth="91px"
          />
          <CategoryPhone
            categoryHeadphone="/categoryheadphone.svg"
            headPhones="HeadPhones"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;
