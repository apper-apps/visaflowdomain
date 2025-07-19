import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { useClients } from "@/hooks/useClients";
import { toast } from "react-toastify";

const CreateClient = () => {
  const navigate = useNavigate();
  const { createClient } = useClients();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

setLoading(true);
    try {
      const newClient = await createClient(formData);
      toast.success("Client portal created successfully!");
      
      // Copy portal link to clipboard
      const portalLink = `${window.location.origin}/${newClient.portalLink}`;
      await navigator.clipboard.writeText(portalLink);
      toast.info("Portal link copied to clipboard");
      
      // Show success with portal access options
      const experiencePortal = window.confirm(
        "Client portal created successfully!\n\nWould you like to experience the client portal now?\n\nClick OK to view the portal as your client would see it, or Cancel to return to the clients list."
      );
      
      if (experiencePortal) {
        // Extract token from portal link for navigation
        const token = newClient.portalLink.split('/').pop();
        window.open(`/portal/${token}`, '_blank');
      }
      
      navigate("/clients");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/clients")}
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Back to Clients
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Client Portal</h1>
          <p className="text-gray-600">Set up a new client portal for visa applications</p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormField
              label="Client Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={errors.name}
              required
              placeholder="Enter client's full name"
            />

            <FormField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
              required
              placeholder="client@example.com"
            />

            <FormField
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              error={errors.phone}
              required
              placeholder="+61 xxx xxx xxx"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ApperIcon name="Info" className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Portal Access</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Once created, your client will receive a unique portal link where they can select their visa type, 
                  complete the application form, upload documents, and track their application status.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/clients")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Creating Portal...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  Create Client Portal
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateClient;