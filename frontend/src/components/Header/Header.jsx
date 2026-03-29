import React from "react";
import "./Header.css";

function Header() {
  return (
    <div id="home" className="header">
      {/* Decorative floating emojis */}
      <span className="header-deco header-deco-1">🍕</span>
      <span className="header-deco header-deco-2">🍔</span>
      <span className="header-deco header-deco-3">🌮</span>

      <div className="header-content">
   
        <h2>
          Order your <span>favourite food</span> right here
        </h2>
        <p>
          Choose from a diverse menu featuring delectable dishes crafted with
          the finest ingredients. Satisfy your cravings, one delicious meal at a time.
        </p>
        <a href="#food-display">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
}

export default Header;
