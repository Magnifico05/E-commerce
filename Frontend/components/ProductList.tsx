import React from 'react';
import { Product } from '../context/Product';


interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div>
            {products.length > 0 ? (
                <div className="product-list">
                    {products.map(product => (
                        <div key={product.id} className="product-item">
                            <img src={product.images} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
            <style jsx>{`
                .product-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                .product-item {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 16px;
                    width: 200px;
                    text-align: center;
                }
                .product-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                }
                .product-name {
                    font-size: 1.2em;
                    margin: 8px 0;
                }
                .product-price {
                    color: #555;
                }
            `}</style>
        </div>
    );
};

export default ProductList;
