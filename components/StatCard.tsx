import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  type: string;
  label: string;
  count: number;
  icon: string;
}

const StatCard = ({ type, label, count = 0, icon }: Props) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image src={icon} alt={label} width={32} height={32} />
        <h2 className="text-white text-32-bold">{count}</h2>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default StatCard;
