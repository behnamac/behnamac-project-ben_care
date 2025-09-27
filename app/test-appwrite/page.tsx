"use client";

import { useState } from "react";

import { testAppwriteSetup } from "@/lib/actions/patient.actions";

export default function TestAppwritePage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult("Testing...");

    try {
      const success = await testAppwriteSetup();
      setResult(
        success
          ? "✅ Appwrite connection successful!"
          : "❌ Appwrite connection failed!"
      );
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-dark-300">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Appwrite Connection Test
        </h1>

        <button
          onClick={handleTest}
          disabled={loading}
          className="px-6 py-3 text-white rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Appwrite Connection"}
        </button>

        {result && (
          <div className="p-4 mt-6 rounded-lg bg-gray-800">
            <pre className="text-sm text-white">{result}</pre>
          </div>
        )}

        <div className="mt-8 text-gray-400">
          <h3 className="mb-2 text-lg font-semibold">What to check:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Make sure your .env.local file exists</li>
            <li>Check that your API_KEY is correct</li>
            <li>Verify your DATABASE_ID and PATIENT_COLLECTION_ID</li>
            <li>Ensure your Appwrite project is active</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
