import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Applications from "@/components/pages/Applications";
import ApplicationDetail from "@/components/pages/ApplicationDetail";
import Clients from "@/components/pages/Clients";
import CreateClient from "@/components/pages/CreateClient";
import ClientPortal from "@/components/pages/ClientPortal";
import Templates from "@/components/pages/Templates";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Client Portal Route (outside main layout) */}
          <Route path="/portal/:token" element={<ClientPortal />} />
          
          {/* Main Application Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetail />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/create" element={<CreateClient />} />
            <Route path="templates" element={<Templates />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;