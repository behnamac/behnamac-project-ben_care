import { User, Patient, Appointment, Gender, Status } from "@prisma/client";

export type { User, Patient, Appointment, Gender, Status };

// Extended types with relations
export type AppointmentWithRelations = Appointment & {
  user: User;
  patient: Patient;
};

export interface PatientWithRelations extends Patient {
  user: User;
  appointments: Appointment[];
}

// Form types
export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export interface RegisterUserParams {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  // Removed sensitive fields: insuranceProvider, insurancePolicyNumber, allergies, currentMedication, familyMedicalHistory, pastMedicalHistory, identificationType, identificationNumber, identificationDocument
  privacyConsent: boolean;
  treatmentConsent?: boolean;
  disclosureConsent?: boolean;
}

export interface CreateAppointmentParams {
  userId: string;
  patientId: string;
  patient: string;
  primaryPhysician: string;
  schedule: Date;
  status?: Status;
  reason: string;
  note?: string;
}

export interface UpdateAppointmentParams {
  appointmentId: string;
  userId: string;
  timeZone: string;
  appointment: Partial<Appointment>;
  type: string;
}
