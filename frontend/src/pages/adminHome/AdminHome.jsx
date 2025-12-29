import React from "react";
// import Navbar from "../../components/Navbar/Navbar";

import { useEffect } from "react";
import '../../index.css';
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Navbar from "../../components/adminNavbar/Navbar";
import Orders from "../Orders/Orders";
import List from "../List/List";
import Add from "../Add/Add";
import Sidebar from "../../components/Sidebar/Sidebar";
function AdminHome() {
  useEffect(() => {
    document.title = "Admin Panel - Food Delivery App";
    console.log(url);
  }, []);
  const { url } = useContext(StoreContext);
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="orders" element={<Orders url={url} />} />
          <Route path="list" element={<List url={url} />} />
          <Route path="add" element={<Add url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminHome;
