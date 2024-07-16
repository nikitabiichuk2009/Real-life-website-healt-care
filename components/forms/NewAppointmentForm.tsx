"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
  cancelAppointmentByAdmin,
  cancelAppointmentByUser,
  createAppointment,
  editAppointment,
  scheduleAppointment,
} from "@/lib/actions/appointment.action";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export function AppointmentForm({
  user,
  type,
  appointment,
  title,
  desc,
  setOpen,
}: {
  user: any;
  type: "create" | "cancel" | "schedule" | "edit" | "cancel_by_the_user";
  appointment?: any;
  title: string;
  desc: string;
  setOpen?: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  let status = "";
  switch (type) {
    case "schedule":
      status = "scheduled";
      break;
    case "cancel":
      status = "cancelled";
      break;
    case "cancel_by_the_user":
      status = "cancelled_by_the_user";
      break;
    case "create":
    case "edit":
      status = "pending";
      break;
    default:
      break;
  }
  const appointmentSchema = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment?.schedule
        ? new Date(appointment.schedule)
        : new Date(),
      cancellationReason: "",
      reason: appointment?.reason || "",
      note: appointment?.note || "",
    },
  });

  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    setIsLoading(true);

    if (type === "create") {
      try {
        const createdAppointmnet = await createAppointment({
          userId: user.clerkId,
          status,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason || "",
          date: values.schedule,
          note: values.note || "",
        });

        router.push(
          `/patients/${user.clerkId}/new-appointment/success?appointmentId=${createdAppointmnet._id}`
        );
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "There was an error creating the appointment. Please try again.",
          className: "bg-red-500 text-white border-none",
        });
      }
    } else if (type === "edit") {
      try {
        await editAppointment({
          appointmentId: appointment._id!,
          status,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason,
          date: values.schedule,
          note: values.note,
        });

        toast({
          title: "Success",
          description: "Successfully edited your appointment. Redirecting...",
          className: "bg-green-500 text-white border-none",
        });
        setTimeout(() => {
          router.push("/my-appointments");
        }, 2500);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "There was an error editing the appointment. Please try again.",
          className: "bg-red-500 text-white border-none",
        });
      }
    } else if (type === "cancel") {
      try {
        await cancelAppointmentByAdmin({
          appointmentId: appointment._id,
          cancellationReason: values.cancellationReason || "",
          email: user.email,
        });
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Successfully cancelled this appointment.",
          className: "bg-green-500 text-white border-none",
        });
        // @ts-ignore
        setOpen(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "There was an error cancelling the appointment. Please try again.",
          className: "bg-red-500 text-white border-none",
        });
      }
    } else if (type === "cancel_by_the_user") {
      try {
        await cancelAppointmentByUser({
          appointmentId: appointment._id,
          cancellationReason: values.cancellationReason || "",
        });
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Successfully cancelled this appointment.",
          className: "bg-green-500 text-white border-none",
        });
        // @ts-ignore
        setOpen(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "There was an error cancelling the appointment. Please try again.",
          className: "bg-red-500 text-white border-none",
        });
      }
    } else if (type === "schedule") {
      try {
        await scheduleAppointment({
          appointmentId: appointment._id,
          primaryPhysician: values.primaryPhysician,
          date: values.schedule,
          email: user.email,
        });
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Successfully scheduled this appointment.",
          className: "bg-green-500 text-white border-none",
        });
        // @ts-ignore
        setOpen(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "There was an error scheduling the appointment. Please try again.",
          className: "bg-red-500 text-white border-none",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {type === "create" && (
            <p className="text-dark-700">
              Request a new appointment in 10 seconds or{" "}
              <Link
                href={`/patients/${user.clerkId}/register`}
                className="text-green-500 hover:text-green-400 ease-in-out duration-200 transition-colors"
              >
                edit your details
              </Link>
            </p>
          )}
          <p className="text-dark-700 mt-1">{desc}</p>
        </section>
        {type !== "cancel" && type !== "cancel_by_the_user" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem
                  key={doctor.name}
                  value={doctor.name}
                  className="cursor-pointer"
                >
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
              label={`${
                type === "create"
                  ? "Expected date of an appointment"
                  : "Date of an appointment"
              }`}
              className="flex-grow"
            />
            {type !== "schedule" && (
              <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Annual montly check-up"
                  className="flex-grow"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Additional comments/notes (optional)"
                  placeholder="Prefer afternoon appointments, if possible"
                  className="flex-grow"
                />
              </div>
            )}
          </>
        )}
        {(type === "cancel" || type === "cancel_by_the_user") && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
            className="flex-grow"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" || type === "cancel_by_the_user"
              ? "shad-danger-btn"
              : "shad-primary-btn"
          } w-full`}
        >
          {type === "cancel" || type === "cancel_by_the_user"
            ? "Cancel appointment"
            : "Submit and continue"}
        </SubmitButton>
      </form>
    </Form>
  );
}
