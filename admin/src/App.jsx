import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import List from "../components/pages/List/List";
import Orders from "../components/pages/Orders/Orders";
import Add from "../components/pages/Add/Add";

import { ToastContainer } from "react-toastify";
function App() {
  const url = "http://localhost:3000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
