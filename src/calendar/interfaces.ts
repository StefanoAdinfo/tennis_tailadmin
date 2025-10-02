import type { TEventColor } from "~/calendar/types";

export interface Court {
  id: string;
  name: string;
  picturePath: string | null;
  color: string;
}

export type Partecipants = {
  id: string | null;
  name: string;
  surname: string | null;
  credit: number | null;
  is_paid: boolean | null;
  total_amount: number | null;
  email: string | null;
};

export interface IEvent {
  id: number;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  is_double: boolean;
  is_cancelled: boolean;
  phone_number: string;
  court: Court;
  total_amount: number;
  lights_cost: number;
  is_paid: boolean;
  note: string;
  partecipants: Partecipants[];
  color: TEventColor;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
