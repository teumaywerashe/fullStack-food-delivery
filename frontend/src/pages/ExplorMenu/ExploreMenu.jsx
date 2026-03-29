import { useContext } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/ContextProvider";

const ExploreMenu = ({ category, setcategory }) => {
  const { food_list } = useContext(StoreContext);

  // Derive unique categories from actual food data
  const categories = [...new Set(food_list.map((item) => item.category))].filter(Boolean);

  return (
    <div id="explore-menu" className="explor-menu">
      <h1>Explore our Menu</h1>
      <p className="explor-menu-text">
        Choose from a wide variety of dishes crafted with the finest ingredients.
        Filter by category to find exactly what you're craving.
      </p>
      <div className="explore-menu-list">
        <button
          onClick={() => setcategory("All")}
          className={`explore-menu-btn ${category === "All" ? "active" : ""}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setcategory((prev) => (prev === cat ? "All" : cat))}
            className={`explore-menu-btn ${category === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
