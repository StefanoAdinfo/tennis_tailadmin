export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";
export type TEventColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";
export type TBadgeVariant = "dot" | "colored" | "mixed";
// Sistemare in base agli orari di paertura e chiusura del campo  quindi TWorkingHours = CourtHours di default 0-24
// TVisibleHours = il minStartTime e il maxEndTime del campo di default 0-24
export type TWorkingHours = { [key: number]: { from: number; to: number } };
export type TVisibleHours = { from: number; to: number };
