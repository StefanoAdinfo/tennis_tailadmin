import { format as formatDate } from "date-fns";
import { it } from "date-fns/locale";

import { useCalendar } from "~/calendar/contexts/calendar-context";

export function TodayButton() {
  const { setSelectedDate } = useCalendar();

  const today = new Date();
  const handleClick = () => setSelectedDate(today);

  return (
    <button
      className="flex size-14 flex-col items-start overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer "
      onClick={handleClick}
    >
      <p className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground bg-brand-500 text-white dark:text-white/90">
        {formatDate(today, "MMM", { locale: it }).toUpperCase()}
      </p>
      <p className="flex w-full items-center justify-center text-lg font-bold text-gray-800 dark:text-white/90">
        {today.getDate()}
      </p>
    </button>
  );
}
