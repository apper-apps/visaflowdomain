import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import FileUpload from "@/components/molecules/FileUpload";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const VisaForm = ({ visaType, initialData, onSave, onSubmit }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      passportExpiry: "",
      email: "",
      phone: ""
    },
    applicationDetails: {
      purpose: "",
      plannedArrival: "",
      plannedDeparture: "",
      previousVisas: "",
      criminalHistory: "no"
    },
    financialInfo: {
      funds: "",
      employment: "",
      sponsor: ""
    }
  });

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData.formData }));
      setDocuments(initialData.documents || []);
    }
  }, [initialData]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (files) => {
    const fileArray = Array.isArray(files) ? files : [files];
    const newDocuments = fileArray.map(file => ({
      Id: documents.length + Math.random(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString()
    }));
    
    setDocuments(prev => [...prev, ...newDocuments]);
    toast.success(`${fileArray.length} document(s) uploaded successfully`);
  };

  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.Id !== docId));
    toast.info("Document removed");
  };

  const handleSave = () => {
    const applicationData = {
      formData,
      documents,
      status: "In Review"
    };
    onSave(applicationData);
    toast.success("Application saved successfully");
  };

  const handleSubmit = () => {
    const applicationData = {
      formData,
      documents,
      status: "Ready to Submit"
    };
    onSubmit(applicationData);
    toast.success("Application submitted for agent review");
  };

  const getVisaSpecificFields = () => {
    switch (visaType) {
      case "Student Visa (Subclass 500)":
        return (
          <FormField
            label="Educational Institution"
            value={formData.applicationDetails.institution || ""}
            onChange={(e) => handleInputChange("applicationDetails", "institution", e.target.value)}
            required
          />
        );
      case "Skilled Worker Visa (Subclass 189)":
        return (
          <FormField
            label="Occupation"
            value={formData.applicationDetails.occupation || ""}
            onChange={(e) => handleInputChange("applicationDetails", "occupation", e.target.value)}
            required
          />
        );
      case "Partner Visa (Subclass 820)":
        return (
          <FormField
            label="Partner's Full Name"
            value={formData.applicationDetails.partnerName || ""}
            onChange={(e) => handleInputChange("applicationDetails", "partnerName", e.target.value)}
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
            required
          />
          <FormField
            label="Last Name"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
            required
          />
          <FormField
            label="Date of Birth"
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
            required
          />
          <FormField
            label="Nationality"
            value={formData.personalInfo.nationality}
            onChange={(e) => handleInputChange("personalInfo", "nationality", e.target.value)}
            required
          />
          <FormField
            label="Passport Number"
            value={formData.personalInfo.passportNumber}
            onChange={(e) => handleInputChange("personalInfo", "passportNumber", e.target.value)}
            required
          />
          <FormField
            label="Passport Expiry"
            type="date"
            value={formData.personalInfo.passportExpiry}
            onChange={(e) => handleInputChange("personalInfo", "passportExpiry", e.target.value)}
            required
          />
          <FormField
            label="Email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
            required
          />
          <FormField
            label="Phone"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
            required
          />
        </div>
      </Card>

      {/* Application Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="FileText" className="w-5 h-5 mr-2 text-primary" />
          Application Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Purpose of Visit"
            type="textarea"
            value={formData.applicationDetails.purpose}
            onChange={(e) => handleInputChange("applicationDetails", "purpose", e.target.value)}
            rows={3}
            required
          />
          <FormField
            label="Planned Arrival Date"
            type="date"
            value={formData.applicationDetails.plannedArrival}
            onChange={(e) => handleInputChange("applicationDetails", "plannedArrival", e.target.value)}
            required
          />
          <FormField
            label="Planned Departure Date"
            type="date"
            value={formData.applicationDetails.plannedDeparture}
            onChange={(e) => handleInputChange("applicationDetails", "plannedDeparture", e.target.value)}
          />
          <FormField
            label="Criminal History"
            type="select"
            value={formData.applicationDetails.criminalHistory}
            onChange={(e) => handleInputChange("applicationDetails", "criminalHistory", e.target.value)}
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </FormField>
          {getVisaSpecificFields()}
        </div>
      </Card>

      {/* Financial Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="DollarSign" className="w-5 h-5 mr-2 text-primary" />
          Financial Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Available Funds (AUD)"
            type="number"
            value={formData.financialInfo.funds}
            onChange={(e) => handleInputChange("financialInfo", "funds", e.target.value)}
            required
          />
          <FormField
            label="Employment Status"
            value={formData.financialInfo.employment}
            onChange={(e) => handleInputChange("financialInfo", "employment", e.target.value)}
            required
          />
          <FormField
            label="Sponsor (if applicable)"
            value={formData.financialInfo.sponsor}
            onChange={(e) => handleInputChange("financialInfo", "sponsor", e.target.value)}
            className="md:col-span-2"
          />
        </div>
      </Card>

      {/* Document Upload */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="Paperclip" className="w-5 h-5 mr-2 text-primary" />
          Supporting Documents
        </h3>
        
        <FileUpload
          onFileSelect={handleFileUpload}
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="mb-4"
        />

        {documents.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
            {documents.map((doc) => (
              <div key={doc.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="File" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{doc.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(doc.Id)}
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={handleSave}>
          Save Draft
        </Button>
        <Button onClick={handleSubmit}>
          Submit for Review
        </Button>
      </div>
    </div>
  );
};

export default VisaForm;