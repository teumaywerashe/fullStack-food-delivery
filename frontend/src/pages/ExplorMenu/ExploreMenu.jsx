import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../asset/assets";
const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div id="explore-menu" className="explor-menu">
      <h1>Explore our Menu</h1>
      <p className="explor-menu-text">
        featuring a delectable array of dishes crafited with finest ingredient
        and culinary expertise.our mission is to satisfy your carving and
        elivate your dining experience ,one delicious meal at a time
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setcategory((prev) =>
                  item.menu_name === prev ? "All" : item.menu_name
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img
                className={item.menu_name === category ? "active" : ""}
                src={item.menu_image}
                alt="image"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
