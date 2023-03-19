import "./Card.scss";

const Card = ({ product }) => {
    return (
        <div className="product-card">
            <div className="thumbnail">
                <img src={product.image} alt="" />
            </div>
            <div className="prod-details">
                <span className="name">{product.title}</span>
                <span className="price">&#x9F3;{product.price}</span>
            </div>
        </div>
    );
};

export default Card;
