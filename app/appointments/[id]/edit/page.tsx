import NoResults from "@/components/NoResults";
import { AppointmentForm } from "@/components/forms/NewAppointmentForm";
import { getAppointmentById } from "@/lib/actions/appointment.action";
import { getPatientByClerkId } from "@/lib/actions/patient.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function EditAppointment({
  params: { id },
}: {
  params: { id: string };
}) {
  const { userId } = auth();

  let user, appointment;

  try {
    appointment = await getAppointmentById(id);
    user = await getPatientByClerkId(appointment.clerkUserId);
  } catch (err) {
    console.log(err);
    return (
      <NoResults
        title="Error Loading Data"
        description="There was an error loading your data. Please try again."
        buttonTitle="Go Back"
        href="/"
      />
    );
  }

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

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container lg:pl-12 lg:pr-96">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src={"/assets/icons/logo-full.svg"}
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
              alt="logo"
            />
          </Link>
          <AppointmentForm
            user={user}
            type="edit"
            appointment={appointment}
            title="Edit an appointment"
            desc="You can edit your appointment here"
          />
          <div className="flex flex-col items-center">
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
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        height={1000}
        width={1000}
        alt="doctor"
        className="fixed right-0 top-0 h-full hidden object-cover xl:block xl:max-w-[350px] 2xl:max-w-[400px]"
      />
    </div>
  );
}
