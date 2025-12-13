import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filtered_items=food_list.filter(food=>food.category===category||category==='All')

  return (
    <div id="food-display" className="food-display">
      <h2>Top Dishes near You</h2>
      <div className="food-display-list">
        {filtered_items.length > 0 ? (
          filtered_items.map((item, index) => {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              );
            // }
          })
        ) : (
         <div className="no-item">
          <h3>no items found with this category</h3>
          <p> change your category or check your connection and try again</p>
         </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
