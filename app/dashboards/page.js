"use client";

import { useState } from "react";

// Components
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";
import DashboardHeader from "../components/DashboardHeader";
import PlanCard from "../components/PlanCard";
import ApiKeysTable from "../components/ApiKeysTable";
import CreateKeyModal from "../components/CreateKeyModal";
import EditKeyModal from "../components/EditKeyModal";

// Hooks
import useApiKeys from "../hooks/useApiKeys";

export default function DashboardPage() {
  // API Keys hook - handles all CRUD operations
  const { 
    apiKeys, 
    loading, 
    totalUsage, 
    createApiKey, 
    updateApiKey, 
    deleteApiKey 
  } = useApiKeys();

  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Toast notification helper
  const showToastMessage = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Handlers
  const handleCreate = async (name, limit) => {
    const result = await createApiKey(name, limit);
    if (result.success) {
      showToastMessage('API Key created successfully', 'success');
    } else {
      showToastMessage('Failed to create API Key', 'error');
    }
    return result;
  };

  const handleEdit = async (id, name) => {
    const result = await updateApiKey(id, name);
    if (result.success) {
      showToastMessage('API Key updated successfully', 'success');
      setEditingKey(null);
    } else {
      showToastMessage('Failed to update API Key', 'error');
    }
    return result;
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      const result = await deleteApiKey(id);
      if (result.success) {
        showToastMessage('API Key deleted successfully', 'success');
      } else {
        showToastMessage('Failed to delete API Key', 'error');
      }
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToastMessage('Copied API Key to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openEditModal = (apiKey) => {
    setEditingKey(apiKey);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader 
          sidebarOpen={sidebarOpen} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Plan Card */}
          <PlanCard totalUsage={totalUsage} maxLimit={1000} />

          {/* API Keys Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              The key is used to authenticate your requests to the{" "}
              <a href="#" className="text-gray-700 underline">Research API</a>. 
              To learn more, see the{" "}
              <a href="#" className="text-gray-700 underline">documentation</a> page.
            </p>

            {/* Table */}
            {loading ? (
              <div className="py-12 text-center text-gray-500">Loading...</div>
            ) : (
              <ApiKeysTable 
                apiKeys={apiKeys}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onCopy={handleCopy}
                copiedId={copiedId}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Have any questions, feedback or need support? We'd love to hear from you!
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Contact us
            </button>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <CreateKeyModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />

      <EditKeyModal 
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingKey(null);
        }}
        onSave={handleEdit}
        apiKey={editingKey}
      />

      {/* Notification */}
      <Notification toast={toast} />
    </div>
  );
}
