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
      
      // Generate portal link with better error handling
      const portalLink = `${window.location.origin}/${newClient.portalLink}`;
      
      // Try to copy to clipboard, but don't fail if it doesn't work
      try {
        await navigator.clipboard.writeText(portalLink);
        toast.info("Portal link copied to clipboard");
      } catch (clipboardErr) {
        // Clipboard access might fail in some browsers, but continue demo
        console.log("Clipboard access not available, continuing with demo");
      }
      
      // Enhanced success dialog for demo experience
      const experiencePortal = window.confirm(
        `✅ Client portal created successfully for ${formData.name}!\n\n🚀 Ready to experience the full client journey?\n\nClick OK to view the portal as your client would see it - from visa selection through application submission.\n\nThis will open the client portal in a new tab where you can demo the complete experience.`
      );
      
      if (experiencePortal) {
        // Extract token from portal link for navigation with better validation
        const token = newClient.portalLink ? newClient.portalLink.split('/').pop() : 'demo';
        
        // Open portal in new tab for demo experience
        const portalUrl = `/portal/${token}`;
        const newWindow = window.open(portalUrl, '_blank');
        
        if (newWindow) {
          toast.success("Portal opened! Demo the complete client experience in the new tab.");
        } else {
          toast.warning("Portal link ready! Please allow popups to view the demo experience.");
          // Fallback: provide manual navigation option
          setTimeout(() => {
            const manualNav = window.confirm("Click OK to navigate to the portal in this tab, or Cancel to stay here.");
            if (manualNav) {
              window.location.href = portalUrl;
              return; // Don't navigate to clients if going to portal
            }
          }, 1000);
        }
      }
      
      // Only navigate to clients if not going to portal
      if (!experiencePortal) {
        navigate("/clients");
      }
      
    } catch (err) {
      // Enhanced error handling for demo scenarios
      console.error("Client creation error:", err);
      
      // Provide user-friendly error message that doesn't block demo
      const errorMessage = err.message || "Unable to create client portal";
      
      if (errorMessage.includes("validation") || errorMessage.includes("required")) {
        toast.error("Please check all required fields and try again.");
      } else {
        // For demo purposes, offer to continue even with technical errors
        toast.error(`Creation issue: ${errorMessage}`);
        
        // In demo scenarios, offer alternative flow
        setTimeout(() => {
          const continueDemo = window.confirm(
            "Technical issue encountered, but we can continue the demo!\n\nWould you like to experience an existing client portal to showcase the full application process?"
          );
          
          if (continueDemo) {
            // Use existing demo portal for showcase
            const demoToken = "client-abc123";
            window.open(`/portal/${demoToken}`, '_blank');
            toast.info("Opening demo portal - experience the complete client journey!");
          }
        }, 2000);
      }
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