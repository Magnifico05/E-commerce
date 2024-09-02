import React, { useState } from 'react';
import { Product } from '../context/Product';
import styles from './ProductList.module.css';
import { useCart } from '../context/CartContext';


interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const [animate, setAnimate] = useState<{ [key: number]: boolean }>({});
    const { addToCart } = useCart();

    return (
        <div className={styles.productList}>
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.images} alt={product.name} className={styles.productImage} />
            <a href='product-details-page'>
            <h3 className={styles.productName}>{product.name}</h3>
            </a>
            <p className={styles.productPrice}>${product.price}</p>
            <div className={styles.cartIcon}  onClick={() => addToCart(product.id,1)}>
              <img src="/add-to-cart-button.svg" alt="Add to Cart" />
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
