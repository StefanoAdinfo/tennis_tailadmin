import {
  startOfWeek,
  addDays,
  format,
  parseISO,
  isSameDay,
  areIntervalsOverlapping,
} from "date-fns";

import { useCalendar } from "~/calendar/contexts/calendar-context";

import { EventBlock } from "~/calendar/components/week-and-day-view/event-block";
import { CalendarTimeline } from "~/calendar/components/week-and-day-view/calendar-time-line";
import { WeekViewMultiDayEventsRow } from "~/calendar/components/week-and-day-view/week-view-multi-day-events-row";

import { cn } from "@/lib/utils";
import {
  groupEvents,
  getEventBlockStyle,
  isWorkingHour,
  getVisibleHours,
} from "~/calendar/helpers";

import type { IEvent } from "~/calendar/interfaces";
import { it } from "date-fns/locale";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarWeekView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, workingHours, visibleHours } = useCalendar();

  const { hours, earliestEventHour, latestEventHour } = getVisibleHours(
    visibleHours,
    singleDayEvents
  );

  const weekStart = startOfWeek(selectedDate, { locale: it });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <>
      <div className="flex flex-col items-center justify-center border-b border-gray-200 dark:border-gray-800 py-4 text-sm text-muted-foreground sm:hidden">
        <p>
          La visualizzazione settimanale non è disponibile sui dispositivi con
          schermo ridotto.
        </p>
        <p>Passa alla visualizzazione giornaliera o mensile.</p>
      </div>

      <div className="hidden flex-col sm:flex">
        <div>
          <WeekViewMultiDayEventsRow
            selectedDate={selectedDate}
            multiDayEvents={multiDayEvents}
          />

          {/* Week header */}
          <div className="relative z-20 flex border-b border-gray-200 dark:border-gray-800">
            <div className="w-18"></div>
            <div className="grid flex-1 grid-cols-7 divide-x border-l border-gray-200 dark:border-gray-800">
              {weekDays.map((day, index) => (
                <span
                  key={index}
                  className="py-2 text-center text-xs font-medium text-muted-foreground border-gray-200 dark:border-gray-800"
                >
                  {format(day, "EE", { locale: it })}{" "}
                  <span className="ml-1 font-semibold text-foreground">
                    {format(day, "d", { locale: it })}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[736px] overflow-y-auto ">
          <div className="flex overflow-hidden">
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

            {/* Week grid */}
            <div className="relative flex-1 border-l border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-7 divide-x">
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = singleDayEvents.filter(
                    (event) =>
                      isSameDay(parseISO(event.startDate), day) ||
                      isSameDay(parseISO(event.endDate), day)
                  );
                  const groupedEvents = groupEvents(dayEvents);

                  return (
                    <div
                      key={dayIndex}
                      className="relative border-gray-200 dark:border-gray-800"
                    >
                      {hours.map((hour, index) => {
                        const isDisabled = !isWorkingHour(
                          day,
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
                              <div className="pointer-events-none absolute inset-x-0 top-0 border-b border-gray-200 dark:border-gray-800"></div>
                            )}

                            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-gray-200 dark:border-gray-800"></div>
                          </div>
                        );
                      })}

                      {groupedEvents.map((group, groupIndex) =>
                        group.map((event) => {
                          let style = getEventBlockStyle(
                            event,
                            day,
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
                  );
                })}
              </div>

              <CalendarTimeline
                firstVisibleHour={earliestEventHour}
                lastVisibleHour={latestEventHour}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
