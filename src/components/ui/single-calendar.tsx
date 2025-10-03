"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { it } from "date-fns/locale";

import { cn } from "@/lib/utils";

import type { PropsSingle } from "react-day-picker";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "~/icons";

function SingleCalendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  ...props
}: PropsSingle) {
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(
    selected instanceof Date ? selected : undefined
  );

  return (
    <DayPicker
      locale={it}
      selected={selected}
      showOutsideDays={showOutsideDays}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      formatters={{
        formatCaption: (month, options) => {
          const label = format(month, "LLLL yyyy", { locale: options?.locale });
          return label.charAt(0).toUpperCase() + label.slice(1);
        },
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("h-4 w-4", className)}
                {...props}
              />
            );
          }
          return (
            <ChevronRightIcon className={cn("h-4 w-4", className)} {...props} />
          );
        },
      }}
      {...props}
    />
  );
}

SingleCalendar.displayName = "Calendar";

export { SingleCalendar };
