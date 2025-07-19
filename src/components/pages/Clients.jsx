import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useClients } from "@/hooks/useClients";
import { format } from "date-fns";

const Clients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { clients, loading, error, loadClients } = useClients();

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadClients} />;

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (clients.length === 0) {
    return (
      <Empty
        title="No clients found"
        description="Create your first client portal to get started with visa applications."
        actionLabel="Create Client Portal"
        onAction={() => navigate("/clients/create")}
        icon="Users"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">
            {filteredClients.length} of {clients.length} clients
          </p>
        </div>
        <Button onClick={() => navigate("/clients/create")}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Client Portal
        </Button>
      </div>

      {/* Search */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or email..."
      />

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <Empty
          title="No clients match your search"
          description="Try adjusting your search terms or create a new client portal."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm("")}
          icon="Search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.Id} hover className="p-6 cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                    Created {format(new Date(client.createdAt), "MMM d, yyyy")}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <ApperIcon name="Link" className="w-4 h-4 mr-2" />
                    <span className="truncate">{client.portalLink}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/portal/${client.portalLink.split('/')[1]}`);
                    }}
                  >
                    <ApperIcon name="ExternalLink" className="w-4 h-4 mr-1" />
                    Portal
                  </Button>
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Copy portal link to clipboard
                      navigator.clipboard.writeText(`${window.location.origin}/${client.portalLink}`);
                    }}
                  >
                    <ApperIcon name="Copy" className="w-4 h-4 mr-1" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;