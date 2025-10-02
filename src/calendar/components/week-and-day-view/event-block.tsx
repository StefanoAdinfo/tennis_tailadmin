import { cva } from "class-variance-authority";
import { format, differenceInMinutes, parseISO } from "date-fns";
import { it } from "date-fns/locale";

import { useCalendar } from "~/calendar/contexts/calendar-context";

import { cn } from "@/lib/utils";

import {
  RefObject,
  useLayoutEffect,
  useState,
  type HTMLAttributes,
} from "react";
import type { IEvent } from "~/calendar/interfaces";
import type { VariantProps } from "class-variance-authority";

import Button from "~/components/ui/button/Button";
import { Modal } from "~/components/ui/modal";
import { useRef } from "react";
import { Tooltip } from "~/components/ui/tooltip/Tooltip";
import { EventDetailsDialog } from "../dialogs/event-details-dialog";

const calendarWeekEventCardVariants = cva(
  "flex select-none flex-col gap-0.5 truncate whitespace-nowrap rounded-md border px-2 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      color: {
        // Colored and mixed variants
        blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&_.event-dot]:fill-blue-600",
        green:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&_.event-dot]:fill-green-600",
        red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 [&_.event-dot]:fill-red-600",
        yellow:
          "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&_.event-dot]:fill-yellow-600",
        purple:
          "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 [&_.event-dot]:fill-purple-600",
        orange:
          "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300 [&_.event-dot]:fill-orange-600",
        gray: "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 [&_.event-dot]:fill-neutral-600",

        // Dot variants
        "blue-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-blue-600",
        "green-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-green-600",
        "red-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-red-600",
        "orange-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-orange-600",
        "purple-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-purple-600",
        "yellow-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-yellow-600",
        "gray-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-neutral-600",
      },
    },
    defaultVariants: {
      color: "blue-dot",
    },
  }
);

interface IProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof calendarWeekEventCardVariants>, "color"> {
  event: IEvent;
}

export function EventBlock({ event, className }: IProps) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { badgeVariant } = useCalendar();

  const start = parseISO(event.startDate);
  const end = parseISO(event.endDate);
  const durationInMinutes = differenceInMinutes(end, start);
  const heightInPixels = (durationInMinutes / 60) * 76 - 8;

  const color = (
    badgeVariant === "dot" ? `${event.color}-dot` : event.color
  ) as VariantProps<typeof calendarWeekEventCardVariants>["color"];

  const calendarWeekEventCardClasses = cn(
    calendarWeekEventCardVariants({ color, className }),
    durationInMinutes == 30 && "py-0 justify-center"
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.currentTarget instanceof HTMLElement) e.currentTarget.click();
    }
  };

  const handleOpenModal = () => {
    setOpenTooltip(false);
    setOpenModal(true);
  };

  const TriggerContent = (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleOpenModal()}
        className={cn(
          calendarWeekEventCardClasses,
          "relative flex flex-col overflow-hidden cursor-pointer"
        )}
        style={{ height: `${heightInPixels}px` }}
        onKeyDown={handleKeyDown}
      >
        <div className="overflow-hidden">
          <p>{event.court.name}</p>
          <p>
            {format(start, "HH:mm", { locale: it })}–{" "}
            {format(end, "HH:mm", { locale: it })}
          </p>
          <p className="font-semibold">
            {event.user.surname +
              " " +
              (event.user.name.length > 0 ? event.user.name[0] + "." : "")}
          </p>
          {event.partecipants.map((partecipant) => (
            <p key={partecipant.id}>
              {partecipant.name} {partecipant.surname}
            </p>
          ))}
        </div>

        <div className="absolute bottom-0 right-0 px-1 pb-0.5 text-xs font-bold pointer-events-none bg-gradient-to-t  dark:from-neutral-950 text-neutral-500">
          ⋯
        </div>
      </div>
      <EventDetailsDialog
        event={event}
        open={openModal}
        setOpen={setOpenModal}
      />
    </>
  );

  const TooltipContent = (
    <>
      {/* 1. Data */}
      <p className="text-muted-foreground text-xs mb-2 border-b pb-1 dark:border-gray-700/50">
        {format(start, "dd MMMM yyyy", { locale: it })}
      </p>

      {/* 2. Campo e Orario (Bold e Grande) */}
      <p className="font-bold text-base dark:text-white">{event.court.name}</p>
      <p className="font-medium text-base mb-3 dark:text-white">
        {format(start, "HH:mm", { locale: it })} –{" "}
        {format(end, "HH:mm", { locale: it })}
      </p>

      {/* 3. Utente Principale (Più Evidenza) */}
      <p className="mt-3 mb-1 font-bold dark:text-white">
        {event.user.surname +
          " " +
          (event.user.name.length > 0 ? event.user.name[0] + "." : "")}
      </p>

      {/* 4. Partecipanti */}
      <div className="mt-2 space-y-0.5 text-gray-700 dark:text-gray-300">
        {event.partecipants.map((p) => (
          <p key={p.id} className="text-sm">
            {p.name} {p.surname}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <Tooltip
      trigger={TriggerContent}
      open={openTooltip}
      setOpen={setOpenTooltip}
    >
      {TooltipContent}
    </Tooltip>
  );
}
