import React, { useContext, useState } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiHeart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logOut, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "user",
    email: "user@gmail.com",
    phone: "",
    address: "",
  });

  return (
    <div className="min-h-screen bg-bl
    ack text-white font-sans pb-10">

      {/* Header */}
      <div className="flex items-center px-4 pt-4">
        <FiArrowLeft
          size={22}
          className="text-gray-300 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center mt-8">

        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-gray-700">
            <FiUser size={44} className="text-gray-300" />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold lowercase tracking-wide">
          {formData.fullName}
        </h2>
        <p className="text-sm text-gray-400">{formData.email}</p>

        {/* Stats / Actions */}
        <div className="grid grid-cols-3 gap-4 mt-8 px-6 w-full max-w-sm">

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#1c1c1c] flex items-center justify-center border border-gray-800">
              <FiPackage className="text-white" />
            </div>
            <span className="text-xs text-gray-400">Orders</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#1c1c1c] flex items-center justify-center border border-gray-800">
              <FiHeart className="text-white" />
            </div>
            <span className="text-xs text-gray-400">Wishlist</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#1c1c1c] flex items-center justify-center border border-gray-800">
              <FiSettings className="text-white" />
            </div>
            <span className="text-xs text-gray-400">Settings</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-sm h-px bg-gray-800 mt-10" />

        {/* Logout */}
        <button
          onClick={logOut}
          className="mt-8 flex items-center gap-3 text-red-400 hover:text-red-500 transition"
        >
          <FiLogOut size={18} />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
