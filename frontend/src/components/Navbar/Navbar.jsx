import React, { useContext, useEffect, useRef, useState } from "react";
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

import Logo from "../logo/Logo";
import { StoreContext } from "../../context/ContextProvider";

function Navbar({ setShowLogin }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

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
    if (token) getNotification(userId);
  }, [token]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtedNotifications = notification.filter((n) => !n.isRead);

  return (
    <div className="navbar">
      <Link to="/">
        <Logo />
      </Link>

      <ul className="navbar-menu">
        <a href="#home" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</a>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <FiSearch className="hidden sm:flex cursor-pointer" size={22} onClick={() => setShowSearchBar(!showSearchBar)} />

        {token && (
          <div className="navbar-search-icon">
            <Link to="/cart">
              <FiShoppingCart size={22} />
            </Link>
            {getTotalCart() > 0 && (
              <div className="dot">{getTotalCart()}</div>
            )}
          </div>
        )}

        {!token ? (
          <div className="sign-in">
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          </div>
        ) : (
          <>
            <div className="navbar-bell">
              <FiBell onClick={() => setShowNotification(!showNotification)} size={22} />
              {filtedNotifications.length > 0 && (
                <span className="bell-dot">{filtedNotifications.length}</span>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="navbar-profile" ref={profileRef}>
              <button
                className="profile-trigger"
                onClick={() => setShowProfileMenu((p) => !p)}
              >
                <div className="profile-avatar">
                  <FiUser size={16} />
                </div>
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header" style={{cursor:'pointer'}} onClick={() => { navigate("/profilePage"); setShowProfileMenu(false); }}>
                    <div className="profile-dropdown-avatar">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <p className="profile-dropdown-name">My Account</p>
                      <p className="profile-dropdown-sub">Manage your profile</p>
                    </div>
                  </div>
                  <hr className="profile-dropdown-divider" />
                  <button
                    className="profile-dropdown-item"
                    onClick={() => { navigate("/myOrders"); setShowProfileMenu(false); }}
                  >
                    <span className="profile-dropdown-icon orders"><FiPackage size={16} /></span>
                    My Orders
                  </button>
                  <hr className="profile-dropdown-divider" />
                  <button
                    className="profile-dropdown-item logout"
                    onClick={() => { logOut(); setShowProfileMenu(false); }}
                  >
                    <span className="profile-dropdown-icon"><FiLogOut size={16} /></span>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Mobile toggle */}
        <div className="mobile-toggle">
          <div onClick={() => setOpen(!open)} className="small-media-toggle-button">
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
          {open && (
            <div className="small-media-menu-container">
              <ul className="small-media-menu">
                <Link to="/" onClick={() => { setMenu("home"); setOpen(false); }} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => { setMenu("menu"); setOpen(false); }} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => { setMenu("mobile-app"); setOpen(false); }} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href="#footer" onClick={() => { setMenu("contact-us"); setOpen(false); }} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
                {token ? (
                  <>
                    <button onClick={() => { navigate("/myOrders"); setOpen(false); }} className="mobile-menu-item">
                      <FiPackage size={16} /> My Orders
                    </button>
                    <button onClick={() => { logOut(); setOpen(false); }} className="mobile-menu-item logout">
                      <FiLogOut size={16} /> Log Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setShowLogin(true); setOpen(false); }}>Get Started</button>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showSearchBar && (
        <div className="searchbar-container">
          <FiSearch size={18} color="var(--text-muted)" />
          <input
            placeholder="Search for food..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            autoFocus
          />
          <FiX size={20} onClick={() => { setShowSearchBar(false); setSearchTerm(""); }} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
