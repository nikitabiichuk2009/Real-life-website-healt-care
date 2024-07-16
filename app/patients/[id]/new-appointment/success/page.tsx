import NoResults from "@/components/NoResults";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointmentById } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const appointmentId = searchParams.appointmentId as string;
  const { userId } = auth();
  let appointment;
  try {
    appointment = await getAppointmentById(appointmentId);
    if (appointment.clerkUserId !== userId) {
      return (
        <NoResults
          title="Access Denied"
          description="You do not have permission to view this data."
          buttonTitle="Go Back"
          href="/"
        />
      );
    }
  } catch (err) {
    console.log(err);
    return (
      <NoResults
        title="Error Loading Appointment"
        description="There was an error loading your appointment details. Please try again."
        buttonTitle="Go Back"
        href="/"
      />
    );
  }

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  return (
    <div className="flex max-h-screen h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt=""
            width={1000}
            height={1000}
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="font-semibold text-[20px]">
            We will be in touch shortly to confirm!
          </p>
          <Image
            src={"/assets/gifs/success.gif"}
            alt="success"
            width={280}
            height={300}
          />
        </section>
        <section className="request-details">
          <p className="text-[24px] leading-9 text-[#ABB8C4]">
            Requested appointment details:
          </p>
          <div className="flex items-center gap-3">
            <Image
              // @ts-ignore
              src={doctor?.image}
              // @ts-ignore
              alt={doctor?.name}
              width={40}
              height={40}
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src={"/assets/icons/calendar.svg"}
              alt="calendar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Link href="/my-appointments">
          <Button className="shad-primary-btn">View my appointments</Button>
        </Link>
        <div className="flex flex-col">
          <div className="text-[16px] leading-[18px] font-semibold mt-20 flex justify-between">
            <p className="flex gap-1 text-dark-600 items-center justify-center">
              © {new Date().getFullYear()} CarePulse by{" "}
              <Link
                href={"https://nikita-biichuks-portfolio.vercel.app/"}
                className="ease-in-out duration-300 text-sm transition-colors text-green-400 hover:text-green-500"
              >
                Nikita Biichuk
              </Link>
            </p>
          </div>
          <Link
            href="/privacy-policy"
            className="mt-12 ease-in-out duration-300 text-[20px] text-center transition-colors text-green-400 hover:text-green-500"
          >
            Privacy and policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
