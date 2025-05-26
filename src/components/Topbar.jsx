import React from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Bell, ChevronDown, Search } from "lucide-react";

const Topbar = () => {
  const location = useLocation();

  const getPageTitle = (path) => {
    const match = assets.sidebarItems.find((item) => path.endsWith(item.path));
    return match ? match.name : "Dashboard";
  };

  const pageTitle = getPageTitle(location.pathname);

  React.useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <header className="bg-white  px-6 py-6">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
        </div>

        {/* Right Side - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 rounded-lg"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
                <div className="hidden md:block text-left">
                  <div className="font-medium text-gray-900 text-sm">Kojo</div>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
