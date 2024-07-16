"use server";

import { connectToDB } from "../mongoose";
import Appointment from "../database/appointment.model";
import Patient from "../database/patient.model";
import { formatDateTime, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

interface CreateAppointmentParams {
  userId: string;
  status: string;
  primaryPhysician: string;
  reason: string;
  date: Date;
  note: string;
}

export const createAppointment = async ({
  userId,
  status,
  primaryPhysician,
  reason,
  date,
  note,
}: CreateAppointmentParams) => {
  try {
    await connectToDB();

    const patient = await Patient.findOne({ clerkId: userId });
    if (!patient) {
      throw new Error("Patient not found");
    }

    const newAppointment = await Appointment.create({
      patient: patient._id,
      clerkUserId: patient.clerkId,
      schedule: date,
      status,
      primaryPhysician,
      reason,
      note,
    });

    await Patient.updateOne(
      { _id: patient._id },
      { $push: { appointments: newAppointment._id } }
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log("Error creating appointment:", error);
    throw new Error("Error creating appointment");
  }
};

interface EditAppointmentParams {
  appointmentId: string;
  status?: string;
  primaryPhysician?: string;
  reason?: string;
  date?: Date;
  note?: string;
}

export const editAppointment = async ({
  appointmentId,
  status,
  primaryPhysician,
  reason,
  date,
  note,
}: EditAppointmentParams) => {
  try {
    await connectToDB();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { status, primaryPhysician, reason, schedule: date, note } },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }
    revalidatePath("/my-appointments");
  } catch (error) {
    console.log("Error editing appointment:", error);
    throw new Error("Error editing appointment");
  }
};

export const getAppointmentById = async (appointmentId: string) => {
  try {
    await connectToDB();

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return parseStringify(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw new Error("Error fetching appointment");
  }
};

export const getAppointmentStats = async () => {
  try {
    await connectToDB();

    const scheduledCount = await Appointment.countDocuments({
      status: "scheduled",
    });
    const pendingCount = await Appointment.countDocuments({
      status: "pending",
    });
    const cancelledCount = await Appointment.countDocuments({
      status: { $in: ["cancelled", "cancelled_by_the_user"] },
    });

    const allLatestAppointments = await Appointment.find()
      .sort({ schedule: -1 })
      .populate("patient");

    return parseStringify({
      scheduledCount,
      pendingCount,
      cancelledCount,
      allLatestAppointments,
    });
  } catch (error) {
    console.error("Error fetching appointment statistics:", error);
    throw new Error("Error fetching appointment statistics");
  }
};

interface CancelAppointmentByUserParams {
  appointmentId: string;
  cancellationReason: string;
}

export const cancelAppointmentByUser = async ({
  appointmentId,
  cancellationReason,
}: CancelAppointmentByUserParams) => {
  try {
    await connectToDB();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { status: "cancelled_by_the_user", cancellationReason } },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }
    revalidatePath("/my-appointments");
    revalidatePath("/admin-manage-appointments-here");
  } catch (error) {
    console.error("Error cancelling appointment by user:", error);
    throw new Error("Error cancelling appointment by user");
  }
};

interface CancelAppointmentParams {
  appointmentId: string;
  cancellationReason: string;
  email: string;
}

export const cancelAppointmentByAdmin = async ({
  appointmentId,
  cancellationReason,
  email,
}: CancelAppointmentParams) => {
  try {
    await connectToDB();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { status: "cancelled", cancellationReason } },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    await sendEmail({
      to: email,
      subject: "Appointment Cancelled",
      text: `Your appointment has been cancelled. Reason: ${cancellationReason}`,
    });

    revalidatePath("/my-appointments");
    revalidatePath("/admin-manage-appointments-here");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("Error cancelling appointment by admin:", error);
    throw new Error("Error cancelling appointment by admin");
  }
};

interface ScheduleAppointmentParams {
  appointmentId: string;
  primaryPhysician: string;
  date: Date;
  email: string;
}

export const scheduleAppointment = async ({
  appointmentId,
  primaryPhysician,
  date,
  email,
}: ScheduleAppointmentParams) => {
  try {
    await connectToDB();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { status: "scheduled", primaryPhysician, schedule: date } },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    await sendEmail({
      to: email,
      subject: "Appointment Scheduled",
      text: `Your appointment has been scheduled with Dr. ${primaryPhysician} on ${
        formatDateTime(date).dateTime
      }.`,
    });

    revalidatePath("/my-appointments");
    revalidatePath("/admin-manage-appointments-here");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    throw new Error("Error scheduling appointment");
  }
};

const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Setup email data
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  // Send mail
  await transporter.sendMail(mailOptions);
};
