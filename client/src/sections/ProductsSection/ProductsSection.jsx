import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ProductsSection.scss";
import Card from '../../components/Card/Card'

const ProductsSection = ({ innerPage, headingText }) => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/api/v1/products');
            const data = await response.json();
            console.log(data);
            setProducts(data.products);
            setVisibleProducts(data.products.slice(0, 8));
        }
        fetchData();
    }, []);

    const handleShowMore = () => {
        setVisibleProducts(products);
    };

    return (
        <div className="products-container">
            {
                !innerPage &&
                <div className="sec-heading">{headingText}</div>
            }
            <div className="products">
                {visibleProducts.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>

            {visibleProducts.length < products.length && (
                <button className='show_more' onClick={handleShowMore}>Show More</button>
            )}
            <Link to='/products'>
                <div className='link-to-products'>
                    View All Products
                </div>
            </Link>
        </div>
    );
};

export default ProductsSection;
