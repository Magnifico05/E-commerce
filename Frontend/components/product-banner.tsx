import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./product-banner.module.css";

export type ProductBannerType = {
  className?: string;
  ourProducts?: string;
  exploreOurProducts?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propPadding?: CSSProperties["padding"];
  propMinWidth?: CSSProperties["minWidth"];
  propTextDecoration?: CSSProperties["textDecoration"];
};

const ProductBanner: NextPage<ProductBannerType> = ({
  className = "",
  propFlex,
  propPadding,
  ourProducts,
  propMinWidth,
  propTextDecoration,
  exploreOurProducts,
}) => {
  const productBannerStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  const bannerContentStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const ourProductsStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      textDecoration: propTextDecoration,
    };
  }, [propMinWidth, propTextDecoration]);

  return (
    <div
      className={[styles.productBanner, className].join(" ")}
      style={productBannerStyle}
    >
      <div className={styles.bannerContent} style={bannerContentStyle}>
        <div className={styles.imageShapeWrapper}>
          <div className={styles.imageShape} />
        </div>
        <div className={styles.ourProducts} style={ourProductsStyle}>
          {ourProducts}
        </div>
      </div>
      <h1 className={styles.exploreOurProducts}>{exploreOurProducts}</h1>
    </div>
  );
};

export default ProductBanner;
