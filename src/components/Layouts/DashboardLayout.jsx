import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
