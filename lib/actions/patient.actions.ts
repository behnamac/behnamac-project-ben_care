"use server";

import { prisma } from "@/lib/db";
import { RegisterUserParams, CreateUserParams } from "@/types/prisma.types";

// CREATE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      return existingUser;
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });

    return newUser;
  } catch (error) {
    console.error("An error occurred while creating a new user:", error);
    return null;
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    return null;
  }
};

// TEST DATABASE CONNECTION
export const testDatabaseConnection = async () => {
  try {
    console.log("🔍 Testing Database Connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connection successful!");

    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);

    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
};

// Aliases for compatibility with existing code
export const testAppwriteSetup = testDatabaseConnection;
export const testAppwriteConnection = testDatabaseConnection;

// REGISTER PATIENT
export const registerPatient = async (patient: RegisterUserParams) => {
  try {
    console.log("Creating patient with data:", {
      userId: patient.userId,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      birthDate: patient.birthDate,
      gender: patient.gender,
      address: patient.address,
      occupation: patient.occupation,
      emergencyContactName: patient.emergencyContactName,
      emergencyContactNumber: patient.emergencyContactNumber,
      primaryPhysician: patient.primaryPhysician,
      privacyConsent: patient.privacyConsent,
    });

    // File upload removed (sensitive data)

    // Create new patient
    const newPatient = await prisma.patient.create({
      data: {
        userId: patient.userId,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        birthDate: patient.birthDate,
        gender: patient.gender,
        address: patient.address,
        occupation: patient.occupation,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactNumber: patient.emergencyContactNumber,
        primaryPhysician: patient.primaryPhysician,
        // Removed sensitive fields: insuranceProvider, insurancePolicyNumber, allergies, currentMedication, familyMedicalHistory, pastMedicalHistory, identificationType, identificationNumber, identificationDocumentUrl
        privacyConsent: patient.privacyConsent,
        treatmentConsent: patient.treatmentConsent || false,
        disclosureConsent: patient.disclosureConsent || false,
      },
    });

    return newPatient;
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });
    return null;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patient = await prisma.patient.findFirst({
      where: { userId },
      include: {
        user: true,
        appointments: true,
      },
    });

    return patient;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    return null;
  }
};

// GET ALL PATIENTS
export const getAllPatients = async () => {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        user: true,
        appointments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return patients;
  } catch (error) {
    console.error("An error occurred while retrieving patients:", error);
    return [];
  }
};

// UPDATE PATIENT
export const updatePatient = async (
  patientId: string,
  data: Partial<RegisterUserParams>
) => {
  try {
    const updatedPatient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return updatedPatient;
  } catch (error) {
    console.error("An error occurred while updating the patient:", error);
    return null;
  }
};

// DELETE PATIENT
export const deletePatient = async (patientId: string) => {
  try {
    await prisma.patient.delete({
      where: { id: patientId },
    });

    return true;
  } catch (error) {
    console.error("An error occurred while deleting the patient:", error);
    return false;
  }
};
