import type { NextPage } from "next";
import ItemTemplate from "./item-template";
import Cart1 from "./cart1";
import styles from "./product-rows.module.css";

export type Product = {
  id: number;
  imageUrl: string; // The URL of the product image
  name: string; // Product name (optional, if needed)
  price: string; // Product price (optional, if needed)
};

export type ProductRowsType = {
  className?: string;
  products: Product[]; // Array of product objects
};

const ProductRows: NextPage<ProductRowsType> = ({ className = "", products }) => {
  return (
    <div className={[styles.productRows, className].join(" ")}>
      <div className={styles.productRowOne}>
      {products.map((product) => (
          <Cart1
          key={product.id}
          imageUrl={product.imageUrl} 
          productName={product.name}
          productPrice={product.price}
          propPadding="0px 20px 0px 0px"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductRows;
