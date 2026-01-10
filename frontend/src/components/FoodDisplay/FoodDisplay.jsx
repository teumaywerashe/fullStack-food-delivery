import React, { useContext, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list, fetchFoodList, searchTerm } = useContext(StoreContext);
  useEffect(() => {
    fetchFoodList();
    // console.log("food_list",food_list);
  }, []);

  const filtered_items = food_list.filter((food) => {
    const filteredCategory = food.category === category || category === "All";



    const searchedTerm = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return filteredCategory && searchedTerm;
  });
// console.log("filtered-items",filtered_items);
  return (
    <div id="food-display" className="food-display">
      <h2>Top Dishes near You</h2>
      {filtered_items.length > 0 ? (
        <div className="food-display-list">
          {filtered_items.map((item, index) => {
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
          })}
        </div>
      ) : (
        <div className="no-item">
          <h1>No items found!</h1>
          <p>
            Change your category or check your internet connection and try
            again.
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
