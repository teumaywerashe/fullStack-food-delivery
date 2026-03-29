import React from "react";
// import { assets } from "../../asset/assets.js";
import {assets} from '../../assets/assets.js'

import "./AppDownLoad.css";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <h2>Download the <span className="quickbite">QuickBite</span> App</h2>
      <p>Order faster, track in real-time, and get exclusive deals on the go.</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="Google Play" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  );
};

export default AppDownload;
