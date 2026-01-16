import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const { url, setToken, setUserId } = useContext(StoreContext);
  const [showPassord,setShowPassword]=useState(false);

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateData = (e) => {
    setError(null);
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if(response.data.user.role==="admin"){
          navigate('/admin')
        }

        setToken(response.data.token);
        setUserId(response.data.user._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        // console.log(response.data);
        setShowLogin(false);
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      setError("Server Error");
    } finally {
      setLoading(false);
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
         / >
          <div className="login-password-container">
            <input
              value={data.password}
              onChange={updateData}
              type={showPassord?"text":"password"}
              name="password"
              placeholder="your password"
              required
           />
            <label onClick={()=>setShowPassword(!showPassord)}>
              {showPassord ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </label>
          </div>
        </div>
        {error && <p className="login-error-message">{error}</p>}
        <button>
          {loading
            ? "Loading..."
            : currentState === "Sign Up"
            ? "sign up"
            : "Login"}
        </button>
        <div className="login-popup-condition">
          <input id="checkbox" type="checkbox" required />
          <label htmlFor="checkbox">
            by continuing , i agree to the term of use & privacy policy
          </label>
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
