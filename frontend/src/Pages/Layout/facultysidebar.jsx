// Sidebar.jsx
import React from "react";
import { Home, History,LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/faculty" },
    { icon: <History size={20} />, label: "Past Events", path: "/faculty/event-historyfaculty" },
  ];
  const handleLogout = () => {
    logout();             // calls logout from context
    navigate("/login");   // redirects to login page
  };
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-10">Faculty Panel</h1>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-600 hover:bg-gray-700 w-full text-left"

          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-red-600 bg-red-500 text-white mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
