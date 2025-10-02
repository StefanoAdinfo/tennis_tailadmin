import { useMemo } from "react";
import { formatDate } from "date-fns";
import { it } from "date-fns/locale";

import { useCalendar } from "~/calendar/contexts/calendar-context";

import { getEventsCount, navigateDate, rangeText } from "~/calendar/helpers";

import type { IEvent } from "~/calendar/interfaces";
import type { TCalendarView } from "~/calendar/types";
import Button from "../../../components/ui/button/Button";
import Badge from "../../../components/ui/badge/Badge";
import { ChevronLeftIcon, ChevronRightIcon } from "~/icons";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function DateNavigator({ view, events }: IProps) {
  const { selectedDate, setSelectedDate } = useCalendar();

  const rawMonth = formatDate(selectedDate, "MMMM", { locale: it });
  const month = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);
  const year = selectedDate.getFullYear();

  const eventCount = useMemo(
    () => getEventsCount(events, selectedDate, view),
    [events, selectedDate, view]
  );

  const handlePrevious = () =>
    setSelectedDate(navigateDate(selectedDate, view, "previous"));
  const handleNext = () =>
    setSelectedDate(navigateDate(selectedDate, view, "next"));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2 text-gray-800 dark:text-white/90">
        <span className="text-lg font-semibold">
          {month} {year}
        </span>
        <Badge>{eventCount} eventi</Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="p-2!" onClick={handlePrevious}>
          <ChevronLeftIcon />
        </Button>

        <p className="text-sm text-muted-foreground text-gray-800 dark:text-white/90">
          {rangeText(view, selectedDate)}
        </p>

        <Button variant="outline" className="p-2!" onClick={handleNext}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
