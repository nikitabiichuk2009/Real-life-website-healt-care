"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AppointmentForm } from "./forms/NewAppointmentForm";

const AppointmentModal = ({
  type,
  user,
  appointment,
  title,
  desc,
}: {
  type: "schedule" | "cancel" | "cancel_by_the_user";
  user: any;
  appointment: any;
  title: string;
  desc: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          disabled={
            (type === "schedule" && appointment.status === "scheduled") ||
            appointment.status === "cancelled" ||
            appointment.status === "cancelled_by_the_user"
          }
          className={`capitalize ${
            type === "schedule"
              ? "text-green-500 hover:text-green-400"
              : "text-red-500 hover:text-red-700"
          } ease-in-out transitin-colors duration-200 text-[16px]`}
        >
          {type === "cancel_by_the_user" ? "Cancel" : type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {type === "cancel_by_the_user" ? "Cancel" : type} an appointment
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to{" "}
            {type === "cancel_by_the_user" ? "cancel" : type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          type={type}
          user={user}
          appointment={appointment}
          title={title}
          desc={desc}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
