import React, { useState } from "react";
import "./Login.css";
// import { assets } from "../../asset/assets";
// import {assets} from '../../../../admin/src/assets/assets.js'
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  const { url, setToken } = useContext(StoreContext);

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data );
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.msg);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={createUser} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="X"
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Sign Up" && (
            <input
              value={data.name}
              onChange={updateData}
              type="text"
              name="name"
              placeholder="your name"
              required
            />
          )}
          <input
            onChange={updateData}
            type="email"
            name="email"
            placeholder="your email"
            value={data.email}
            required
          />
          <input
            value={data.password}
            onChange={updateData}
            type="passsword"
            name="password"
            placeholder="your password"
            required
          />
        </div>
        <button>{currentState === "Sign Up" ? "sign up" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" requred />
          <p>by continuing , i agree to the term of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Don't have account{" "}
            <span onClick={() => setCurrentState("Sign Up")}>create new</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
