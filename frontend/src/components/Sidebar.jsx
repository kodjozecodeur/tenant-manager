import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <>
      {/* Overlay for mobile when sidebar is expanded */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-[#FAFAFAFA] flex flex-col h-screen transition-all duration-300 ease-in-out relative z-30 border-r border-gray-200 ${
          isCollapsed ? "" : "lg:relative fixed"
        }`}
      >
        {/* Logo */}
        <div className={`p-6 ${isCollapsed ? "px-3" : ""}`}>
          {isCollapsed ? (
            <div className="w-10 h-10 bg-[#C8EE44] rounded-lg flex items-center justify-center">
              <span className="text-[#1B212D] font-bold text-lg">L</span>
            </div>
          ) : (
            <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {assets.sidebarItems?.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md transition relative group ${
                      isActive
                        ? "bg-[#C8EE44] text-[#1B212D] font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${isCollapsed ? "justify-center" : ""}`
                  }
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon
                    className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`}
                  />
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300">
                      {item.name}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.name}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}{" "}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
