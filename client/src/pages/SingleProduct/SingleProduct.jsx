import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProduct.scss';
import Tab from '../../components/Tab/Tab';

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Quantity input fuction
    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    // decrement
    function handleDecrement() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    // increment
    function handleIncrement() {
        setQuantity(quantity + 1);
    }

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
        <div class="single-product container">
            {product && (
                <>
                    <div className="product">
                        {/* Left */}
                        <div class="product-image">
                            <img src={product.image} alt="Product Image" />
                        </div>

                        {/* Right */}
                        <div class="product-info">

                            <h1 class="product-title">{product.title}</h1>
                            <h3 class="product-price">${product.price}</h3>
                            <div className='product-features'>
                                {product.features}
                            </div>

                            <form class="product-form">
                                <div className="product-input">
                                    <i class="fa-solid fa-minus icon" onClick={handleDecrement}></i>
                                    <input type="number"
                                        name="product-quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        readOnly
                                    />
                                    <i class="fa-solid fa-plus icon" onClick={handleIncrement} ></i>
                                </div>
                                <button type="submit" class="add-to-cart-button btn">Add to Cart</button>
                            </form>

                        </div>
                    </div>

                    {/* Description */}
                    <Tab description={product.description} />
                </>
            )}
        </div>
    )

}

export default SingleProduct