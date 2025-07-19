import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { useApplications } from "@/hooks/useApplications";
import { useClients } from "@/hooks/useClients";

const Dashboard = () => {
  const navigate = useNavigate();
  const { applications, loading: appsLoading, error: appsError, loadApplications } = useApplications();
  const { clients, loading: clientsLoading, error: clientsError } = useClients();

  const loading = appsLoading || clientsLoading;
  const error = appsError || clientsError;

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadApplications} />;

  const getStatusCounts = () => {
    const counts = {
      total: applications.length,
      new: applications.filter(app => app.status === "New").length,
      review: applications.filter(app => app.status === "In Review").length,
      info: applications.filter(app => app.status === "Additional Info Required").length,
      ready: applications.filter(app => app.status === "Ready to Submit").length,
      submitted: applications.filter(app => app.status === "Submitted").length
    };
    return counts;
  };

  const recentApplications = applications.slice(0, 5);
  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your immigration practice efficiently</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="secondary" onClick={() => navigate("/clients/create")}>
            <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
            New Client
          </Button>
          <Button onClick={() => navigate("/applications")}>
            <ApperIcon name="FileText" className="w-4 h-4 mr-2" />
            View All Applications
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Plus" className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">New</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.new}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Eye" className="w-6 h-6 text-warning" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Review</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.review}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Ready</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.ready}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Send" className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.submitted}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/applications")}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentApplications.map((app) => {
              const client = clients.find(c => c.Id === app.clientId);
              return (
                <div 
                  key={app.Id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/applications/${app.Id}`)}
                >
                  <div>
                    <p className="font-medium text-gray-900">{client?.name || "Unknown Client"}</p>
                    <p className="text-sm text-gray-600">{app.visaType}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/clients/create")}
            >
              <ApperIcon name="UserPlus" className="w-5 h-5 mr-3" />
              Create New Client Portal
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/applications?filter=review")}
            >
              <ApperIcon name="Eye" className="w-5 h-5 mr-3" />
              Review Pending Applications
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/applications?filter=ready")}
            >
              <ApperIcon name="Send" className="w-5 h-5 mr-3" />
              Submit Ready Applications
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/templates")}
            >
              <ApperIcon name="FileTemplate" className="w-5 h-5 mr-3" />
              Manage Application Templates
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;