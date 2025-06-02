import React from "react";
import FacultySidebar from "./FacultySidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <FacultySidebar className="h-full" />

      <main className="flex-1 bg-gray-100 h-full overflow-y-auto flex flex-col">
        <Header /> {/* This is now at the top of the main content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet /> {/* This renders the matched child route */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
