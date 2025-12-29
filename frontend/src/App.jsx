import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Login from "./components/LoginPopup/Login";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myOrders/MyOrders";
// import { ToastContainer } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import AdminHome from "./pages/adminHome/AdminHome";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      <ToastContainer />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminHome />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myOrders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
