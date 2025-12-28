import React from "react";
import "./footer.css";
// import { assets } from "../../asset/assets";
// import {assets} from '../../../../admin/src/assets/assets.js'

import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            maiores dolore illum!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />

            <img src={assets.linkedin_icon} alt="linkedin" />
            <img src={assets.twitter_icon} alt="twitter" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>home</li>
            <li>about us</li>
            <li>Delivery</li>
            <li>privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+25290009090</li>
            <li>contact@toma.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copy-right">
        copyRight {year} &copy; tomato.com all right reserved
      </p>
    </div>
  );
};

export default Footer;
