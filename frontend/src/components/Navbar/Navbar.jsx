import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
// import {assets} from '../../../../admin/src/assets/assets.js'

import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");

  const { token, setToken, getTotalCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="logo" alt="" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCart() > 0 ? (
            <div className="dot">{getTotalCart()}</div>
          ) : (
            ""
          )}
        </div>
        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
            className="navbar-button"
          >
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={()=>navigate('/myOrders')}>
                <img src={assets.bag_icon} alt="" />
                orders
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
