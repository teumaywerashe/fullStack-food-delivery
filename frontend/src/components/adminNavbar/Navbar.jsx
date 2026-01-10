import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const { logOut } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="admin-navbar">
     
     
     
      <img
        onClick={() => navigate("/admin")}
        className="logo"
        src={assets.logo}
        alt="logo"
      />

      <div className="admin-nav-header"><h1>Admin Page</h1></div>

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
  );
}

export default Navbar;
