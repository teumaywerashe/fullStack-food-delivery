import React from "react";
import "./ExploreMenu.css";

import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useEffect } from "react";
import { menus } from "../../assets/assets.js";

const menu_images = {

  "Hot Drink": menus.menu_2,
  "Non Festin(Yefisg)":menus.menu_3,
  "Festing(Yetsom)":menus.menu_5,
  "Soft Drink": menus.menu_4,
  "Alcoholic Drink": menus.menu_1,
  "Fresh Food":menus.menu_6,
};

const ExploreMenu = ({ category, setcategory }) => {
  const { menulistData } = useContext(StoreContext);
  useEffect(() => {
    console.log(menulistData);
  }, [menulistData]);
  return (
    <div id="explore-menu" className="explor-menu">
      <h1>Explore our Menu</h1>
      <p className="explor-menu-text">
        featuring a delectable array of dishes crafited with finest ingredient
        and culinary expertise.our mission is to satisfy your carving and
        elivate your dining experience ,one delicious meal at a time
      </p>
      <div className="flex items-center gap-8 text-center my-5 overflow-x-auto no-scrollbar py-4">
        {menulistData.map((item, index) => {
          const isActive = category === item;

          return (
            <div
              key={index}
              onClick={() =>
                setcategory((prev) => (prev === item ? "All" : item))
              }
              className="flex-shrink-0 cursor-pointer items-center mx-auto group"
            >
              {/* Image with Active Ring */}
              <div
                className={`relative p-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? "ring-4 ring-orange-500 scale-105"
                    : "hover:scale-105"
                }`}
              >
                <img
                  src={menu_images[item] || "default_image_url"}
                  alt={item}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm"
                />
              </div>

              {/* Menu Text */}
              <p
                className={`mt-3 text-sm md:text-base font-semibold transition-colors ${
                  isActive
                    ? "text-orange-600 underline underline-offset-8 decoration-2"
                    : "text-slate-600 group-hover:text-slate-900"
                }`}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
