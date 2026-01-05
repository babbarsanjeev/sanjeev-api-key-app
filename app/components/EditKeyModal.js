"use client";

import { useState, useEffect } from "react";

export default function EditKeyModal({ isOpen, onClose, onSave, apiKey }) {
  const [keyName, setKeyName] = useState("");

  // Update keyName when apiKey changes
  useEffect(() => {
    if (apiKey) {
      setKeyName(apiKey.name);
    }
  }, [apiKey]);

  if (!isOpen || !apiKey) return null;

  const handleSave = async () => {
    if (!keyName.trim()) return;
    
    const result = await onSave(apiKey.id, keyName);
    
    if (result.success) {
      setKeyName("");
      onClose();
    }
  };

  const handleClose = () => {
    setKeyName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit API Key</h2>
        <input
          type="text"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Enter new key name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

