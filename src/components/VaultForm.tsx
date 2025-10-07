'use client';

import { useState, useEffect } from 'react';

interface VaultFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  generatedPassword?: string;
}

export default function VaultForm({ onSubmit, onCancel, initialData, generatedPassword }: VaultFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (generatedPassword) {
      setFormData((prev) => ({ ...prev, password: generatedPassword }));
    }
  }, [generatedPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {initialData ? 'Edit' : 'Add'} Vault Item
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800"
            placeholder="e.g., Gmail Account"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username / Email
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800"
            rows={3}
            placeholder="Additional notes..."
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          type="submit"
          className="flex-1 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-colors"
        >
          {initialData ? 'Update' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-500 text-white rounded font-semibold hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}