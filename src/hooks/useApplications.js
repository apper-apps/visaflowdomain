import { useState, useEffect } from "react";
import { applicationService } from "@/services/api/applicationService";

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await applicationService.getAll();
      setApplications(data);
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const createApplication = async (applicationData) => {
    try {
      const newApplication = await applicationService.create(applicationData);
      setApplications(prev => [...prev, newApplication]);
      return newApplication;
    } catch (err) {
      throw new Error(err.message || "Failed to create application");
    }
  };

  const updateApplication = async (id, applicationData) => {
    try {
      const updatedApplication = await applicationService.update(id, applicationData);
      setApplications(prev => prev.map(a => a.Id === parseInt(id) ? updatedApplication : a));
      return updatedApplication;
    } catch (err) {
      throw new Error(err.message || "Failed to update application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const updatedApplication = await applicationService.updateStatus(id, status);
      setApplications(prev => prev.map(a => a.Id === parseInt(id) ? updatedApplication : a));
      return updatedApplication;
    } catch (err) {
      throw new Error(err.message || "Failed to update application status");
    }
  };

  const addMessage = async (id, message) => {
    try {
      const updatedApplication = await applicationService.addMessage(id, message);
      setApplications(prev => prev.map(a => a.Id === parseInt(id) ? updatedApplication : a));
      return updatedApplication;
    } catch (err) {
      throw new Error(err.message || "Failed to add message");
    }
  };

  return {
    applications,
    loading,
    error,
    loadApplications,
    createApplication,
    updateApplication,
    updateApplicationStatus,
    addMessage
  };
};