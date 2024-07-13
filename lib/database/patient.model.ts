import { Schema, models, model, Document } from "mongoose";

// Define the IPatient interface extending Document for type safety
export interface IPatient extends Document {
  clerkId: string;
  fullName: string;
  image: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocumentUrl: string;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Patient schema with appropriate fields and types
const PatientSchema = new Schema<IPatient>(
  {
    clerkId: { type: String, required: true },
    fullName: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    occupation: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    primaryPhysician: { type: String, required: true },
    insuranceProvider: { type: String, required: true },
    insurancePolicyNumber: { type: String, required: true },
    allergies: { type: String },
    currentMedication: { type: String },
    familyMedicalHistory: { type: String },
    pastMedicalHistory: { type: String },
    identificationType: { type: String, required: true },
    identificationNumber: { type: String, required: true },
    identificationDocumentUrl: { type: String, required: true },
    treatmentConsent: { type: Boolean, required: true },
    disclosureConsent: { type: Boolean, required: true },
    privacyConsent: { type: Boolean, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Patient model
const Patient = models.Patient || model<IPatient>("Patient", PatientSchema);

export default Patient;
