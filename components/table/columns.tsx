"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
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
  cancelletionReason: string;
};

export const columns: ColumnDef<Payment>[] = [
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
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
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
    accessorKey: "cancelletionReason",
    header: "Cancelletion reason",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[200px] h-fit">
        {`${
          row.original.cancelletionReason || "This appointment is not cancelled"
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
];
