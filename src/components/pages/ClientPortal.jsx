import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ProgressIndicator from "@/components/molecules/ProgressIndicator";
import VisaForm from "@/components/organisms/VisaForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { clientService } from "@/services/api/clientService";
import { applicationService } from "@/services/api/applicationService";
import { toast } from "react-toastify";

const ClientPortal = () => {
  const { token } = useParams();
  const [client, setClient] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVisaType, setSelectedVisaType] = useState("");

  const steps = ["Select Visa", "Complete Form", "Review & Submit"];
  
  const visaTypes = [
    {
      value: "Student Visa (Subclass 500)",
      label: "Student Visa (Subclass 500)",
      description: "For studying at an Australian educational institution"
    },
    {
      value: "Skilled Worker Visa (Subclass 189)",
      label: "Skilled Worker Visa (Subclass 189)", 
      description: "For skilled workers seeking permanent residence"
    },
    {
      value: "Partner Visa (Subclass 820)",
      label: "Partner Visa (Subclass 820)",
      description: "For partners of Australian citizens or residents"
    },
    {
      value: "Visitor Visa (Subclass 600)",
      label: "Visitor Visa (Subclass 600)",
      description: "For tourism, business, or visiting family and friends"
    },
    {
      value: "Business Visa (Subclass 188)",
      label: "Business Visa (Subclass 188)",
      description: "For business owners and investors"
    }
  ];

  const loadClientData = async () => {
    setLoading(true);
    setError("");
    try {
      // Find client by portal token
      const clients = await clientService.getAll();
      const foundClient = clients.find(c => c.portalLink.includes(token));
      
      if (!foundClient) {
        throw new Error("Invalid portal link");
      }
      
      setClient(foundClient);
      
      // Check for existing application
      const applications = await applicationService.getByClientId(foundClient.Id);
      if (applications.length > 0) {
        const latestApp = applications[applications.length - 1];
        setApplication(latestApp);
        setSelectedVisaType(latestApp.visaType);
        
        // Set step based on application status
        if (latestApp.status === "New") {
          setCurrentStep(1);
        } else {
          setCurrentStep(2);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to load portal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientData();
  }, [token]);

  const handleVisaSelect = (visaType) => {
    setSelectedVisaType(visaType);
    setCurrentStep(1);
  };

  const handleFormSave = async (formData) => {
    try {
      if (application) {
        await applicationService.update(application.Id, formData);
        setApplication(prev => ({ ...prev, ...formData }));
      } else {
        const newApp = await applicationService.create({
          clientId: client.Id,
          visaType: selectedVisaType,
          ...formData
        });
        setApplication(newApp);
      }
    } catch (err) {
      throw new Error(err.message || "Failed to save application");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await handleFormSave(formData);
      setCurrentStep(2);
    } catch (err) {
      throw new Error(err.message || "Failed to submit application");
    }
  };

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadClientData} />;
  if (!client) return <Error message="Portal not found" />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Plane" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VisaFlow Pro</h1>
              <p className="text-gray-600">Client Portal - {client.name}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps.length}
              steps={steps}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Visa Type</h2>
              <p className="text-gray-600">Choose the visa that matches your purpose for visiting Australia</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visaTypes.map((visa) => (
                <Card
                  key={visa.value}
                  hover
                  className="p-6 cursor-pointer border-2 hover:border-primary transition-colors"
                  onClick={() => handleVisaSelect(visa.value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <ApperIcon name="FileText" className="w-8 h-8 text-primary" />
                      <ApperIcon name="ArrowRight" className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{visa.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{visa.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && selectedVisaType && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Application</h2>
              <p className="text-gray-600">Fill in all required information for your {selectedVisaType}</p>
            </div>

            <VisaForm
              visaType={selectedVisaType}
              initialData={application}
              onSave={handleFormSave}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}

        {currentStep === 2 && application && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted</h2>
              <p className="text-gray-600">Your application has been submitted for review</p>
            </div>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="CheckCircle" className="w-8 h-8 text-success" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Application Under Review
              </h3>
              
              <p className="text-gray-600 mb-6">
                Your {selectedVisaType} application has been submitted successfully. 
                Our immigration agent will review your application and may contact you if additional information is needed.
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Our agent will review your application within 2-3 business days</li>
                  <li>• You'll be notified if additional documentation is required</li>
                  <li>• Once approved, we'll submit your application to the Department of Immigration</li>
                  <li>• You'll receive a confirmation with your reference number</li>
                </ul>
              </div>

              <div className="mt-6">
                <Button onClick={() => window.location.reload()}>
                  <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                  Check Status
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;