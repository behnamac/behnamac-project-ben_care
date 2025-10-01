"use client";

import { useState } from "react";

import { registerPatient } from "@/lib/actions/patient.actions";

export default function TestPatientPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleCreateTestPatient = async () => {
    setLoading(true);
    setResult("Creating test patient...");

    try {
      const testPatient = {
        userId: "test-user-" + Date.now(),
        name: "Test Patient",
        email: "test@example.com",
        phone: "+1234567890",
        birthDate: new Date("1990-01-01"),
        gender: "Male" as const,
        address: "123 Test Street",
        occupation: "Software Developer",
        emergencyContactName: "Emergency Contact",
        emergencyContactNumber: "+1234567890",
        primaryPhysician: "Dr. Test",
        insuranceProvider: "Test Insurance",
        insurancePolicyNumber: "TEST123",
        allergies: undefined,
        currentMedication: undefined,
        familyMedicalHistory: undefined,
        pastMedicalHistory: undefined,
        identificationType: undefined,
        identificationNumber: undefined,
        identificationDocument: undefined,
        privacyConsent: true,
      };

      console.log("Creating test patient with data:", testPatient);

      const newPatient = await registerPatient(testPatient);

      if (newPatient) {
        setResult("✅ Test patient created successfully!");
        console.log("Created patient:", newPatient);
      } else {
        setResult("❌ Failed to create test patient");
      }
    } catch (error) {
      setResult(`❌ Error: ${error}`);
      console.error("Test patient creation error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-300 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Test Patient Creation
        </h1>

        <div className="mb-6 rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            This will create a test patient with:
          </h2>
          <ul className="space-y-1 text-gray-300">
            <li>• Name: Test Patient</li>
            <li>• Email: test@example.com</li>
            <li>• Phone: +1234567890</li>
            <li>• All required fields filled</li>
          </ul>
        </div>

        <button
          onClick={handleCreateTestPatient}
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Test Patient"}
        </button>

        {result && (
          <div className="mt-6 rounded-lg bg-gray-800 p-4">
            <pre className="text-sm text-white">{result}</pre>
          </div>
        )}

        <div className="mt-8 text-gray-400">
          <h3 className="mb-2 text-lg font-semibold">
            Check the browser console for detailed logs:
          </h3>
          <ul className="list-inside list-disc space-y-1">
            <li>Look for &quot;Creating patient with data:&quot;</li>
            <li>
              Look for &quot;Final patient data being sent to Appwrite:&quot;
            </li>
            <li>Look for any error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
