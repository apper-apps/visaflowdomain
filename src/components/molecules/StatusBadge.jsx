import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "New":
        return { variant: "new", icon: "Plus", text: "New" };
      case "In Review":
        return { variant: "review", icon: "Eye", text: "In Review" };
      case "Additional Info Required":
        return { variant: "info", icon: "AlertCircle", text: "Info Required" };
      case "Ready to Submit":
        return { variant: "ready", icon: "CheckCircle", text: "Ready" };
      case "Submitted":
        return { variant: "submitted", icon: "Send", text: "Submitted" };
      default:
        return { variant: "default", icon: "Circle", text: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant}>
      <ApperIcon name={config.icon} className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>
  );
};

export default StatusBadge;