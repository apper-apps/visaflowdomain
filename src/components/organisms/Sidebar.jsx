import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Applications", href: "/applications", icon: "FileText" },
    { name: "Clients", href: "/clients", icon: "Users" },
    { name: "Templates", href: "/templates", icon: "FileTemplate" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ApperIcon name="Plane" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">VisaFlow Pro</h1>
            <p className="text-xs text-gray-500">Practice Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )
            }
          >
            <ApperIcon name={item.icon} className="w-5 h-5 mr-3 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Sarah Mitchell</p>
            <p className="text-xs text-gray-500">Immigration Agent</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={onClose}
          />
          <div className="relative flex flex-col w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;