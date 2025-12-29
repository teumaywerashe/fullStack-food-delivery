import React from "react";
import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/admin/add' className="sidebar-option">
          <img src={assets.add_icon} alt="altTxt" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/admin/list' className="sidebar-option">
          <img src={assets.order_icon} alt="altTxt" />
          <p>Lists</p>
        </NavLink>
        <NavLink to='/admin/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="altTxt" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
