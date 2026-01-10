import React from "react";
import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { FiBell, FiList, FiPlus, FiShoppingCart } from "react-icons/fi";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/admin/add' className="sidebar-option">
         
          <FiPlus size={20}/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/admin/list' className="sidebar-option">
                <FiList/>
          <p>Lists</p>
        </NavLink>
        <NavLink to='/admin/orders' className="sidebar-option">
         
           <FiShoppingCart/>
          <p>Orders</p>
        </NavLink>
         <NavLink to='/admin/notification' className="sidebar-option">
         
           <FiBell/>
          <p>notification</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
