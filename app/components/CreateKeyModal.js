"use client";

import { useState } from "react";

export default function CreateKeyModal({ isOpen, onClose, onCreate }) {
  const [keyName, setKeyName] = useState("");
  const [limitUsage, setLimitUsage] = useState(false);
  const [usageLimit, setUsageLimit] = useState("1000");

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!keyName.trim()) return;
    
    const limit = limitUsage ? parseInt(usageLimit) || null : null;
    const result = await onCreate(keyName, limit);
    
    if (result.success) {
      setKeyName("");
      setLimitUsage(false);
      setUsageLimit("1000");
      onClose();
    }
  };

  const handleClose = () => {
    setKeyName("");
    setLimitUsage(false);
    setUsageLimit("1000");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Create a new API key
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Enter a name and limit for the new API key.
        </p>
        
        {/* Key Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Name <span className="text-gray-400 font-normal">— A unique name to identify this key</span>
          </label>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Key Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Limit Monthly Usage */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={limitUsage}
              onChange={(e) => setLimitUsage(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Limit monthly usage*</span>
          </label>
          <input
            type="number"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
            disabled={!limitUsage}
            placeholder="1000"
            className={`mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${!limitUsage ? 'bg-gray-50 text-gray-400' : ''}`}
          />
        </div>

        {/* Warning Text */}
        <p className="text-xs text-gray-500 mb-6">
          * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            Create
          </button>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

