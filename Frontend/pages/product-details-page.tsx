import type { NextPage } from "next";
import Header from "../components/header";
import Button1 from "../components/button1";
import styles from "./product-details-page.module.css";

const ProductDetailsPage: NextPage = () => {
  return (
    <div className={styles.productDetailsPage}>
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
      <div className={styles.breadcrumb}>
        <div className={styles.arrowBackParent}>
          <img
            className={styles.arrowBackIcon}
            loading="lazy"
            alt=""
            src="/arrow-back.svg"
          />
          <div className={styles.backLabel}>
            <h3 className={styles.back}>Back</h3>
          </div>
        </div>
      </div>
      <section className={styles.productContentWrapper}>
        <div className={styles.productContent}>
          <div className={styles.image63Wrapper}>
            <img
              className={styles.image63Icon}
              loading="lazy"
              alt=""
              src="/image-63@2x.png"
            />
          </div>
          <div className={styles.detailsParent}>
            <div className={styles.details}>
              <div className={styles.productNameParent}>
                <div className={styles.productName}>
                  <h1 className={styles.dualsense5}>Dualsense 5</h1>
                </div>
                <div className={styles.availability}>
                  <div className={styles.stockDetails}>
                    <div className={styles.stockDetailsChild} />
                    <div className={styles.stockInfo}>
                      <div className={styles.inStock}>
                        <div className={styles.inStock1}>In Stock</div>
                      </div>
                      <div className={styles.placeholder}>
                        <div className={styles.div}>$192.00</div>
                      </div>
                      <div className={styles.brandModelColorContainer}>
                        <p className={styles.brand}>Brand:</p>
                        <p className={styles.brand}>Model:</p>
                        <p className={styles.brand}>Color:</p>
                        <p className={styles.brand}>Weight:</p>
                        <p className={styles.brand}>Dimensions:</p>
                        <p className={styles.brand}>Category:</p>
                        <p className={styles.brand}>Specifications:</p>
                        <p className={styles.brand}>&nbsp;</p>
                        <p className={styles.brand}>Description:</p>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className={styles.underlineIcon}
                  loading="lazy"
                  alt=""
                  src="/underline1.svg"
                />
              </div>
            </div>
            <div className={styles.quantityParent}>
              <div className={styles.quantity}>
                <div className={styles.decrement}>
                  <img
                    className={styles.iconMinus}
                    loading="lazy"
                    alt=""
                    src="/iconminus.svg"
                  />
                </div>
                <div className={styles.quantityDisplay}>
                  <div className={styles.quantityValue}>2</div>
                </div>
                <img
                  className={styles.incrementIcon}
                  loading="lazy"
                  alt=""
                  src="/frame-907.svg"
                />
              </div>
              <div className={styles.cartButtonWrapper}>
                <div className={styles.cartButton}>
                  <Button1 addToCart="Add to cart" />
                  <img className={styles.cart1Icon} alt="" src="/cart1.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
