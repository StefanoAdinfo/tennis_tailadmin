import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../../icons";
import Badge from "../badge/Badge";

type BadgeColor = "success" | "error";

interface DataCardProps {
  icon: React.ReactNode;
  title: string;
  result: string;
  badgeStatus: BadgeColor;
  percentage: number;
  bgIcon: string;
}

export default function EcommerceMetrics({
  icon,
  title,
  result,
  badgeStatus,
  percentage,
  bgIcon,
}: DataCardProps) {
  const iconWithClasses = React.cloneElement(icon as any, {
    className: "text-gray-800 size-6 dark:text-white/90",
  });
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6`}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-xl ${bgIcon ? bgIcon : "bg-gray-100  dark:bg-gray-800"}`}
      >
        {iconWithClasses}
      </div>

      <div className="flex items-end justify-between flex-wrap mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {result}
          </h4>
        </div>
        {/* <Badge color={badgeStatus}>
          {badgeStatus === "success" ? <ArrowUpIcon /> : <ArrowDownIcon />}{" "}
          {percentage}%
        </Badge> */}
      </div>
    </div>
  );
}
