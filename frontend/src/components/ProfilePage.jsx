import React, { useContext, useState } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiPackage,
  FiShoppingCart,
  FiLogOut,
  FiHeart,
} from "react-icons/fi";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logOut } = useContext(StoreContext);
  const navigate = useNavigate();

  const [user] = useState({
    fullName: "John Doe",
    email: "j.doe@example.com",
  });

  return (
    /* The outer container: flex, justify-center (horizontal), items-center (vertical) */
    <div className="min-h-screen w-full flex flex-col mt-[20px] items-center bg-gray-50 font-sans text-slate-900 p-4">
      
      {/* The Profile Card Wrapper */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        
        {/* 1. Header Area */}
        <div className="px-6 pt-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-slate-600"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-800">Account</h1>
          <div className="w-10"></div> 
        </div>

        <div className="px-8 py-10 flex flex-col items-center">
          
          {/* 2. User Identity */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center border-4 border-white shadow-lg ring-1 ring-gray-100">
              <FiUser size={40} className="text-indigo-600" />
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
              {user.fullName}
            </h2>
            <p className="text-gray-400 font-medium text-sm">{user.email}</p>
          </div>

          {/* 3. Action Buttons (Row) */}
          <div className="flex flex-row justify-center items-center gap-3 w-full mb-10">
            <QuickActionButton
              icon={<FiPackage size={22} />}
              label="Orders"
              onClick={() => navigate("/orders")}
            />
            <QuickActionButton
              icon={<FiShoppingCart size={22} />}
              label="Cart"
              onClick={() => navigate("/cart")}
            />
            <QuickActionButton
              icon={<FiHeart size={22} />}
              label="Wishlist"
              onClick={() => navigate("/wishlist")}
            />
          </div>

          {/* 4. Logout / Footer */}
          <div className="w-full border-t border-gray-50 pt-8">
            <button
              onClick={() => logOut()}
              className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-xs uppercase tracking-[0.2em]"
            >
              <FiLogOut size={16} />
              Sign Out
            </button>
          </div>

          <p className="mt-6 text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">
            E-Commerce v1.0
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center flex-1 h-24 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-600 tracking-wider uppercase">
        {label}
      </span>
    </button>
  );
}

export default ProfilePage;