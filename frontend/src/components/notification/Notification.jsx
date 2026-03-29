import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { Bell, X, Inbox, Clock, User, CheckCircle } from "lucide-react";

function Notification() {
  const { showNotification, notification, userId, getNotification, setShowNotification, markAsRead } = useContext(StoreContext);
  const boxRef = useRef();
  const [filter, setFilter] = useState("all");

  useEffect(() => { if (showNotification) getNotification(userId); }, [showNotification, userId]);

  useEffect(() => {
    const clickOut = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setShowNotification(false); };
    if (showNotification) document.addEventListener("mousedown", clickOut);
    return () => document.removeEventListener("mousedown", clickOut);
  }, [showNotification, setShowNotification]);

  const filtered = filter === "all" ? notification : notification?.filter(n => !n.isRead);

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[200] transition-opacity duration-300 ${showNotification ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

      <aside 
        ref={boxRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[201] shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showNotification ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Activity</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Updates & Alerts</p>
          </div>
          <button onClick={() => setShowNotification(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex gap-2">
          {['all', 'unread'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-2 text-sm font-bold rounded-xl capitalize transition-all ${filter === f ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
          {filtered && filtered.length > 0 ? (
            filtered.map((notif) => (
              <div 
                key={notif._id} 
                onClick={() => markAsRead(notif._id)}
                className={`group flex items-start gap-4 p-4 mb-2 rounded-2xl cursor-pointer transition-all ${!notif.isRead ? "bg-orange-50/50 hover:bg-orange-50" : "hover:bg-slate-50"}`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${!notif.isRead ? "bg-white border-orange-200 text-orange-500" : "bg-slate-50 border-transparent text-slate-400"}`}>
                    <User size={24} />
                  </div>
                  {!notif.isRead && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />}
                </div>

                <div className="flex-1 pt-1">
                  {/* TEXT SPACING: mb-2 provides the gap you asked for */}
                  <p className={`text-[15px] leading-[1.5] mb-2 ${!notif.isRead ? "font-bold text-slate-900" : "text-slate-600"}`}>
                    {notif.content}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      <Clock size={12} />
                      {notif.createdAt}
                    </span>
                    {!notif.isRead && (
                      <span className="bg-orange-100 text-orange-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">New Activity</span>
                    )}
                  </div>
                </div>

                {!notif.isRead && <CheckCircle size={16} className="mt-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-10 opacity-40">
              <Inbox size={48} className="mb-4" />
              <p className="font-bold">Nothing here yet</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95">
            Mark All as Read
          </button>
        </div>
      </aside>
    </>
  );
}

export default Notification;