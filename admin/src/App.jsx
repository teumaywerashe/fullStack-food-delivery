import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

import { ToastContainer } from "react-toastify";
import List from "../pages/List/List";
import Orders from "../pages/Orders/Orders";
import Add from "../pages/Add/Add";
function App() {
  const url = import.meta.env.VITE_API_URL;
  // "http://localhost:3000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/list" element={<List url={url} />} />
          <Route path="/" element={<Orders url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
