"use client";
import { ApiKey } from "@/types";
import { useState } from "react";
import { FiSend, FiTrash2, FiAlertCircle } from "react-icons/fi";
interface Message {
  role: "user" | "assistant" | "error";
  content: string;
}

interface ChatSectionProps {
  selectedKeyId: string | null;
  apiKeys: ApiKey[];
}

const LoadingSpinner = () => (
  <div className="flex items-center space-x-3 bg-gray-800/50 p-4 rounded-lg max-w-[200px]">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-[#800020] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-[#800020] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-[#800020] rounded-full animate-bounce"></div>
    </div>
    <span className="text-sm text-gray-400">AI is thinking...</span>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400">
    <FiAlertCircle className="w-5 h-5" />
    <span>{message}</span>
  </div>
);

const ChatSection = ({ selectedKeyId, apiKeys }: ChatSectionProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedKeyId) return;

    const selectedKey = apiKeys.find((key) => key.id === selectedKeyId);
    if (!selectedKey) return;

    setError(null);
    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          apiKey: selectedKey.key, // Send the actual API key
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        { role: "error", content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-800">
      <div className="p-4 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-200">
          Chat with API Key {selectedKeyId}
        </h2>
        <button
          onClick={clearChat}
          className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
        >
          <FiTrash2 className="w-5 h-5" />
          <span>Clear Chat</span>
        </button>
      </div>

      <div className="h-[500px] overflow-y-auto p-6 bg-gray-900/50">
        {error && <ErrorMessage message={error} />}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-2xl max-w-[80%] ${
                message.role === "user"
                  ? "bg-[#800020] text-white"
                  : message.role === "error"
                    ? "bg-red-900/20 border border-red-800 text-red-400"
                    : "bg-gray-800 text-gray-200"
              }`}
            >
              {message.role === "error" && (
                <div className="flex items-center gap-2 mb-1">
                  <FiAlertCircle className="w-4 h-4" />
                  <span className="font-semibold">Error</span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="mt-4">
            <LoadingSpinner />
          </div>
        )}

        {messages.length === 0 && !error && (
          <div className="text-center text-gray-500 mt-20">
            <p>No messages yet. Start a conversation!</p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-800 bg-gray-900"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-800 text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#800020] border border-gray-700"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#800020] text-white px-6 py-3 rounded-lg hover:bg-[#900030] transition-colors duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>Send</span>
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
