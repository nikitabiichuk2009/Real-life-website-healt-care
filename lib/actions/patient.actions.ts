"use server";

import Patient from "../database/patient.model";
import { connectToDB } from "../mongoose";

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
  updateData: Partial<{
    fullName: string;
    email: string;
    image: string;
  }>;
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
    return updatedPatient;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw new Error("Error updating patient");
  }
};

export const deletePatient = async (clerkId: string) => {
  try {
    await connectToDB();
    const deletedPatient = await Patient.findOneAndDelete({ clerkId });
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }
    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw new Error("Error deleting patient");
  }
};
