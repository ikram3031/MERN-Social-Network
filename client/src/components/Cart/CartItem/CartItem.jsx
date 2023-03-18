import React, { useContext } from "react";
import { Context } from "../../../utils/context";
import { MdClose } from "react-icons/md";

// import prod from "../../../assets/products/earbuds-prod-3.webp";

import "./CartItem.scss";

const CartItem = () => {
    return (
        <div className="cart-products">
            <div className="cart-product">
                <div className="image-container">
                    <img src='https://www.portotheme.com/magento2/porto/pub/media/catalog/product/cache/1ab48d32e9bd277ac1c930b6b5f97eee/s/h/shop14_product2.jpeg' alt="" />
                </div>

                <div className="prod-details">
                    <span className="name">product name</span>
                    <MdClose className="close-btn" />
                    <div className="quantity-buttons">
                        <span>-</span>
                        <span>5</span>
                        <span>+</span>
                    </div>
                    <div className="text">
                        <span>3</span>
                        <span>x</span>
                        <span>&#x9F3;500</span>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CartItem;
