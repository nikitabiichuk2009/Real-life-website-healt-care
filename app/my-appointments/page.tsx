import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPatientByClerkId } from "@/lib/actions/patient.actions";
import NoResults from "@/components/NoResults";

export default async function Appointments() {
  const { userId } = auth();
  let appointments;
  if (!userId) {
    redirect("/sign-in");
  }
  if (userId) {
    try {
      const user = await getPatientByClerkId(userId);
      const allAppointments = user.appointments;
      appointments = allAppointments.filter(
        (appointment: any) => appointment.status === "pending"
      );
    } catch (err) {
      console.log(err);
      return (
        <NoResults
          title="Error Loading Appointments"
          description="There was an error loading your appointments. Please try again."
          buttonTitle="Go Back"
          href="/"
        />
      );
    }
  }
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto lg:pl-12 lg:pr-96">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src={"/assets/icons/logo-full.svg"}
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
              alt="logo"
            />
          </Link>
          <section className="mb-12 space-y-4">
            <h1 className="text-3xl font-semibold">Your future appointments</h1>
            <p className="text-dark-700">Manage your appointments</p>
          </section>
          <div className="flex flex-col gap-6">
            {appointments.length > 0 ? (
              appointments.map((appointment: any) => (
                <div
                  key={appointment._id}
                  className="p-4 mb-4 rounded-xl border-green-500 border-2"
                >
                  <h2 className="text-xl font-bold">
                    Appointment with {appointment.primaryPhysician}
                  </h2>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.schedule).toLocaleString()}
                  </p>
                  <p>
                    <strong>Reason:</strong> {appointment.reason}
                  </p>
                  {appointment.note && (
                    <p>
                      <strong>Note:</strong> {appointment.note}
                    </p>
                  )}
                  <div className="mt-4 flex justify-between">
                    <Link
                      href={`/appointments/${appointment._id}/edit`}
                      className="text-blue-500 hover:underline ease-in-out transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/appointments/${appointment._id}/cancel`}
                      className="text-red-500 hover:underline ease-in-out transition-colors duration-200"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
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
        className="fixed right-0 top-0 h-full hidden object-cover 2xl:block max-w-[390px]"
      />
    </div>
  );
}
