import { useContext } from "react";
import { FiArrowLeft, FiUser, FiPackage, FiShoppingCart, FiLogOut, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/ContextProvider";
import "./ProfilePage.css";

function ProfilePage() {
  const { logOut, userName, userEmail } = useContext(StoreContext);
  const navigate = useNavigate();

  // Generate initials from name
  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Top bar */}
        <div className="profile-topbar">
          <button className="profile-back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} />
          </button>
          <span className="profile-topbar-title">My Account</span>
          <div style={{ width: 36 }} />
        </div>

        {/* Avatar + identity */}
        <div className="profile-identity">
          <div className="profile-initials-avatar">{initials}</div>
          <h2 className="profile-name">{userName || "User"}</h2>
          <div className="profile-email-row">
            <FiMail size={13} />
            <span>{userEmail || "—"}</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="profile-actions">
          <button className="profile-action-btn" onClick={() => navigate("/myOrders")}>
            <span className="profile-action-icon orders-icon"><FiPackage size={20} /></span>
            <span className="profile-action-label">My Orders</span>
          </button>
          <button className="profile-action-btn" onClick={() => navigate("/cart")}>
            <span className="profile-action-icon cart-icon"><FiShoppingCart size={20} /></span>
            <span className="profile-action-label">My Cart</span>
          </button>
        </div>

        {/* Logout */}
        <div className="profile-footer">
          <button className="profile-logout-btn" onClick={logOut}>
            <FiLogOut size={16} />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
