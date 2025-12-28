import React from "react";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h2>order your favourite food her</h2>
        <p>
          choose from a diverse menu featuring a delectable array of dishes
          crafited with finest ingredient and culinary expertise.our mission is
          to satisfy your carving and elivate your dining experience ,one
          delicious meal at a time
        </p>
        <a href="#food-display"><button>View Menu</button></a>
      </div>
    </div>
  );
}

export default Header;
