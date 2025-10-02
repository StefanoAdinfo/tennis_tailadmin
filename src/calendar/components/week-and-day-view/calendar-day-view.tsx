import {
  Calendar,
  CircleCheck,
  CircleCheckBig,
  Clock,
  Lightbulb,
  Phone,
  User,
  Users,
} from "lucide-react";
import { parseISO, areIntervalsOverlapping, format } from "date-fns";
import { it } from "date-fns/locale";

import { useCalendar } from "~/calendar/contexts/calendar-context";

import { EventBlock } from "~/calendar/components/week-and-day-view/event-block";
import { DroppableTimeBlock } from "~/calendar/components/dnd/droppable-time-block";
import { CalendarTimeline } from "~/calendar/components/week-and-day-view/calendar-time-line";
import { DayViewMultiDayEventsRow } from "~/calendar/components/week-and-day-view/day-view-multi-day-events-row";

import { cn } from "@/lib/utils";
import {
  groupEvents,
  getEventBlockStyle,
  isWorkingHour,
  getCurrentEvents,
  getVisibleHours,
} from "~/calendar/helpers";

import type { IEvent } from "~/calendar/interfaces";
import { CourtIcon } from "~/icons";
import { SingleCalendar } from "~/components/ui/single-calendar";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarDayView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, setSelectedDate, courts, visibleHours, workingHours } =
    useCalendar();

  const { hours, earliestEventHour, latestEventHour } = getVisibleHours(
    visibleHours,
    singleDayEvents
  );

  const currentEvents = getCurrentEvents(singleDayEvents);

  const dayEvents = singleDayEvents.filter((event) => {
    const eventDate = parseISO(event.startDate);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const groupedEvents = groupEvents(dayEvents);

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div>
          <DayViewMultiDayEventsRow
            selectedDate={selectedDate}
            multiDayEvents={multiDayEvents}
          />

          {/* Day header */}
          <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <span className="flex-1 border-l py-2 text-center text-xs font-medium text-muted-foreground">
              {format(selectedDate, "EE", { locale: it })}{" "}
              <span className="font-semibold text-foreground">
                {format(selectedDate, "d", { locale: it })}
              </span>
            </span>
          </div>
        </div>

        <div className="h-[800px] overflow-y-auto">
          <div className="flex">
            {/* Hours column */}
            <div className="relative w-18">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: "76px" }}>
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && (
                      <span className="text-xs text-muted-foreground">
                        {format(new Date().setHours(hour, 0, 0, 0), "HH:mm", {
                          locale: it,
                        })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="relative flex-1 border-l">
              <div className="relative">
                {hours.map((hour, index) => {
                  const isDisabled = !isWorkingHour(
                    selectedDate,
                    hour,
                    workingHours
                  );

                  return (
                    <div
                      key={hour}
                      className={cn(
                        "relative",
                        isDisabled && "bg-calendar-disabled-hour"
                      )}
                      style={{ height: "76px" }}
                    >
                      {index !== 0 && (
                        <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>
                      )}
                    </div>
                  );
                })}

                {groupedEvents.map((group, groupIndex) =>
                  group.map((event) => {
                    let style = getEventBlockStyle(
                      event,
                      selectedDate,
                      groupIndex,
                      groupedEvents.length,
                      { from: earliestEventHour, to: latestEventHour }
                    );
                    const hasOverlap = groupedEvents.some(
                      (otherGroup, otherIndex) =>
                        otherIndex !== groupIndex &&
                        otherGroup.some((otherEvent) =>
                          areIntervalsOverlapping(
                            {
                              start: parseISO(event.startDate),
                              end: parseISO(event.endDate),
                            },
                            {
                              start: parseISO(otherEvent.startDate),
                              end: parseISO(otherEvent.endDate),
                            }
                          )
                        )
                    );

                    if (!hasOverlap)
                      style = { ...style, width: "100%", left: "0%" };

                    return (
                      <div
                        key={event.id}
                        className="absolute p-1"
                        style={style}
                      >
                        <EventBlock event={event} />
                      </div>
                    );
                  })
                )}
              </div>

              <CalendarTimeline
                firstVisibleHour={earliestEventHour}
                lastVisibleHour={latestEventHour}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-64 divide-y border-l md:block ">
        <div className="mx-auto w-fit p-2">
          <SingleCalendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </div>

        <div className="flex-1 space-y-3">
          {currentEvents.length > 0 ? (
            <div className="flex items-start gap-2 px-4 pt-4">
              <span className="relative mt-[5px] flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-green-600"></span>
              </span>

              <p className="text-sm font-semibold text-foreground">
                Evento in corso
              </p>
            </div>
          ) : (
            <p className="p-4 text-center text-sm italic text-muted-foreground">
              Nessuna evento in corso.
            </p>
          )}

          {currentEvents.length > 0 && (
            <div className="h-[422px] px-4 overflow-y-auto">
              <div className="space-y-6 pb-4">
                {currentEvents.map((event) => {
                  const court = courts.find(
                    (court) => court.id === event.court.id
                  );

                  return (
                    <div key={event.id} className="space-y-1.5">
                      <p className="line-clamp-2 text-sm font-semibold">
                        {event.user.name} {event.user.surname}
                      </p>

                      {/* <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="size-3.5" />
                        <span className="text-sm">
                          {" "}
                          {format(parseISO(event.startDate), "dd/MM/yyyy")}
                        </span>
                      </div> */}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="size-3.5" />
                        <span className="text-sm">{event.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span className="text-sm">
                          {format(parseISO(event.startDate), "HH:mm", {
                            locale: it,
                          })}{" "}
                          -{" "}
                          {format(parseISO(event.endDate), "HH:mm", {
                            locale: it,
                          })}
                        </span>
                      </div>

                      {court && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <CourtIcon className="size-3.5" />
                          <span className="text-sm">{court.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CircleCheck className="size-3.5" />
                        {event.is_cancelled ? (
                          <span className="text-sm">Annullata</span>
                        ) : (
                          <span className="text-sm">Confermata</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Lightbulb className="size-3.5" />
                        {event.lights_cost != 0 ? (
                          <span className="text-sm">Si</span>
                        ) : (
                          <span className="text-sm">No</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="size-3.5" />
                        {event.partecipants.length > 0 ? (
                          <span className="text-sm">
                            {event.partecipants.length}
                          </span>
                        ) : (
                          <span className="text-sm">Nessun partecipante</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
