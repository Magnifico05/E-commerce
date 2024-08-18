import type { NextPage } from "next";
import ItemTemplate from "./item-template";
import styles from "./product-rows.module.css";

export type ProductRowsType = {
  className?: string;
};

const ProductRows: NextPage<ProductRowsType> = ({ className = "" }) => {
  return (
    <div className={[styles.productRows, className].join(" ")}>
      <div className={styles.productRowOne}>
        <ItemTemplate
          propAlignSelf="unset"
          propFlex="1"
          propMinWidth="248px"
          zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
          propPadding="0px 20px 0px 0px"
        />
        <ItemTemplate
          propAlignSelf="unset"
          propFlex="1"
          propMinWidth="248px"
          zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
          propPadding="0px 20px 0px 0px"
        />
        <ItemTemplate
          propAlignSelf="unset"
          propFlex="1"
          propMinWidth="248px"
          zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
          propPadding="0px 20px 0px 0px"
        />
        <ItemTemplate
          propAlignSelf="unset"
          propFlex="1"
          propMinWidth="248px"
          zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
          propPadding="0px 20px 0px 0px"
        />
      </div>
    </div>
  );
};

export default ProductRows;
