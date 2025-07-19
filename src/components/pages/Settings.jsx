import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Settings = () => {
  const [agentInfo, setAgentInfo] = useState({
    name: "Sarah Mitchell",
    email: "sarah.mitchell@visaflowpro.com",
    phone: "+61 2 9000 0000",
    license: "MARN 1234567",
    agency: "Mitchell Immigration Services"
  });

  const [notifications, setNotifications] = useState({
    newApplications: true,
    statusUpdates: true,
    documentUploads: true,
    systemUpdates: false
  });

  const handleAgentInfoSave = () => {
    toast.success("Agent information updated successfully");
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification preferences updated");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary" />
            Agent Information
          </h3>
          
          <div className="space-y-4">
            <FormField
              label="Full Name"
              value={agentInfo.name}
              onChange={(e) => setAgentInfo(prev => ({ ...prev, name: e.target.value }))}
            />
            
            <FormField
              label="Email Address"
              type="email"
              value={agentInfo.email}
              onChange={(e) => setAgentInfo(prev => ({ ...prev, email: e.target.value }))}
            />
            
            <FormField
              label="Phone Number"
              value={agentInfo.phone}
              onChange={(e) => setAgentInfo(prev => ({ ...prev, phone: e.target.value }))}
            />
            
            <FormField
              label="MARN License"
              value={agentInfo.license}
              onChange={(e) => setAgentInfo(prev => ({ ...prev, license: e.target.value }))}
            />
            
            <FormField
              label="Agency Name"
              value={agentInfo.agency}
              onChange={(e) => setAgentInfo(prev => ({ ...prev, agency: e.target.value }))}
            />
            
            <Button onClick={handleAgentInfoSave}>
              <ApperIcon name="Save" className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Bell" className="w-5 h-5 mr-2 text-primary" />
            Notification Preferences
          </h3>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {key === "newApplications" && "New Applications"}
                    {key === "statusUpdates" && "Status Updates"}
                    {key === "documentUploads" && "Document Uploads"}
                    {key === "systemUpdates" && "System Updates"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === "newApplications" && "Notify when clients submit new applications"}
                    {key === "statusUpdates" && "Notify when application status changes"}
                    {key === "documentUploads" && "Notify when clients upload documents"}
                    {key === "systemUpdates" && "Notify about system maintenance and updates"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNotificationChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* System Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Info" className="w-5 h-5 mr-2 text-primary" />
            System Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">February 10, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">License</span>
              <span className="font-medium">Professional</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Support</span>
              <span className="font-medium">24/7 Available</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Zap" className="w-5 h-5 mr-2 text-primary" />
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <ApperIcon name="Download" className="w-5 h-5 mr-3" />
              Export Application Data
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <ApperIcon name="Shield" className="w-5 h-5 mr-3" />
              Security Settings
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <ApperIcon name="HelpCircle" className="w-5 h-5 mr-3" />
              Help & Support
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <ApperIcon name="FileText" className="w-5 h-5 mr-3" />
              Privacy Policy
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;