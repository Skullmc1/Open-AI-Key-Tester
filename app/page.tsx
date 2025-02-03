"use client";

import { useState, useEffect } from "react";
import ApiKeyManager from "@/components/ApiKeyManager";
import ChatSection from "@/components/ChatSection";
import { ApiKey } from "@/types";

export default function Home() {
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  // Load API keys from localStorage on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem("apiKeys");
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  // Save API keys to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("apiKeys", JSON.stringify(apiKeys));
  }, [apiKeys]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ApiKeyManager
        selectedKeyId={selectedKeyId}
        onKeySelect={setSelectedKeyId}
        apiKeys={apiKeys}
        setApiKeys={setApiKeys}
      />
      <ChatSection selectedKeyId={selectedKeyId} apiKeys={apiKeys} />
    </div>
  );
}
