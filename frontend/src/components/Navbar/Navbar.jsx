import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";

import { StoreContext } from "../../context/StoreContext";
import Logo from "../logo/Logo";
function Navbar({ setShowLogin }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const {
    token,
    searchTerm,
    notification,
    userId,
    showNotification,
    setShowNotification,
    setSearchTerm,
    getNotification,
    logOut,
    getTotalCart,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getNotification(userId);
    }
  }, [token]);

  const filtedNotifications = notification.filter(
    (not) => not.isRead === false
  );
  return (
    <div className="navbar">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="navbar-menu">
        <a
          href="#home"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </a>
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
        <FiSearch
          className="hidden sm:flex cursor-pointer"
          size={30}
          onClick={() => setShowSearchBar(!showSearchBar)}
        />

        {token && (
          <div className="navbar-search-icon">
            <Link to="/cart">
              <FiShoppingCart className="cursor-pointer" size={30} />
            </Link>

            {getTotalCart() > 0 && (
              <div className="dot  text-center min-w-5 sm:right-26  px-10 py-10 bg-red-500 rounded-full ">
                {getTotalCart()}
              </div>
            )}
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
          <>
            <div className="relative">
              {" "}
              <FiBell
                onClick={() => {
                  setShowNotification(!showNotification);
                }}
                className="cursor-pointer"
                size={30}
              />
              {filtedNotifications.length > 0 && (
                <p className="absolute -right-1 text-center -top-3  min-w-5 px-10 py-10 bg-red-500 rounded-full">
                  {filtedNotifications.length}
                </p>
              )}
            </div>

            <div className="hidden sm:flex navbar-profile">
              <FiUser size={30} />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myOrders")}>
                  <FiPackage />
                  orders
                </li>
                <hr />
                <li onClick={logOut}>
                  <FiLogOut />
                  logout
                </li>
              </ul>
            </div>
          </>
        )}
        <div className="mobile-toggle">
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
                <div className="flex items-center gap-20 justify-space-between mb-4">
                 {token &&   <div className="flex relative navbar-profile">
                    <FiUser size={30} />
                    <ul className="hidden -right-20 absolute navbar-profile-dropdown">
                      <li onClick={() => navigate("/myOrders")}>
                        <FiPackage />
                        orders
                      </li>
                      <hr />
                      <li onClick={logOut}>
                        <FiLogOut />
                        logout
                      </li>
                    </ul>
                  </div>}
                  <FiSearch
                    onClick={() => {
                      setShowSearchBar(!showSearchBar);
                      setOpen(false);
                    }}
                    size={30}
                  />
                </div>
                {token ? (
                  <button
                    onClick={() => {
                      logOut();

                      setOpen(!open);
                    }}
                  >
                    logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setOpen(!open);
                    }}
                  >
                    get started
                  </button>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {showSearchBar && (
        <div className="searchbar-container">
          <input
            placeholder="Enter the item you want to search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
          />
          <FiX size={26} onClick={() => setShowSearchBar(!showSearchBar)} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
