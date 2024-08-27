import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductBanner from "../components/product-banner";
import CategoryContainer from "../components/category-container";
import Button1 from "../components/button1";
import ProductRows from "../components/product-rows";
import ProductRowThree from "../components/product-row-three";
import Cart1 from '../components/cart1'; 
import styles from "./index.module.css";
import ScrollToTopButton from "../components/fillWithUpArrow";
import { Product } from '../context/Product';



interface Props {
  products: Product[];
}

const HomePage: NextPage<Props> = ({ products }) => {
  // products = [{id: 1, name: 'Product 1', price: '100', images: 'https://via.placeholder.com/150'}, {id: 2, name: 'Product 2', price: '200', images: 'https://via.placeholder.com/150'}, {id: 3, name: 'Product 3', price: '300', images: 'https://via.placeholder.com/150'}];
  console.log('Products:', products); // Log products to see the image paths and other details

  return (
    <div className={styles.homepage}>
      <header className={styles.frameParent}>
        <div className={styles.headerWrapper}>
          {/* <Header /> */}
        </div>
        {/* <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/line-3.svg"
        /> */}
      </header>
      <div>
      <h1>Product List</h1>
      <ProductList products={products} />
    </div>
      <div className={styles.contentAreaWrapper}>
        <div className={styles.contentArea}>
          <div className={styles.productBannerWrapper}>
          <ScrollToTopButton />
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
            {/* <ProductRows />
          <div className={styles.rowDividerOne}>
            <div className={styles.rowDividerOneChild} />
          </div>
          <div className={styles.productRowTwo}>
            {products.map((product) => (
            <>
            {products.length > 0 ? (
              products.map((product) => (
                <Cart1
                  key={product.id}
                  zAH9D56260021000000Ligh={product.images} // Ensure this is correct
                  productName={product.name}
                  productPrice={product.price}
                  propPadding="unset"
                />
              ))
            ) : (
              <p>No products available.</p>
            )}
  
                  </>
          ))}
          </div> */}
          <ProductRowThree />
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/');
    console.log('Response Data:', response.data); 
    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default HomePage;
