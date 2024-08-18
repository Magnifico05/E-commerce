import type { NextPage } from "next";
import Header from "../components/header";
import ProductBanner from "../components/product-banner";
import CategoryContainer from "../components/category-container";
import Button1 from "../components/button1";
import ProductRows from "../components/product-rows";
import ItemTemplate from "../components/item-template";
import ProductRowThree from "../components/product-row-three";
import styles from "./home-page.module.css";

const HomePage: NextPage = () => {
  return (
    <div className={styles.homepage}>
      <header className={styles.frameParent}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/line-3.svg"
        />
      </header>
      <div className={styles.contentAreaWrapper}>
        <div className={styles.contentArea}>
          <div className={styles.productBannerWrapper}>
            <ProductBanner
              ourProducts="Our Products"
              exploreOurProducts="Explore Our Products"
            />
          </div>
        </div>
      </div>
      <main className={styles.categoryContentWrapper}>
        <section className={styles.categoryContent}>
          <CategoryContainer />
          <div className={styles.featuredProducts}>
            <div className={styles.featuredContent}>
              <div className={styles.featuredHeader}>
                <div className={styles.titleRow}>
                  <div className={styles.viewAllButton}>
                    <Button1
                      propPosition="unset"
                      propTop="unset"
                      propLeft="unset"
                      propPadding="16px 48px"
                      propHeight="unset"
                      addToCart="View All Products"
                      propDisplay="unset"
                      propMinWidth="unset"
                      propTextDecoration="unset"
                    />
                  </div>
                  <div className={styles.titleRowChild} />
                </div>
              </div>
              <div className={styles.productGrid}>
                <div className={styles.gridHeader}>
                  <h1 className={styles.bestSellingProducts}>
                    Best Selling Products
                  </h1>
                </div>
                <Button1
                  propPosition="unset"
                  propTop="unset"
                  propLeft="unset"
                  propPadding="16px 48px"
                  propHeight="unset"
                  addToCart="View All"
                  propDisplay="inline-block"
                  propMinWidth="63px"
                  propTextDecoration="none"
                />
              </div>
            </div>
          </div>
          <ProductRows />
          <div className={styles.rowDividerOne}>
            <div className={styles.rowDividerOneChild} />
          </div>
          <div className={styles.productRowTwo}>
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
            <ItemTemplate
              propAlignSelf="unset"
              propFlex="1"
              propMinWidth="248px"
              zAH9D56260021000000Ligh="/672462-zah9d-5626-002-100-0000-lightthenorthfacexguccicoat-1@2x.png"
              propPadding="unset"
            />
          </div>
          <ProductRowThree />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
