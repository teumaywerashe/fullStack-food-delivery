import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
function Navbar({ setShowLogin }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { token, setToken, searchTerm, setSearchTerm, getTotalCart } =
    useContext(StoreContext);
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
        <img
          onClick={() => setShowSearchBar(!showSearchBar)}
          src={assets.search_icon}
          alt=""
        />

        {token && (
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            {getTotalCart() > 0 && <div className="dot">{getTotalCart()}</div>}
          </div>
        )}

        {!token ? (
          <div className="sign-in">
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="navbar-signin-button"
            >
              sign in
            </button>
          </div>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myOrders")}>
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
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className="small-media-toggle-button"
        >
          {open ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>
        {open && (
          <div className="small-media-menu-container">
            <ul className="small-media-menu">
              <Link
                to="/"
                onClick={() => {
                  setMenu("home");
                  setOpen(false);
                }}
                className={menu === "home" ? "active" : ""}
              >
                home
              </Link>
              <a
                href="#explore-menu"
                onClick={() => {
                  setMenu("menu");
                  setOpen(false);
                }}
                className={menu === "menu" ? "active" : ""}
              >
                menu
              </a>
              <a
                href="#app-download"
                onClick={() => {
                  setMenu("mobile-app"), setOpen(false);
                }}
                className={menu === "mobile-app" ? "active" : ""}
              >
                mobile-app
              </a>
              <a
                href="#footer"
                onClick={() => {
                  setMenu("contact-us"), setOpen(false);
                }}
                className={menu === "contact-us" ? "active" : ""}
              >
                contact us
              </a>
              <button
                onClick={() => {
                  setShowLogin(true);
                  setOpen(!open);
                }}
              >
                get started
              </button>
            </ul>
          </div>
        )}
      </div>
      {showSearchBar && (
        <div className="searchbar-container">
          <input
            placeholder="Enter the item you want to search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
          />
          <img
            onClick={() => setShowSearchBar(!showSearchBar)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
