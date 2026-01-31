import React, { useContext, useEffect } from "react";
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
      getNotification(userId);
    }
  }, [userId]);

  const filterdNotification = notification.filter(
    (not) => not.isRead === false
  );

  return (
    <div className="flex items-center  sticky justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Logo */}
      <img
        onClick={() => navigate("/admin")}
        className="w-32 cursor-pointer object-contain"
        src={assets.logo}
        alt="logo"
      />

      {/* Header Title */}
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Admin Page</h1>
      </div>

      {/* Actions / Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <FiBell
            onClick={() => setShowNotification(!showNotification)}
            className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
            size={24}
          />
          {filterdNotification.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {filterdNotification.length}
            </span>
          )}
        </div>

        {/* Profile and Logout */}
        <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img className="w-full h-full object-cover" src={assets.profile_image} alt="profile" />
          </div>

          <div className="flex items-center">
            <button 
              onClick={logOut}
              className="flex shrink-0 cursor-pointer items-center gap-2 px-10 py-10 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-all duration-200 group"
            >
              <FiLogOut className="group-hover:translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;