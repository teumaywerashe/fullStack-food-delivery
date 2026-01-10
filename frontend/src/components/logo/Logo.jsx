import React, { useState } from 'react';
import './logo.css';

const Logo = () => {
  const [isDelivering, setIsDelivering] = useState(false);

  const handleLogoClick = () => {
    if (!isDelivering) {
      setIsDelivering(true);
      setTimeout(() => setIsDelivering(false), 1000);
    }
  };

  return (
    <div 
      className={`nav-logo-wrapper ${isDelivering ? 'delivering' : ''}`} 
      onClick={handleLogoClick}
    >
      <div className="nav-logo-icon">
        {/* Steam / Speed lines */}
        <div className="nav-steam-container">
          <span className="nav-steam-line"></span>
          <span className="nav-steam-line"></span>
          <span className="nav-steam-line"></span>
        </div>

        {/* The Cloche (Food Cover) */}
        <svg viewBox="0 0 100 60" className="nav-cloche-svg">
          <circle cx="50" cy="12" r="4" className="nav-cloche-handle" />
          <path d="M10,50 Q50,0 90,50 Z" className="nav-cloche-dome" />
          <rect x="5" y="52" width="90" height="6" rx="3" className="nav-cloche-plate" />
        </svg>
      </div>

      <h1 className="nav-logo-text">
        Quick<span>Bite</span>
      </h1>
    </div>
  );
};

export default Logo;