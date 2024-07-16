import { Schema, models, model, Document } from "mongoose";

// Define the IPatient interface extending Document for type safety
export interface IPatient extends Document {
  clerkId: string;
  fullName: string;
  image: string;
  email: string;
  phone?: string;
  birthDate?: Date;
  gender?: string;
  address?: string;
  occupation?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  primaryPhysician?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocumentUrl?: string;
  treatmentConsent?: boolean;
  disclosureConsent?: boolean;
  privacyConsent?: boolean;
  createdAt: Date;
  updatedAt: Date;
  appointments?: Schema.Types.ObjectId[];
}

// Define the Patient schema with appropriate fields and types
const PatientSchema = new Schema<IPatient>(
  {
    clerkId: { type: String, unique: true },
    fullName: { type: String },
    image: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    birthDate: { type: Date },
    gender: { type: String },
    address: { type: String },
    occupation: { type: String },
    emergencyContactName: { type: String },
    emergencyContactNumber: { type: String },
    primaryPhysician: { type: String },
    insuranceProvider: { type: String },
    insurancePolicyNumber: { type: String },
    allergies: { type: String },
    currentMedication: { type: String },
    familyMedicalHistory: { type: String },
    pastMedicalHistory: { type: String },
    identificationType: { type: String },
    identificationNumber: { type: String },
    identificationDocumentUrl: { type: String },
    treatmentConsent: { type: Boolean },
    disclosureConsent: { type: Boolean },
    privacyConsent: { type: Boolean },
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Patient model
const Patient = models.Patient || model<IPatient>("Patient", PatientSchema);

export default Patient;
