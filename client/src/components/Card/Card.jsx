import { Link } from 'react-router-dom'
import "./Card.scss";

const Card = ({ product }) => {
    return (
        <Link className='product-card' to={`/products/${product._id}`}>

            <div className="thumbnail">
                <img src={product.image} alt="" />
            </div>
            <div className="prod-details">
                <span className="name">{product.title}</span>
                <span className="price">&#x9F3;{product.price}</span>
            </div>

        </Link>
    );
};

export default Card;
