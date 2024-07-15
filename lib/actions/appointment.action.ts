"use server";

import { connectToDB } from "../mongoose";
import Appointment from "../database/appointment.model";
import Patient from "../database/patient.model";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

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
