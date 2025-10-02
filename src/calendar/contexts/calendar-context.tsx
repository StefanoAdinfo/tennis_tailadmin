import { createContext, useContext, useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { IEvent, Court } from "~/calendar/interfaces";
import type {
  TBadgeVariant,
  TVisibleHours,
  TWorkingHours,
} from "~/calendar/types";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  selectedUserId: Court["id"] | "all";
  setSelectedUserId: (courtId: Court["id"] | "all") => void;
  badgeVariant: TBadgeVariant;
  setBadgeVariant: (variant: TBadgeVariant) => void;
  courts: Court[];
  workingHours: TWorkingHours;
  setWorkingHours: Dispatch<SetStateAction<TWorkingHours>>;
  visibleHours: TVisibleHours;
  setVisibleHours: Dispatch<SetStateAction<TVisibleHours>>;
  events: IEvent[];
  setLocalEvents: Dispatch<SetStateAction<IEvent[]>>;
  // | "year" | "agenda"
  viewCalendar: "day" | "week" | "month";
  setViewCalendar: Dispatch<
    // | "year" | "agenda"
    SetStateAction<"day" | "week" | "month">
  >;
}

const CalendarContext = createContext({} as ICalendarContext);

// Orari di apertura e chiusura del campo
const WORKING_HOURS = {
  0: { from: 0, to: 24 },
  1: { from: 0, to: 24 },
  2: { from: 0, to: 24 },
  3: { from: 0, to: 24 },
  4: { from: 0, to: 24 },
  5: { from: 0, to: 24 },
  6: { from: 0, to: 24 },
};

const VISIBLE_HOURS = { from: 7, to: 23 };

export function CalendarProvider({
  children,
  courts,
  events,
}: {
  children: React.ReactNode;
  courts: Court[];
  events: IEvent[] | undefined | null;
}) {
  // | "year" | "agenda"
  const [viewCalendar, setViewCalendar] = useState<"day" | "week" | "month">(
    "week"
  );
  const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>("colored");
  const [visibleHours, setVisibleHours] =
    useState<TVisibleHours>(VISIBLE_HOURS);
  const [workingHours, setWorkingHours] =
    useState<TWorkingHours>(WORKING_HOURS);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<Court["id"] | "all">(
    "all"
  );

  // This localEvents doesn't need to exists in a real scenario.
  // It's used here just to simulate the update of the events.
  // In a real scenario, the events would be updated in the backend
  // and the request that fetches the events should be refetched
  const [localEvents, setLocalEvents] = useState<IEvent[]>(events || []);

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate: handleSelectDate,
        selectedUserId,
        setSelectedUserId,
        badgeVariant,
        setBadgeVariant,
        courts,
        visibleHours,
        setVisibleHours,
        workingHours,
        setWorkingHours,
        // If you go to the refetch approach, you can remove the localEvents and pass the events directly
        events: localEvents,
        setLocalEvents,
        viewCalendar,
        setViewCalendar,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
