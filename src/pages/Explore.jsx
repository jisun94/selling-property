import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="page-header">Explore</p>
      </header>
      <main>
        {/* slider */}
        <p className="explore-category-title">Categories</p>
        <div className="explore-categories">
          <Link to="/category/rent">
            <img
              className="explore-category-img"
              src={rentCategoryImage}
              alt="rent"
            />
            <p className="explore-category-text">Places for rent</p>
          </Link>
          <Link to="/category/sell">
            <img
              className="explore-category-img"
              src={sellCategoryImage}
              alt="rent"
            />
            <p className="explore-category-text">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
