import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPatientByClerkId } from "@/lib/actions/patient.actions";
import NoResults from "@/components/NoResults";
import { Doctors } from "@/constants";
import AppointmentModal from "@/components/AppointmentModal";
import StatusBadge from "@/components/StatusBadge";

export default async function Appointments() {
  const { userId } = auth();
  let appointments;
  // @ts-ignore
  let user;
  if (!userId) {
    redirect("/sign-in");
  }
  if (userId) {
    try {
      user = await getPatientByClerkId(userId);
      const allAppointments = user.appointments;
      appointments = allAppointments.filter(
        (appointment: any) =>
          appointment.status === "pending" || appointment.status === "scheduled"
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
              appointments.map((appointment: any) => {
                const doctor = Doctors.find(
                  (doc) => doc.name === appointment.primaryPhysician
                );
                return (
                  <div
                    key={appointment._id}
                    className="p-4 mb-4 rounded-xl border-green-500 border-2 flex flex-col gap-2"
                  >
                    <div className="text-xl font-bold flex flex-row gap-2">
                      Appointment with{" "}
                      <Image
                        // @ts-ignore
                        src={doctor?.image}
                        alt="doctor"
                        width={30}
                        height={30}
                      />
                      {appointment.primaryPhysician}
                    </div>
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
                    <StatusBadge status={appointment.status} />
                    <div className="mt-4 flex justify-between items-center">
                      {appointment.status !== "scheduled" && (
                        <Link
                          href={`/appointments/${appointment._id}/edit`}
                          className="text-green-500 text-[16px] hover:text-green-400 ease-in-out transition-colors duration-200"
                        >
                          Edit
                        </Link>
                      )}
                      <AppointmentModal
                        type="cancel_by_the_user"
                        // @ts-ignore
                        user={user}
                        appointment={appointment}
                        title="Cancel an Appointment"
                        desc="Are you sure you want to cancel this appointment?"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <NoResults
                title="No appointments yet"
                description="You do not have any appointments pending or scheduled yet."
                href={`/patients/${user.clerkId}/new-appointment`}
                buttonTitle="Create new appointment"
              />
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
