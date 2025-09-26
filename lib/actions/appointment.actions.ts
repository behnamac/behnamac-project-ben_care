"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import {
  CreateAppointmentParams,
  UpdateAppointmentParams,
} from "@/types/prisma.types";

// CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        userId: appointment.userId,
        patientId: appointment.patientId,
        patientName: appointment.patient,
        primaryPhysician: appointment.primaryPhysician,
        schedule: appointment.schedule,
        status: appointment.status || "pending",
        reason: appointment.reason,
        note: appointment.note,
      },
    });

    revalidatePath("/admin");
    return newAppointment;
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
    return null;
  }
};

// GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        patient: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
    return null;
  }
};

// SEND SMS NOTIFICATION (placeholder - implement with your preferred SMS service)
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // TODO: Implement SMS notification with your preferred service (Twilio, etc.)
    console.log(`SMS to user ${userId}: ${content}`);
    return { success: true, messageId: "placeholder" };
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
    return null;
  }
};

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        ...appointment,
        updatedAt: new Date(),
      },
    });

    if (!updatedAppointment) throw new Error("Failed to update appointment");

    // Format date for SMS
    const formatDateTime = (date: Date, tz: string) => {
      return {
        dateTime: date.toLocaleString("en-US", {
          timeZone: tz,
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    };

    const smsMessage = `Greetings from BenCare. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason: ${appointment.cancellationReason}`}.`;

    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return updatedAppointment;
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
    return null;
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        user: true,
        patient: true,
      },
    });

    return appointment;
  } catch (error) {
    console.error("An error occurred while retrieving the appointment:", error);
    return null;
  }
};

// GET APPOINTMENTS BY USER
export const getAppointmentsByUser = async (userId: string) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: {
        user: true,
        patient: true,
      },
      orderBy: {
        schedule: "asc",
      },
    });

    return appointments;
  } catch (error) {
    console.error(
      "An error occurred while retrieving user appointments:",
      error
    );
    return [];
  }
};

// GET APPOINTMENTS BY PATIENT
export const getAppointmentsByPatient = async (patientId: string) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientId },
      include: {
        user: true,
        patient: true,
      },
      orderBy: {
        schedule: "asc",
      },
    });

    return appointments;
  } catch (error) {
    console.error(
      "An error occurred while retrieving patient appointments:",
      error
    );
    return [];
  }
};

// DELETE APPOINTMENT
export const deleteAppointment = async (appointmentId: string) => {
  try {
    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    revalidatePath("/admin");
    return true;
  } catch (error) {
    console.error("An error occurred while deleting the appointment:", error);
    return false;
  }
};
