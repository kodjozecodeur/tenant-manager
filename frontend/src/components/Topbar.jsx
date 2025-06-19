import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  Bell,
  ChevronDown,
  Search,
  Menu,
  X,
  ToggleLeft,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { getUserProfile } from "../utils/api";

const Topbar = ({ onToggleSidebar, sidebarCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If we can't fetch user data, user might not be authenticated
        // We'll keep the default placeholder data
      }
    };

    fetchUserData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/dashboard/profile");
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    navigate("/dashboard/settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // User display data with fallbacks
  const displayName = currentUser?.name || "User";
  const displayEmail = currentUser?.email || "user@example.com";
  const userRole = currentUser?.role || "tenant";
  const userAvatar =
    currentUser?.avatar ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  const getPageTitle = (path) => {
    // Remove leading slash and get the path segments
    const pathSegments = path.replace(/^\//, "").split("/");
    const currentPage = pathSegments[1] || ""; // Get the page after '/dashboard'

    // Handle root dashboard route specifically
    if (path === "/dashboard" || path === "/dashboard/" || currentPage === "") {
      return "Dashboard";
    }

    // Find matching sidebar item first (most accurate)
    const match = assets.sidebarItems.find((item) => {
      if (item.path === "") return currentPage === "";
      return currentPage === item.path;
    });

    if (match) {
      return match.name;
    }

    // Handle additional pages not in sidebar
    const pageMap = {
      profile: "Profile",
      notifications: "Notifications",
    };

    // Return mapped title or capitalize the current page name
    if (pageMap[currentPage]) {
      return pageMap[currentPage];
    }

    // Capitalize first letter as fallback for any other pages
    if (currentPage) {
      return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    }

    return "Dashboard";
  };
  const getPageDescription = (pageTitle) => {
    const descriptions = {
      Dashboard: "Overview of your property management",
      Properties: "Manage your properties",
      Units: "Manage property units",
      Tenants: "Manage tenant information",
      Leases: "Manage lease agreements",
      Maintenance: "Track maintenance requests",
      Payments: "Manage rent payments",
      Settings: "Application settings",
      Profile: "Your profile information",
      Notifications: "View notifications",
    };

    return descriptions[pageTitle] || "";
  };

  const pageTitle = getPageTitle(location.pathname);
  const pageDescription = getPageDescription(pageTitle);
  React.useEffect(() => {
    // Set both the browser tab title and store the page title
    const appName = "Tenant Manager";
    const fullTitle =
      pageTitle === "Dashboard" ? appName : `${pageTitle} - ${appName}`;

    // Update document title with a slight delay to ensure smooth transitions
    const timeoutId = setTimeout(() => {
      document.title = fullTitle;
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pageTitle]);

  return (
    <header className="bg-white px-6 py-6">
      <div className="flex items-center justify-between">
        {/* Left Side - Toggle Button and Page Title */}
        <div className="flex items-center">
          {/* Sidebar Toggle Button */}{" "}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors mr-4"
            title={`${
              sidebarCollapsed ? "Expand" : "Collapse"
            } sidebar (Ctrl+B)`}
          >
            {sidebarCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ToggleLeft className="h-5 w-5" />
            )}
          </button>{" "}
          {/* Page Title */}
          <div className="transition-all duration-200 ease-in-out">
            <h1
              key={pageTitle}
              className="text-2xl font-semibold text-gray-900 animate-fadeIn"
            >
              {pageTitle}
            </h1>
            {pageDescription && (
              <p
                key={pageDescription}
                className="text-sm text-gray-600 mt-1 animate-fadeIn"
              >
                {pageDescription}
              </p>
            )}
          </div>
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
          </div>{" "}
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/notifications")}
            className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 rounded-lg transition-colors"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={userAvatar}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                  }}
                />
                <div className="hidden md:block text-left">
                  <div className="font-medium text-gray-900 text-sm">
                    {displayName}
                  </div>
                  {userRole && (
                    <div className="text-xs text-gray-500 flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      {userRole === "admin" ? "Administrator" : "Tenant"}
                    </div>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {displayName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {displayEmail}
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        userRole === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {userRole === "admin" ? "Administrator" : "Tenant"}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <User className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                    Your Profile
                  </button>

                  <button
                    onClick={handleSettingsClick}
                    className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <Settings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                    Settings
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
