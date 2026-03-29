import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/adminNavbar/Navbar";
import Orders from "../Orders/Orders";
import List from "../List/List";
import Add from "../Add/Add";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminPage from "../adminPage/AdminPage";
import "./AdminHome.css";

function AdminHome() {
  useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  return (
    <div>
      <Navbar />
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Routes>
            <Route path="" element={<AdminPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="list" element={<List />} />
            <Route path="add" element={<Add />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
