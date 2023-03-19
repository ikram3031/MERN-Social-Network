import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProduct.scss'

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
                setProduct(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div class="single-product">
            {product && (
                <>
                    <div class="product-image">
                        <img src={product.image} alt="Product Image" />
                    </div>
                    <div class="product-info">
                        <h1 class="product-title">{product.title}</h1>
                        <h3 class="product-price">${product.price}</h3>
                        <p class="product-description">{product.description}</p>
                        <div>
                            <span>Features:</span>
                            {product.features}
                        </div>
                        <form class="product-form">
                            <label for="product-quantity">Quantity:</label>
                            <input type="number" id="product-quantity" name="product-quantity" min="1" max="10" value="1" />
                            <button type="submit" class="add-to-cart-button">Add to Cart</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    )

}

export default SingleProduct