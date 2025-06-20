// app/check-symptom/_components/SymptomInput.tsx
"use client";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  onSubmit: (symptom: string) => Promise<void>;
  isLoading: boolean;
};

export default function SymptomInput({ onSubmit, isLoading }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Please describe your symptoms");
      return;
    }
    setError("");
    await onSubmit(input);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isLoading ? 'opacity-50' : ''}`}
          placeholder="Please describe your symptoms in detail..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
          rows={4}
          disabled={isLoading}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg 
          hover:bg-blue-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
          ${isLoading ? 'cursor-not-allowed' : 'hover:shadow-lg'}`}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Check Medicines</span>
          </>
        )}
      </button>
    </div>
  );
}
