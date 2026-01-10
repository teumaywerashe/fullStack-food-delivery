import React from "react";
import "./AdminPage.css";

function AdminPage() {
  const adminName = "Alex"; // This would typically come from your Auth context

  return (
    <div className="admin-hero-container">
      <div className="admin-glass-card">
        <header className="admin-header">
          <div className="badge">Admin Portal</div>
          <h1>Welcome back, {adminName}</h1>
          <p>System status is optimal. Here is what's happening today.</p>
        </header>

        <div className="admin-stats-row">
          <div className="mini-stat">
            <span className="label">Active Users</span>
            <span className="value">1,402</span>
          </div>
          <div className="mini-stat">
            <span className="label">System Load</span>
            <span className="value">24%</span>
          </div>
          <div className="mini-stat">
            <span className="label">Pending Alerts</span>
            <span className="value">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
