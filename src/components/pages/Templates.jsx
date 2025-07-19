import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Templates = () => {
  const templates = [
    {
      Id: 1,
      name: "Student Visa Application",
      description: "Standard template for Subclass 500 applications",
      fields: 24,
      lastUpdated: "2024-01-15"
    },
    {
      Id: 2,
      name: "Skilled Worker Visa",
      description: "Template for Subclass 189 skilled migration",
      fields: 32,
      lastUpdated: "2024-01-20"
    },
    {
      Id: 3,
      name: "Partner Visa Application", 
      description: "Template for Subclass 820/801 applications",
      fields: 28,
      lastUpdated: "2024-01-25"
    },
    {
      Id: 4,
      name: "Visitor Visa Template",
      description: "Template for Subclass 600 visitor applications",
      fields: 18,
      lastUpdated: "2024-02-01"
    },
    {
      Id: 5,
      name: "Business Visa Template",
      description: "Template for Subclass 188 business applications",
      fields: 35,
      lastUpdated: "2024-02-05"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Templates</h1>
          <p className="text-gray-600">Manage standardized forms for different visa types</p>
        </div>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.Id} hover className="p-6 cursor-pointer">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="FileTemplate" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <ApperIcon name="FileText" className="w-4 h-4 mr-2" />
                  {template.fields} fields
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                  Updated {template.lastUpdated}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="secondary">
                  <ApperIcon name="Edit" className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm">
                  <ApperIcon name="Copy" className="w-4 h-4 mr-1" />
                  Duplicate
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileTemplate" className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-6 h-6 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Most Used</p>
              <p className="text-2xl font-bold text-gray-900">Student Visa</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="w-6 h-6 text-warning" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg. Completion</p>
              <p className="text-2xl font-bold text-gray-900">24 min</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Templates;