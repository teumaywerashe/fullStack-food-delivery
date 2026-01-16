import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Bell, X } from "lucide-react";
import { FiUser } from "react-icons/fi";

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
    if (showNotification) {
      getNotification(userId);
    }
  }, [showNotification]);

  const filteredList =
    filter === "all"
      ? notification
      : notification?.filter((n) => n.isRead === false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowNotification(false);
      }
    }
    if (showNotification)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotification, setShowNotification]);

  const handleItemClick = (notifId) => {
    markAsRead(notifId);
  };

  return (
    <div
      ref={boxRef}
      className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform
        ${showNotification ? "translate-x-0" : "translate-x-full"} 
        w-full sm:w-[400px] md:w-[450px] border-l border-gray-200`}
      style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Notifications
          </h1>
          <button
            onClick={() => setShowNotification(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
          >
            <X size={28} className="text-gray-700 cursor-pointer" />
          </button>
        </div>

        {/* Filter Tabs - Larger and more defined */}
        <div className="flex gap-3 mb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-full text-base font-bold transition-all shadow-sm ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("isRead")}
            className={`px-6 py-2.5 rounded-full text-base font-bold transition-all shadow-sm ${
              filter === "isRead"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto h-[calc(100%-180px)] px-3">
        {filteredList &&
          filteredList.map((notif) => (
            <div
              key={notif._id}
              onClick={() => handleItemClick(notif._id)}
              className={`flex items-start gap-4 p-4 mb-2 rounded-xl cursor-pointer transition-all duration-200 group relative
              ${
                !notif.isRead
                  ? "bg-blue-50 border border-blue-100 hover:bg-blue-100/50"
                  : "bg-white border border-transparent hover:bg-gray-50 hover:border-gray-100"
              }`}
            >
              {/* Avatar Container */}
              <div className="relative flex-shrink-0 mt-1">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                  <FiUser size={28} className="text-gray-500" />
                </div>
                {!notif.isRead && (
                  <div className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full border-2 border-white">
                    <Bell size={12} className="text-white fill-white" />
                  </div>
                )}
              </div>

              {/* Content - Increased text size */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-base md:text-lg leading-snug mb-1 ${
                    !notif.isRead
                      ? "font-bold text-gray-900"
                      : "text-gray-600 font-medium"
                  }`}
                >
                  {notif.content}
                </p>
                <span
                  className={`text-sm font-semibold ${
                    !notif.isRead ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {notif.createdAt}
                </span>
              </div>

              {/* Unread Indicator */}
              {!notif.isRead && (
                <div className="mt-5 w-3.5 h-3.5 bg-blue-600 rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
              )}
            </div>
          ))}

        {filteredList?.length === 0 && (
          <div className="text-center mt-20 text-gray-400 font-medium text-lg">
            No notifications to show.
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
