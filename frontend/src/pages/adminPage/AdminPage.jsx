import React, { useContext, useEffect } from "react";
import "./AdminPage.css";
import { StoreContext } from "../../context/StoreContext";

function AdminPage() {
 const {getAllUsers,fetchAllOrders,orders,users}=useContext(StoreContext);

 useEffect(() => {
  getAllUsers();
 }, []);

 useEffect(() => {
  fetchAllOrders();
 }, []);

 const pendingAlerts = orders.filter((order) => order.status === "food processing");

  return (
    <div className="admin-hero-container">
      <div className="admin-glass-card">
        <header className="admin-header">
          <div className="badge">Admin Portal</div>
          <h1>Welcome back</h1>
          <p>System status is optimal. Here is what's happening today.</p>
        </header>

        <div className="admin-stats-row">
          <div className="mini-stat">
            <span className="label">Active Users</span>
            <span className="value text-gray-600">{users.length}</span>
          </div>
       
          <div className="mini-stat">
            <span className="label">Pending Alerts</span>
            <span className="value text-gray-500">{pendingAlerts.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
