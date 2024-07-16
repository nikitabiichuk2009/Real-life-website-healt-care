"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
  id: string;
  patient: {
    image: string;
    fullName: string;
  };
  status: "pending" | "cancelled_by_the_user" | "cancelled" | "scheduled";
  date: string;
  schedule: Date;
  primaryPhysician: string;
  reason: string;
  cancellationReason: string;
  note: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px] flex flex-row gap-1 items-center">
          <div className="relative size-8">
            <Image
              src={appointment.patient.image}
              alt="patient avatar"
              layout="fill"
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-14-medium text-white whitespace-nowrap">
            {appointment.patient.fullName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[200px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[150px] whitespace-nowrap">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[200px] h-fit">
        {row.original.reason}
      </p>
    ),
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[200px] h-fit">
        {` ${row.original.note || "No additional note provided"}`}
      </p>
    ),
  },
  {
    accessorKey: "cancellationReason",
    header: "Cancelletion reason",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[200px] h-fit">
        {`${
          row.original.cancellationReason || "This appointment is not cancelled"
        }`}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor: any) => doctor.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            // @ts-ignore
            src={doctor?.image}
            // @ts-ignore
            alt={doctor?.name}
            width={32}
            height={32}
          />
          <p className="whitespace-nowrap">
            Dr. {row.original.primaryPhysician}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-6">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex agap-1 pl-6">
          <AppointmentModal
            type="schedule"
            user={row.original.patient}
            appointment={row.original}
            title="Schedule an Appointment"
            desc="Please confirm the following details to schedule an appointment"
          />
          <AppointmentModal
            type="cancel"
            user={row.original.patient}
            appointment={row.original}
            title="Cancel an Appointment"
            desc="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];
