import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  format,
  isSameDay,
  parseISO,
  getDaysInMonth,
  startOfMonth,
} from "date-fns";
import { it } from "date-fns/locale";

import { useCalendar } from "~/calendar/contexts/calendar-context";

import { YearViewDayCell } from "~/calendar/components/year-view/year-view-day-cell";

import type { IEvent } from "~/calendar/interfaces";

interface IProps {
  month: Date;
  events: IEvent[];
}

export function YearViewMonth({ month, events }: IProps) {
  const navigate = useNavigate();
  const { setSelectedDate } = useCalendar();

  const monthName = format(month, "LLLL", { locale: it }); // Nome mese con la prima lettera minuscola

  const daysInMonth = useMemo(() => {
    const totalDays = getDaysInMonth(month);
    let firstDay = startOfMonth(month).getDay(); // 0 (domenica) - 6 (sabato)
    firstDay = (firstDay + 6) % 7; // sposta inizio settimana a lunedì

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const blanks = Array(firstDay).fill(null);

    return [...blanks, ...days];
  }, [month]);

  const weekDays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  const handleClick = () => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1));
    navigate("/month-view");
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-t-lg border px-3 py-2 text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
      </button>

      <div className="flex-1 space-y-2 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-800 p-3">
        <div className="grid grid-cols-7 gap-x-0.5 text-center">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-x-0.5 gap-y-2">
          {daysInMonth.map((day, index) => {
            if (day === null)
              return <div key={`blank-${index}`} className="h-10" />;

            const date = new Date(month.getFullYear(), month.getMonth(), day);
            const dayEvents = events.filter(
              (event) =>
                isSameDay(parseISO(event.startDate), date) ||
                isSameDay(parseISO(event.endDate), date)
            );

            return (
              <YearViewDayCell
                key={`day-${day}`}
                day={day}
                date={date}
                events={dayEvents}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
