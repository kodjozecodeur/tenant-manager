import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {assets.sidebarItems?.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition ${
                    isActive
                      ? "bg-[#C8EE44]  font-semibold text-[#1B212D]"
                      : " hover:bg-gray-100 text-[#929EAE] hover:text-[#1B212D] hover:font-semibold"
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
