import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import MessagePanel from "@/components/organisms/MessagePanel";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { applicationService } from "@/services/api/applicationService";
import { clientService } from "@/services/api/clientService";
import { useApplications } from "@/hooks/useApplications";
import { toast } from "react-toastify";
import { format } from "date-fns";

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateApplicationStatus, addMessage } = useApplications();
  
  const [application, setApplication] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const loadApplicationDetail = async () => {
    setLoading(true);
    setError("");
    try {
      const appData = await applicationService.getById(id);
      const clientData = await clientService.getById(appData.clientId);
      setApplication(appData);
      setClient(clientData);
    } catch (err) {
      setError(err.message || "Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplicationDetail();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setActionLoading(true);
    try {
      await updateApplicationStatus(parseInt(id), newStatus);
      setApplication(prev => ({ ...prev, status: newStatus }));
      toast.success(`Application status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendMessage = async (messageData) => {
    try {
      const updatedApp = await addMessage(parseInt(id), messageData);
      setApplication(updatedApp);
      toast.success("Message sent successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const generatePDF = () => {
    // In a real application, this would generate and download a PDF
    toast.success("PDF application form generated successfully");
  };

  const submitToImmigration = async () => {
    setActionLoading(true);
    try {
      await handleStatusChange("Submitted");
      toast.success("Application submitted to Department of Immigration");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadApplicationDetail} />;
  if (!application) return <Error message="Application not found" />;

  const getStatusActions = () => {
    switch (application.status) {
      case "New":
        return [
          <Button 
            key="review" 
            onClick={() => handleStatusChange("In Review")}
            disabled={actionLoading}
          >
            Start Review
          </Button>
        ];
      case "In Review":
        return [
          <Button 
            key="info" 
            variant="warning"
            onClick={() => handleStatusChange("Additional Info Required")}
            disabled={actionLoading}
          >
            Request More Info
          </Button>,
          <Button 
            key="ready" 
            variant="success"
            onClick={() => handleStatusChange("Ready to Submit")}
            disabled={actionLoading}
          >
            Mark Ready
          </Button>
        ];
      case "Additional Info Required":
        return [
          <Button 
            key="review" 
            onClick={() => handleStatusChange("In Review")}
            disabled={actionLoading}
          >
            Resume Review
          </Button>
        ];
      case "Ready to Submit":
        return [
          <Button 
            key="pdf" 
            variant="secondary"
            onClick={generatePDF}
          >
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Generate PDF
          </Button>,
          <Button 
            key="submit" 
            variant="success"
            onClick={submitToImmigration}
            disabled={actionLoading}
          >
            <ApperIcon name="Send" className="w-4 h-4 mr-2" />
            Submit to Immigration
          </Button>
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/applications")}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client?.name}</h1>
            <p className="text-gray-600">{application.visaType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <StatusBadge status={application.status} />
          {getStatusActions()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary" />
              Client Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{client?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{client?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{client?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Portal Link</p>
                <p className="font-medium text-primary">{client?.portalLink}</p>
              </div>
            </div>
          </Card>

          {/* Application Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="FileText" className="w-5 h-5 mr-2 text-primary" />
              Application Details
            </h3>
            
            {application.formData && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">
                        {application.formData.personalInfo?.firstName} {application.formData.personalInfo?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium">{application.formData.personalInfo?.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Nationality</p>
                      <p className="font-medium">{application.formData.personalInfo?.nationality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Passport Number</p>
                      <p className="font-medium">{application.formData.personalInfo?.passportNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Application Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Purpose</p>
                      <p className="font-medium">{application.formData.applicationDetails?.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Planned Arrival</p>
                      <p className="font-medium">{application.formData.applicationDetails?.plannedArrival}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Documents */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="Paperclip" className="w-5 h-5 mr-2 text-primary" />
              Documents ({application.documents?.length || 0})
            </h3>
            
            {application.documents && application.documents.length > 0 ? (
              <div className="space-y-3">
                {application.documents.map((doc) => (
                  <div key={doc.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="File" className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">
                          Uploaded {format(new Date(doc.uploadedAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Download" className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No documents uploaded</p>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="Clock" className="w-5 h-5 mr-2 text-primary" />
              Timeline
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Application Created</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(application.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(application.updatedAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Messages */}
          <MessagePanel
            messages={application.messages || []}
            onSendMessage={handleSendMessage}
            currentUser="agent"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;