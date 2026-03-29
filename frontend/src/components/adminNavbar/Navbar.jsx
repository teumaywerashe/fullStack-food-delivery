import { useContext, useRef, useState } from "react";
import "./Navbar.css";
import { StoreContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import Logo from "../logo/Logo";

function Navbar() {
  const { logOut, userId, getNotification, showNotification, setShowNotification, notification, userName } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);

  const unread = notification.filter((n) => !n.isRead);
  const initials = userName ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "A";

  return (
    <div className="admin-navbar">
      <div onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>
        <Logo />
      </div>

      <div className="admin-nav-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="left-side">
        {/* Bell */}
        <div className="admin-bell" onClick={() => setShowNotification(!showNotification)}>
          <FiBell size={20} />
          {unread.length > 0 && <span className="admin-bell-dot">{unread.length}</span>}
        </div>

        {/* Profile */}
        <div className="admin-profile" ref={profileRef}>
          <button className="admin-profile-btn" onClick={() => setShowDropdown((p) => !p)}>
            <div className="admin-avatar">{initials}</div>
            <span>{userName || "Admin"}</span>
          </button>
          {showDropdown && (
            <div className="admin-logout-dropdown">
              <button className="admin-logout-btn" onClick={() => { logOut(); setShowDropdown(false); }}>
                <FiLogOut size={15} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
