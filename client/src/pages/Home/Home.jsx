import "./Home.scss";
import Banner from './Banner/Banner';
import Category from "./Category/Category";
import ProductsSection from "../../sections/ProductsSection/ProductsSection";

const Home = () => {
    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category />
                    <ProductsSection headingText="Popular Products" />
                </div>
            </div>

        </div>
    );
};

export default Home;
