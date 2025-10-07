'use client';

import { useState, useEffect } from 'react';
import VaultItem from './VaultItem';
import VaultForm from './VaultForm';
import PasswordGenerator from './passwordGenerator';
import { encrypt, decrypt } from '@/lib/encryption';

export default function Vault() {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isUnlocked) {
      fetchItems();
    }
  }, [isUnlocked]);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/vault');
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword.length >= 8) {
      setIsUnlocked(true);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      const encryptedPassword = encrypt(formData.password, masterPassword);

      const payload = {
        title: formData.title,
        username: formData.username,
        encryptedPassword,
        url: formData.url,
        notes: formData.notes,
      };

      if (editingItem) {
        await fetch(`/api/vault/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/vault', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      fetchItems();
      setShowForm(false);
      setEditingItem(null);
      setGeneratedPassword('');
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;

    try {
      await fetch(`/api/vault/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (item: any) => {
    const decryptedPassword = decrypt(item.encryptedPassword, masterPassword);
    setEditingItem({ ...item, password: decryptedPassword });
    setShowForm(true);
  };

  const handleCopyPassword = async (id: string) => {
    const item = items.find((i) => i._id === id);
    if (!item) return;

    try {
      const decryptedPassword = decrypt(item.encryptedPassword, masterPassword);
      await navigator.clipboard.writeText(decryptedPassword);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 15000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🔒 Unlock Vault</h2>
        <form onSubmit={handleUnlock}>
          <input
            type="password"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            placeholder="Enter master password"
            className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-800"
            minLength={8}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search vault..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded text-gray-800"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Generate Password</h3>
          <PasswordGenerator onGenerate={setGeneratedPassword} />
        </div>

        <div>
          {showForm ? (
            <VaultForm
              onSubmit={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
                setGeneratedPassword('');
              }}
              initialData={editingItem}
              generatedPassword={generatedPassword}
            />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 text-lg"
            >
              ➕ Add New Item
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <VaultItem
            key={item._id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCopyPassword={handleCopyPassword}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No items found. Add your first password!</p>
      )}
    </div>
  );
}