import { Schema, models, model, Document } from "mongoose";

// Define the IAppointment interface extending Document for type safety
export interface IAppointment extends Document {
  patient: Schema.Types.ObjectId;
  schedule: Date;
  status: string;
  primaryPhysician: string;
  reason: string;
  note: string;
  clerkUserId: string;
  cancellationReason: string | null;
}

// Define the Appointment schema with appropriate fields and types
const AppointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  schedule: { type: Date, required: true },
  status: { type: String, required: true },
  primaryPhysician: { type: String, required: true },
  reason: { type: String, required: true },
  note: { type: String, required: true },
  clerkUserId: { type: String, required: true },
  cancellationReason: { type: String, default: null },
});

// Create and export the Appointment model
const Appointment =
  models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
