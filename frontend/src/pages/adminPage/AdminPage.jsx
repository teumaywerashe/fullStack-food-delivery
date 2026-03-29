import { useContext, useEffect } from "react";
import "./AdminPage.css";
import { StoreContext } from "../../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { FiList, FiPlus, FiShoppingBag, FiUsers } from "react-icons/fi";

function AdminPage() {
  const { getAllUsers, fetchAllOrders, orders, users } = useContext(StoreContext);

  useEffect(() => { getAllUsers(); }, []);
  useEffect(() => { fetchAllOrders(); }, []);

  const pending   = orders.filter((o) => o.status === "food processing").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Dashboard</h1>
        <p>Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-blue"><FiUsers size={18} /></div>
          <span className="admin-stat-label">Total Users</span>
          <span className="admin-stat-value">{users.length}</span>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-orange"><FiShoppingBag size={18} /></div>
          <span className="admin-stat-label">Total Orders</span>
          <span className="admin-stat-value">{orders.length}</span>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-red"><FiShoppingBag size={18} /></div>
          <span className="admin-stat-label">Pending</span>
          <span className="admin-stat-value">{pending}</span>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-green"><FiShoppingBag size={18} /></div>
          <span className="admin-stat-label">Delivered</span>
          <span className="admin-stat-value">{delivered}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="admin-action-grid">
          <NavLink to="/admin/add" className="admin-action-btn">
            <span className="icon-blue"><FiPlus size={18} /></span>
            Add Food Item
          </NavLink>
          <NavLink to="/admin/list" className="admin-action-btn">
            <span className="icon-orange"><FiList size={18} /></span>
            Manage Food List
          </NavLink>
          <NavLink to="/admin/orders" className="admin-action-btn">
            <span className="icon-green"><FiShoppingBag size={18} /></span>
            View Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
