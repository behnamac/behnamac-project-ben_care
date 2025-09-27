import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Healthcare Data Protection
            </h2>

            <p className="text-gray-700 mb-6">
              This healthcare application is designed with the highest security
              standards to protect sensitive patient information in compliance
              with healthcare data protection regulations.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Data Security Measures
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>All data is encrypted in transit and at rest</li>
              <li>Secure database connections with Railway MySQL</li>
              <li>HTTPS enforcement for all communications</li>
              <li>Content Security Policy to prevent data leaks</li>
              <li>No third-party tracking or analytics</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Data Collection
            </h3>
            <p className="text-gray-700 mb-4">
              We collect only necessary healthcare information including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Patient identification information</li>
              <li>Medical history and current medications</li>
              <li>Emergency contact information</li>
              <li>Insurance and billing information</li>
              <li>Appointment scheduling data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Data Usage
            </h3>
            <p className="text-gray-700 mb-6">
              All collected data is used solely for healthcare management
              purposes, including appointment scheduling, patient records, and
              medical history tracking.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Data Protection
            </h3>
            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures to protect your
              sensitive healthcare information from unauthorized access,
              disclosure, or misuse.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Note:</strong> This application is for demonstration
                purposes. In a production environment, additional HIPAA
                compliance measures would be required.
              </p>
            </div>

            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
