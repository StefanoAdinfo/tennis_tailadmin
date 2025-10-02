import type { TEventColor } from "~/calendar/types";
import type { IEvent, Court } from "~/calendar/interfaces";

// ================================== //

export const COURT_MOCK: Court[] = [
  {
    id: "dd503cf9-6c38-43cf-94cc-0d4032e2f77a",
    name: "Campo 1",
    picturePath: null,
    color: "blue",
  },
  {
    id: "f3b035ac-49f7-4e92-a715-35680bf63175",
    name: "Campo 2",
    picturePath: null,
    color: "green",
  },
  {
    id: "3e36ea6e-78f3-40dd-ab8c-a6c737c3c422",
    name: "Campo 3",
    picturePath: null,
    color: "red",
  },
  {
    id: "a7aff6bd-a50a-4d6a-ab57-76f76bb27cf5",
    name: "Campo 4",
    picturePath: null,
    color: "yellow",
  },
];

const COLORS: TEventColor[] = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "gray",
];

const EVENTS = [
  "Stefano D'aniello s.daniello@adinfo.it",
  "Stefano D'aniello s.daniello@adinfo.it",
  "Stefano D'aniello s.daniello@adinfo.it",
  "Stefano D'aniello s.daniello@adinfo.it",
  "Stefano D'aniello s.daniello@adinfo.it",
  "Stefano D'aniello s.daniello@adinfo.it",
];

const COLOR_POOL: TEventColor[] = COLORS.filter((color) => color !== "gray");

const COURT_COLOR_MAP = COURT_MOCK.reduce<Record<string, TEventColor>>(
  (acc, court, index) => {
    acc[court.id] = COLOR_POOL[index % COLOR_POOL.length];
    return acc;
  },
  {}
);

const mockGenerator = (numberOfEvents: number): IEvent[] => {
  const now = new Date();

  // Calcola oggi e ora attuale
  const startDate = new Date(now);
  startDate.setDate(now.getDate()); // oggi
  startDate.setHours(now.getHours()); // ora attuale

  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1, 59, 0, 0);
  const court = COURT_MOCK[Math.floor(Math.random() * COURT_MOCK.length)];
  const result: IEvent[] = [];

  let currentId = 1;

  const startRange = new Date(now);
  startRange.setDate(now.getDate() - 30);
  const endRange = new Date(now);
  endRange.setDate(now.getDate() + 30);

  const generateRandomUser = (idSuffix: number) => ({
    id: `user-${idSuffix}`,
    name: "Stefano",
    surname: "D'Aniello",
    email: `s.daniello${idSuffix}@adinfo.it`,
  });

  const allPartecipants = [
    {
      id: "1",
      name: "Mario",
      surname: "Rossi",
      credit: 0,
      is_paid: false,
      total_amount: 10,
      email: "mario.rossi@example.com",
    },
    {
      id: null,
      name: "Giovanni",
      surname: null,
      credit: null,
      is_paid: null,
      total_amount: null,
      email: null,
    },
    {
      id: "3",
      name: "Giulia",
      surname: "Bianchi",
      credit: 5.8,
      is_paid: false,
      total_amount: 4.9,
      email: "giulia.bianchi@example.com",
    },
    {
      id: "4",
      name: "Alessandro",
      surname: "Neri",
      credit: 12.9,
      is_paid: true,
      total_amount: 6.5,
      email: "alessandro.neri@example.com",
    },
  ];
  const generatePartecipants = () =>
    allPartecipants
      .sort(() => 0.5 - Math.random())
      .slice(0, 1 + Math.floor(Math.random() * 4)); // 1–4 partecipanti

  const isConflict = (start: Date, end: Date, courtId: string) => {
    return result.some((event) => {
      if (event.court.id !== courtId) return false;

      const eStart = new Date(event.startDate).getTime();
      const eEnd = new Date(event.endDate).getTime();
      const newStart = start.getTime();
      const newEnd = end.getTime();

      return (
        (newStart >= eStart && newStart < eEnd) ||
        (newEnd > eStart && newEnd <= eEnd) ||
        (newStart <= eStart && newEnd >= eEnd)
      );
    });
  };

  while (result.length < numberOfEvents) {
    const startDate = new Date(
      startRange.getTime() +
        Math.random() * (endRange.getTime() - startRange.getTime())
    );

    const minuteStep = Math.random() < 0.5 ? 0 : 30;
    startDate.setHours(8 + Math.floor(Math.random() * 8), minuteStep, 0, 0);

    // Durata: o 30 minuti o 60 minuti

    const endDate = new Date(startDate);
    const durationMinutes = Math.random() < 0.5 ? 30 : 60;
    endDate.setTime(endDate.getTime() + durationMinutes * 60 * 1000);

    const reservation_cost = 20 + Math.floor(Math.random() * 11);
    const lights_cost = Math.random() < 0.3 ? 5 : 0;
    const total_amount = reservation_cost + lights_cost;

    const court = COURT_MOCK[Math.floor(Math.random() * COURT_MOCK.length)];
    if (isConflict(startDate, endDate, court.id)) {
      continue; // salta questo evento e riprova
    }

    const partecipants = generatePartecipants();
    const is_cancelled = false;
    const is_double = partecipants.length > 2;
    const is_paid = is_cancelled ? false : Math.random() < 0.7;
    const color = is_cancelled ? "gray" : COURT_COLOR_MAP[court.id];

    result.push({
      id: currentId++,
      user: generateRandomUser(currentId),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      is_double,
      is_cancelled,
      phone_number: "3331234567",
      court,
      total_amount,
      lights_cost,
      is_paid,
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      partecipants,
      color,
    });
  }

  return result;
};

export const CALENDAR_ITENS_MOCK: IEvent[] = mockGenerator(80);
