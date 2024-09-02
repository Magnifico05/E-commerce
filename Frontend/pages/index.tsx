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
  console.log('Products:', products); // Log products to see the image paths and other details

  return (
    <div className={styles.homepage}>
      <header className={styles.frameParent}>
       
      </header>
      <div>
      <h1>Product List</h1>
      <ProductList products={products} /> 
      <ScrollToTopButton />
    </div> 
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
