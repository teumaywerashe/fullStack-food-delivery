import React, { useContext, useEffect } from "react";
import "./AdminPage.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function AdminPage() {

  const navigate = useNavigate();
  const { getAllUsers, fetchAllOrders, orders, users } =
    useContext(StoreContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const pendingAlerts = orders.filter(
    (order) => order.status === "pending"
  );

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
            <span className="value">{users.length}</span>
          </div>

          <div onClick={() => navigate('/admin/orders')} className="mini-stat">
            <span className="label">Pending Alerts</span>
            <span className="value">{pendingAlerts.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
