import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { X, Inbox, Clock, User, CheckCircle } from "lucide-react";
import "./Notification.css";
// import { useNavigate } from "react-router-dom";

function Notification() {
  const {
    showNotification,
    notification,
    userId,
    getNotification,
    setShowNotification,
    markAsRead,
  } = useContext(StoreContext);
  const boxRef = useRef();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (showNotification) getNotification(userId);
  }, [showNotification, userId]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target))
        setShowNotification(false);
    };
    if (showNotification) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showNotification, setShowNotification]);

  const filtered =
    filter === "all"
      ? notification
      : notification?.filter((n) => !n.isRead);

  const markAll = () => {
    notification?.filter((n) => !n.isRead).forEach((n) => markAsRead(n._id));
  };

  return (
    <>
      {/* Backdrop */}
      <div className={`notif-overlay ${showNotification ? "visible" : ""}`} />

      {/* Panel */}
      <aside
        ref={boxRef}
        className={`notif-panel ${showNotification ? "visible" : ""}`}
      >
        {/* Header */}
        <div className="notif-header">
          <div className="notif-header-text">
            <h2>Notifications</h2>
            <p>{notification?.filter((n) => !n.isRead).length || 0} unread</p>
          </div>
          <button
            className="notif-close-btn"
            onClick={() => setShowNotification(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="notif-filters">
          {["all", "unread"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`notif-filter-btn ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="notif-list">
          {filtered && filtered.length > 0 ? (
            filtered.map((notif) => (
              <div
                key={notif._id}
                onClick={() =>{ markAsRead(notif._id)
                }
                }
                className={`notif-item ${!notif.isRead ? "unread" : ""}`}
              >
                <div className="notif-icon-wrap">
                  <div className="notif-icon">
                    <User size={18} />
                  </div>
                  {!notif.isRead && <span className="notif-unread-dot" />}
                </div>

                <div className="notif-body">
                  <p className="notif-content">{notif.content}</p>
                  <div className="notif-meta">
                    <span className="notif-time">
                      <Clock size={11} />
                      {notif.createdAt}
                    </span>
                    {!notif.isRead && (
                      <span className="notif-new-badge">New</span>
                    )}
                  </div>
                </div>

                {!notif.isRead && (
                  <CheckCircle size={15} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2, opacity: 0.6 }} />
                )}
              </div>
            ))
          ) : (
            <div className="notif-empty">
              <Inbox size={40} />
              <p>Nothing here yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="notif-footer">
          <button className="notif-mark-all-btn" onClick={markAll}>
            Mark All as Read
          </button>
        </div>
      </aside>
    </>
  );
}

export default Notification;
