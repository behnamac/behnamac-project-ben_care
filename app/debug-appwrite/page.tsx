"use client";

import { useState } from "react";

import { testAppwriteSetup } from "@/lib/actions/patient.actions";

export default function DebugAppwritePage() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults((prev) => [...prev, message]);
  };

  const handleTest = async () => {
    setLoading(true);
    setResults([]);

    addResult("🔍 Starting Appwrite Diagnostic...");

    try {
      // Test 1: Environment Variables
      addResult("📋 Checking Environment Variables...");
      const envVars = {
        ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
        PROJECT_ID: process.env.PROJECT_ID,
        API_KEY: process.env.API_KEY ? "***HIDDEN***" : "❌ MISSING",
        DATABASE_ID: process.env.DATABASE_ID,
        PATIENT_COLLECTION_ID: process.env.PATIENT_COLLECTION_ID,
        APPOINTMENT_COLLECTION_ID: process.env.APPOINTMENT_COLLECTION_ID,
      };

      addResult(`ENDPOINT: ${envVars.ENDPOINT || "❌ MISSING"}`);
      addResult(`PROJECT_ID: ${envVars.PROJECT_ID || "❌ MISSING"}`);
      addResult(`API_KEY: ${envVars.API_KEY}`);
      addResult(`DATABASE_ID: ${envVars.DATABASE_ID || "❌ MISSING"}`);
      addResult(
        `PATIENT_COLLECTION_ID: ${envVars.PATIENT_COLLECTION_ID || "❌ MISSING"}`
      );
      addResult(
        `APPOINTMENT_COLLECTION_ID: ${envVars.APPOINTMENT_COLLECTION_ID || "❌ MISSING"}`
      );

      // Test 2: Appwrite Connection
      addResult("\n🔌 Testing Appwrite Connection...");
      const connectionOk = await testAppwriteSetup();

      if (connectionOk) {
        addResult("✅ Appwrite connection successful!");
      } else {
        addResult("❌ Appwrite connection failed!");
        addResult("💡 Check your API_KEY and PROJECT_ID in .env.local");
      }
    } catch (error) {
      addResult(`❌ Error during testing: ${error}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-300 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Appwrite Diagnostic Tool
        </h1>

        <div className="mb-6 rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            What This Tests:
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Environment variables from .env.local</li>
            <li>• Appwrite API connection</li>
            <li>• Database and collection access</li>
            <li>• Authentication with your API key</li>
          </ul>
        </div>

        <button
          onClick={handleTest}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Running Diagnostics..." : "🔍 Run Full Diagnostic"}
        </button>

        {results.length > 0 && (
          <div className="mt-8 rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Diagnostic Results:
            </h3>
            <div className="space-y-1">
              {results.map((result, index) => (
                <div key={index} className="text-sm font-mono text-gray-300">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-6">
          <h3 className="mb-4 text-lg font-semibold text-yellow-400">
            Common Issues & Solutions:
          </h3>
          <div className="space-y-2 text-gray-300">
            <div>
              <strong>❌ Missing Environment Variables:</strong>
              <p>• Create .env.local file in project root</p>
              <p>• Copy from env.example and fill in your values</p>
            </div>
            <div>
              <strong>❌ Wrong API Key:</strong>
              <p>• Get Server API Key from Appwrite Console</p>
              <p>• Make sure it has full access permissions</p>
            </div>
            <div>
              <strong>❌ Wrong Collection IDs:</strong>
              <p>• Check Collection IDs in Appwrite Console</p>
              <p>• Make sure collections exist and are active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
