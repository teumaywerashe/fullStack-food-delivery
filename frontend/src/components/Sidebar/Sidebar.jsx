import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FiList, FiPlus, FiShoppingBag } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <p className="sidebar-label">Management</p>
        <NavLink to="/admin/add" className="sidebar-option">
          <FiPlus size={18} />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="/admin/list" className="sidebar-option">
          <FiList size={18} />
          <p>Food List</p>
        </NavLink>
        <NavLink to="/admin/orders" className="sidebar-option">
          <FiShoppingBag size={18} />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
