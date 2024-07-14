"use server";

import { parseStringify } from "./../utils";

import Patient from "../database/patient.model";
import { connectToDB } from "../mongoose";
import Appointment from "../database/appointment.model";
import { revalidatePath } from "next/cache";

interface CreatePatientParams {
  clerkId: string;
  fullName: string;
  email: string;
  image: string;
}

export const createPatient = async ({
  clerkId,
  fullName,
  email,
  image,
}: CreatePatientParams) => {
  try {
    await connectToDB();
    const newPatient = await Patient.create({
      clerkId,
      fullName,
      email,
      image,
    });
    return newPatient;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error("Error creating patient");
  }
};

interface UpdatePatientParams {
  clerkId: string;
  updateData: object;
}

export const updatePatient = async ({
  clerkId,
  updateData,
}: UpdatePatientParams) => {
  try {
    await connectToDB();
    const updatedPatient = await Patient.findOneAndUpdate(
      { clerkId },
      { $set: updateData },
      { new: true } // Return the updated document
    );
    if (!updatedPatient) {
      throw new Error("Patient not found");
    }
    revalidatePath(`/patients${updatedPatient.clerkId}/register`);
  } catch (error) {
    console.error("Error updating patient:", error);
    throw new Error("Error updating patient");
  }
};

export const deletePatient = async (clerkId: string) => {
  try {
    await connectToDB();
    // Find the patient by clerkId
    const patient = await Patient.findOne({ clerkId });
    if (!patient) {
      throw new Error("Patient not found");
    }

    // Delete all appointments related to the patient
    await Appointment.deleteMany({ _id: { $in: patient.appointments } });

    // Delete the patient
    const deletedPatient = await Patient.findOneAndDelete({ clerkId });
    if (!deletedPatient) {
      throw new Error("Error deleting patient");
    }
    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw new Error("Error deleting patient");
  }
};

export const getPatientByClerkId = async (clerkId: string) => {
  try {
    await connectToDB();
    const patient = await Patient.findOne({ clerkId }).populate("appointments");
    if (!patient) {
      throw new Error("Patient not found");
    }
    return parseStringify(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw new Error("Error fetching patient");
  }
};
