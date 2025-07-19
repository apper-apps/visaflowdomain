import React from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by creating your first item", 
  actionLabel = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-primary" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default Empty;