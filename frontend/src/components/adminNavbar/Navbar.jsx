import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FiBell, FiLogOut } from "react-icons/fi";

function Navbar() {
  const {
    logOut,
    userId,
    getNotification,
    showNotification,
    setShowNotification,
    notification,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      // Fetch notifications for the user

      getNotification(userId);
    }
  }, [userId]);

  const filterdNotification = notification.filter(
    (not) => not.isRead === false
  );

  return (
    <div className="admin-navbar">
      <img
        onClick={() => navigate("/admin")}
        className="logo"
        src={assets.logo}
        alt="logo"
      />

      <div className="admin-nav-header">
        <h1>Admin Page</h1>
      </div>
      <div className="left-side">
        <div className="relative">
          {" "}
          <FiBell
            onClick={() => {
              setShowNotification(!showNotification);
            }}
            className="cursor-pointer"
            size={30}
          />
          {filterdNotification.length > 0 && (
            <p className="absolute -right-1 text-center -top-3  min-w-5 px-10 py-10 bg-red-500 rounded-full">
              {filterdNotification.length}
            </p>
          )}
        </div>
        <div className="admin-profile">
          <div className="profile-container">
            <img className="profile" src={assets.profile_image} alt="profile" />
          </div>

          <div className="logout">
            <button onClick={logOut}>
              <FiLogOut />
              <span>logOut</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
