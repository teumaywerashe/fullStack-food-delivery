import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../ExplorMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Notification from "../../components/notification/Notification";
const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <div>
      <Header />
      <div className="menu-section">
        <ExploreMenu category={category} setcategory={setcategory} />
        <FoodDisplay category={category} />
      </div>
      <AppDownload />
    </div>
  );
};

export default Home;
