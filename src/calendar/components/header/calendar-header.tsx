import { CourtSelect } from "~/calendar/components/header/court-select";
import { TodayButton } from "~/calendar/components/header/today-button";
import { DateNavigator } from "~/calendar/components/header/date-navigator";

import type { IEvent } from "~/calendar/interfaces";
import type { TCalendarView } from "~/calendar/types";
import { useCalendar } from "~/calendar/contexts/calendar-context";
import Button from "~/components/ui/button/Button";
import { Columns2, Grid2x2, List } from "~/icons";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  const { setViewCalendar } = useCalendar();
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 dark:border-gray-800 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              onClick={() => setViewCalendar("day")}
              aria-label="giorno"
              title="giorno"
              variant={view === "day" ? "primary" : "outline"}
              className="rounded-r-none [&_svg]:size-4 cursor-pointer"
            >
              <i>
                <List strokeWidth={1.8} />
              </i>
            </Button>

            <Button
              onClick={() => setViewCalendar("week")}
              aria-label="settimana"
              title="settimana"
              variant={view === "week" ? "primary" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-4 cursor-pointer"
            >
              <i>
                <Grid2x2 strokeWidth={1.8} />
              </i>
            </Button>
            <Button
              onClick={() => setViewCalendar("month")}
              aria-label="mese"
              title="mese"
              variant={view === "month" ? "primary" : "outline"}
              // className="-ml-px rounded-none [&_svg]:size-4 cursor-pointer"
              className="-ml-px rounded-l-none [&_svg]:size-4 cursor-pointer"
            >
              <i>
                <Columns2 strokeWidth={1.8} />
              </i>
            </Button>

            {/* <Button
              onClick={() => setViewCalendar("year")}
              asChild
              aria-label="anno"
              title="anno"
              size="icon"
              variant={view === "year" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5 cursor-pointer"
            >
              <i>
                <Columns strokeWidth={1.8} />
              </i>
            </Button>

            <Button
              onClick={() => setViewCalendar("agenda")}
              asChild
              aria-label="agenda"
              title="agenda"
              size="icon"
              variant={view === "agenda" ? "default" : "outline"}
              className="-ml-px rounded-l-none [&_svg]:size-5 cursor-pointer"
            >
              <i>
                <CalendarRange strokeWidth={1.8} />
              </i>
            </Button> */}
          </div>

          <CourtSelect />
        </div>

        {/* <AddEventDialog>
          <Button className="w-full sm:w-auto">
            <Plus />
            Add Event
          </Button>
        </AddEventDialog> */}
      </div>
    </div>
  );
}
