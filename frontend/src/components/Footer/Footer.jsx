import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets.js";
import Logo from "../logo/Logo.jsx";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section: Branding & Socials */}
        <div className="footer-content-left">
          <div className="footer-logo-container">
            <Logo />
          </div>
          <p>
            Bringing your favorite meals from local restaurants straight to your
            doorstep. Fresh, fast, and reliable delivery for every craving.
          </p>
          <div className="footer-social-icons">
            <div className="icon-circle">
              <img src={assets.facebook_icon} alt="facebook" />
            </div>
            <div className="icon-circle">
              <img src={assets.linkedin_icon} alt="linkedin" />
            </div>
            <div className="icon-circle">
              <img src={assets.x_icon} alt="twitter" />
            </div>
          </div>
        </div>

        {/* Center Section: Navigation */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section: Contact */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li className="contact-info">+251 900 090 900</li>
            <li className="contact-info">contact@quickBite.com</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />
      <p className="footer-copy-right">
        Copyright {year} &copy;{" "}
        <span>
          {" "}
          <span className="nav-logo-text">
            Quick<span>Bite .com</span>
          </span>
         
        </span>{" "}
        - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
