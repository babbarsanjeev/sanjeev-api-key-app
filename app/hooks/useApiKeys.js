"use client";

import { useState, useEffect, useCallback } from "react";

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API keys
  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/keys');
      const data = await response.json();
      
      // Map Supabase snake_case to camelCase for the UI
      const mappedData = data.map(item => ({
        id: item.id,
        name: item.name,
        key: item.key,
        usage: item.usage || 0,
        limit: item.limit_value,
        createdAt: item.created_at,
      }));
      
      setApiKeys(mappedData);
      setError(null);
    } catch (err) {
      console.error('Error fetching API keys:', err);
      setError('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create API key
  const createApiKey = async (name, limit) => {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, limit }),
      });
      
      if (response.ok) {
        await fetchApiKeys();
        return { success: true };
      } else {
        return { success: false, error: 'Failed to create API key' };
      }
    } catch (err) {
      console.error('Error creating API key:', err);
      return { success: false, error: 'Failed to create API key' };
    }
  };

  // Update API key
  const updateApiKey = async (id, name) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      
      if (response.ok) {
        await fetchApiKeys();
        return { success: true };
      } else {
        return { success: false, error: 'Failed to update API key' };
      }
    } catch (err) {
      console.error('Error updating API key:', err);
      return { success: false, error: 'Failed to update API key' };
    }
  };

  // Delete API key
  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchApiKeys();
        return { success: true };
      } else {
        return { success: false, error: 'Failed to delete API key' };
      }
    } catch (err) {
      console.error('Error deleting API key:', err);
      return { success: false, error: 'Failed to delete API key' };
    }
  };

  // Calculate total usage
  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage, 0);

  // Fetch on mount
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  return {
    apiKeys,
    loading,
    error,
    totalUsage,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
}

