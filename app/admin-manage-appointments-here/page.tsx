import NoResults from "@/components/NoResults";
import StatCard from "@/components/StatCard";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAppointmentStats } from "@/lib/actions/appointment.action";
import DataTable from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

const Admin = async () => {
  const { userId } = auth();
  if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    return (
      <NoResults
        title="Access Denied"
        description="You do not have permission to view this data."
        buttonTitle="Go Back"
        href="/"
      />
    );
  }

  let stats;
  try {
    stats = await getAppointmentStats();
  } catch (error) {
    console.error("Error fetching appointment statistics:", error);
    return (
      <NoResults
        title="Error Loading Data"
        description="There was an error loading the appointment data. Please try again."
        buttonTitle="Go Back"
        href="/"
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="Logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>
        <p className="font-semibold text:[16px] whitespace-nowrap md:text-[20px]">
          Admin Dashboard
        </p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start your day by managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={stats.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={stats.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="appointments"
            count={stats.cancelledCount}
            label="Totally cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={stats.allLatestAppointments} />
      </main>
    </div>
  );
};

export default Admin;
