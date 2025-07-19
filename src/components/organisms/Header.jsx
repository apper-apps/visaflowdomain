import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, title, actions }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          {title && (
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {actions}
          
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;