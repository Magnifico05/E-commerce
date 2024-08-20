import type { NextPage } from "next";
import ItemTemplate from "./item-template";
import styles from "./product-row-three.module.css";

export type ProductRowThreeType = {
  className?: string;
};

const ProductRowThree: NextPage<ProductRowThreeType> = ({ className = "" }) => {
  return (
    <footer className={[styles.productRowThree, className].join(" ")}>
      <ItemTemplate
        propAlignSelf="unset"
        propFlex="1"
        propMinWidth="248px"
        zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
        propPadding="unset"
      />
      <ItemTemplate
        propAlignSelf="unset"
        propFlex="1"
        propMinWidth="248px"
        zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
        propPadding="unset"
      />
      <ItemTemplate
        propAlignSelf="unset"
        propFlex="1"
        propMinWidth="248px"
        zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
        propPadding="unset"
      />
      <div className={styles.productRowFour}>
        <ItemTemplate zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png" />
        <div className={styles.moreProducts}>
          {/* <img
            className={styles.fillWithUpArrow}
            loading="lazy"
            alt=""
            src="/fill-with-up-arrow.svg"
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default ProductRowThree;
