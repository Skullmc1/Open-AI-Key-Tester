"use client";

import { useState } from "react";
import {
  FiKey,
  FiEye,
  FiEyeOff,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { ApiKey } from "@/types";

interface ApiKeyManagerProps {
  selectedKeyId: string | null;
  onKeySelect: (keyId: string | null) => void;
  apiKeys: ApiKey[];
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKey[]>>;
}

const ApiKeyManager = ({
  selectedKeyId,
  onKeySelect,
  apiKeys,
  setApiKeys,
}: ApiKeyManagerProps) => {
  const [showAddKey, setShowAddKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [showKey, setShowKey] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const addKey = () => {
    if (newKeyName.trim() && newKeyValue.trim()) {
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName.trim(),
        key: newKeyValue.trim(),
      };
      setApiKeys([...apiKeys, newKey]);
      setNewKeyName("");
      setNewKeyValue("");
      setShowAddKey(false);
    }
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
    if (selectedKeyId === id) {
      onKeySelect(null);
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKey((prev) =>
      prev.includes(id) ? prev.filter((keyId) => keyId !== id) : [...prev, id],
    );
  };

  const startEditing = (key: ApiKey) => {
    setEditingId(key.id);
    setEditName(key.name);
  };

  const saveEdit = (id: string) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, name: editName.trim() } : key,
      ),
    );
    setEditingId(null);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-200">API Keys</h2>
        <button
          onClick={() => setShowAddKey(true)}
          className="bg-[#800020] text-white px-4 py-2 rounded-lg hover:bg-[#900030] transition-colors duration-300"
        >
          Add New Key
        </button>
      </div>

      {showAddKey && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                placeholder="Enter key name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                API Key
              </label>
              <input
                type="text"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                placeholder="Enter API key"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addKey}
                className="bg-[#800020] text-white px-4 py-2 rounded-lg hover:bg-[#900030] transition-colors duration-300"
              >
                Save Key
              </button>
              <button
                onClick={() => {
                  setShowAddKey(false);
                  setNewKeyName("");
                  setNewKeyValue("");
                }}
                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            className={`p-4 rounded-lg border ${
              selectedKeyId === key.id
                ? "border-[#800020] bg-gray-800"
                : "border-gray-700 bg-gray-800/50"
            } hover:border-[#800020] transition-colors duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <FiKey className="text-[#800020]" />
                {editingId === key.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded px-2 py-1"
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-200">{key.name}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingId === key.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(key.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-green-500"
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-red-500"
                    >
                      <FiX />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(key)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
                    >
                      {showKey.includes(key.id) ? <FiEyeOff /> : <FiEye />}
                    </button>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="mt-2">
              <div className="font-mono text-sm text-gray-400 bg-gray-900 p-2 rounded">
                {showKey.includes(key.id) ? key.key : "••••••••••••••••"}
              </div>
            </div>
            <div className="mt-2">
              <button
                onClick={() =>
                  onKeySelect(selectedKeyId === key.id ? null : key.id)
                }
                className={`text-sm ${
                  selectedKeyId === key.id
                    ? "text-[#800020]"
                    : "text-gray-400 hover:text-[#800020]"
                }`}
              >
                {selectedKeyId === key.id ? "Selected" : "Select for Chat"}
              </button>
            </div>
          </div>
        ))}

        {apiKeys.length === 0 && !showAddKey && (
          <div className="text-center text-gray-500 py-8">
            No API keys added yet. Click &quot;Add New Key&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyManager;
