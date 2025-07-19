import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApplicationCard from "@/components/organisms/ApplicationCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useApplications } from "@/hooks/useApplications";
import { useClients } from "@/hooks/useClients";

const Applications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("filter") || "all");
  
  const { applications, loading: appsLoading, error: appsError, loadApplications } = useApplications();
  const { clients, loading: clientsLoading } = useClients();

  const loading = appsLoading || clientsLoading;
  const error = appsError;

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadApplications} />;

  const filteredApplications = applications.filter(app => {
    const client = clients.find(c => c.Id === app.clientId);
    const matchesSearch = !searchTerm || 
      client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "review" && app.status === "In Review") ||
      (statusFilter === "ready" && app.status === "Ready to Submit") ||
      (statusFilter === "new" && app.status === "New") ||
      (statusFilter === "info" && app.status === "Additional Info Required") ||
      (statusFilter === "submitted" && app.status === "Submitted");
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "All Applications" },
    { value: "new", label: "New" },
    { value: "review", label: "In Review" },
    { value: "info", label: "Info Required" },
    { value: "ready", label: "Ready to Submit" },
    { value: "submitted", label: "Submitted" }
  ];

  if (applications.length === 0) {
    return (
      <Empty
        title="No applications found"
        description="Get started by creating a client portal for your first visa application."
        actionLabel="Create Client Portal"
        onAction={() => navigate("/clients/create")}
        icon="FileText"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">
            {filteredApplications.length} of {applications.length} applications
          </p>
        </div>
        <Button onClick={() => navigate("/clients/create")}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Client Portal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name or visa type..."
          />
        </div>
        
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <Empty
          title="No applications match your filters"
          description="Try adjusting your search terms or filter criteria."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}
          icon="Search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => {
            const client = clients.find(c => c.Id === application.clientId);
            return (
              <ApplicationCard
                key={application.Id}
                application={application}
                client={client}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applications;