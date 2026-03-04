import React from "react";
// import Navbar from "../../components/Navbar/Navbar";

import { useEffect } from "react";
import '../../index.css';
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/adminNavbar/Navbar";
import Orders from "../Orders/Orders";
import List from "../List/List";
import Add from "../Add/Add";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminPage from "../adminPage/AdminPage";
function AdminHome() {
  useEffect(() => {
    document.title = "Admin Panel - Food Delivery App";
    
  }, []);
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="" element={<AdminPage/>}></Route>
          <Route path="orders" element={<Orders />} />
          <Route path="list" element={<List />} />
          <Route path="add" element={<Add />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminHome;
