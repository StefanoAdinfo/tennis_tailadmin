export type Payment = {
  total_amount: any;
  id: string;
  date: string | null;
  name: string;
  surname: string;
  email: string;

  role: string;
  is_active: boolean;
  reservation: Reservation[];
};
export interface WeekSchedule {
  [key: string]: DaySchedule;
}

export interface ClosedDay {
  id: string;
  name: string;
  date: Date | string;
  isRecurring: boolean;
  year?: number;
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

type TimeSlot = {
  start: string; // formato "HH:mm"
  end: string; // formato "HH:mm"
};

type DaySchedule = {
  isOpen: boolean;
  timeSlots: TimeSlot[];
};

export type Timetable = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

export type SpecialDays = {
  id: string;
  date: string; // formato ISO, es: "2025-12-25T00:00:00.000Z"
  name: string;
};

export type Court = {
  id: string;
  picturePath: string | null;
  name: string;
  court_type: string;
  location: string;
  active: number;
  price_socio: number;
  price_non_socio: number;
  price_lights: number;
  price_junior: number;
  special_days: SpecialDays | null;
  timetable: Timetable | null;
};
export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  is_active: boolean;
  avatar: string;
};
export type Reservation = {
  court_name: string;
  date: string;
  duration: string;
  light: any;
  id: string;
  user: User;
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
};

export type Games = {
  id: string;
  user: User;
  court_name: string;
  date: string;
  duration: string;
  light: boolean;
  partecipants: Partecipants[];
};
