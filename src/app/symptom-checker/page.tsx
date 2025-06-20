// app/check-symptom/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Stethoscope, Phone, FileText } from 'lucide-react';
import InitialForm from "./_components/InitialForm";
import ChatMessage from "./_components/ChatMessage";
import LoadingSpinner from "./_components/LoadingSpinner";
import { Message, SymptomData } from "./types";

export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [symptomData, setSymptomData] = useState<SymptomData | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInitialSubmit = async (data: SymptomData) => {
    setSymptomData(data);
    const initialMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: `I am ${data.age ? `${data.age} years old` : ''} ${data.gender || ''} experiencing ${data.symptoms}. ${
        data.duration ? `The symptoms have been present for ${data.duration}` : ''
      }${data.severity ? ` and are ${data.severity}` : ''}. Can you help me?`.replace(/\s+/g, ' ').trim(),
      timestamp: new Date(),
    };
    await handleNewMessage(initialMessage);
  };

  const handleNewMessage = async (message: Message) => {
    try {
      setMessages(prev => [...prev, message]);
      setIsLoading(true);
      setError("");

    const res = await fetch("/api/symptom-checker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, message],
          symptomData,
        }),
    });

    const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.message) {
        throw new Error("No response received from the assistant");
      }

      setMessages(prev => [...prev, {
        id: uuidv4(),
        type: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message: Message = {
      id: uuidv4(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setInput("");
    await handleNewMessage(message);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    if (isLoading) return;
    setInput(question);
    handleNewMessage({
      id: uuidv4(),
      type: 'user',
      content: question,
      timestamp: new Date(),
    });
  };

  if (!symptomData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                AI Medical Assistant
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please provide some information about yourself and your symptoms to get started.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.01]">
            <InitialForm onSubmit={handleInitialSubmit} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <div className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Chat Section */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 min-h-[600px] flex flex-col transform transition-all hover:shadow-xl">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-white rounded-t-xl">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">AI Medical Assistant</h2>
                    <p className="text-sm text-gray-500">Interactive medical consultation</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
                  {messages.map((message) => (
                    <ChatMessage 
                      key={message.id} 
                      message={message} 
                      onSuggestedQuestionClick={handleSuggestedQuestionClick}
                      isLoading={isLoading}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-center my-4">
                      <LoadingSpinner />
                    </div>
                  )}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg my-4">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gradient-to-r from-white to-gray-50 rounded-b-xl">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all placeholder-gray-400 bg-white"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-black px-6 py-2 rounded-lg
                        hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* CTA Cards Section - Shows on right side for lg screens */}
            <div className="lg:w-80 space-y-4">
              {/* Emergency Contact Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform transition-all hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  If you're experiencing severe symptoms, don't wait - contact emergency services immediately.
                </p>
                <a
                  href="tel:911"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Call Emergency (911)
                </a>
              </div>

              {/* Find a Doctor Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform transition-all hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Find a Doctor</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Connect with qualified healthcare professionals in your area for personalized care.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search Doctors
                </a>
              </div>

              {/* Health Resources Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform transition-all hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Health Resources</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Access our comprehensive library of medical information and health guides.
                </p>
                <a
                  href="/resources"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Resources
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            ⚠️ This is an AI-powered tool for general guidance only. Always consult a qualified healthcare professional for medical advice.
          </div>
        </div>
      </div>
    </div>
  );
}
