import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const ApplicationCard = ({ application, client }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/applications/${application.Id}`);
  };

  return (
    <Card hover onClick={handleClick} className="p-6 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {client?.name || "Unknown Client"}
          </h3>
          <p className="text-sm text-gray-600">{application.visaType}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
          Created {format(new Date(application.createdAt), "MMM d, yyyy")}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
          Updated {format(new Date(application.updatedAt), "MMM d, yyyy")}
        </div>

        {application.documents && application.documents.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="Paperclip" className="w-4 h-4 mr-2" />
            {application.documents.length} document{application.documents.length !== 1 ? "s" : ""}
          </div>
        )}

        {application.messages && application.messages.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2" />
            {application.messages.length} message{application.messages.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ApplicationCard;