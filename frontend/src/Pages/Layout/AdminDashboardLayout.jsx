import React from "react";
import Sidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
<div className="flex h-screen">
  <Sidebar className="h-full" />
  <main className="flex-1 p-6 bg-gray-100 h-full overflow-y-auto">
    <Outlet />
  </main>
</div>

  );
};

export default AdminDashboardLayout;
