import { CALENDAR_ITENS_MOCK, COURT_MOCK } from "~/calendar/mocks";
const token = import.meta.env.VITE_TOKEN;

const addPropertyAtCourts = (data: any[]) => {
  return data.map((court: any, i: number) => {
    switch (i) {
      case 0:
        return {
          ...court,
          picturePath: null,
          color: "blue",
        };
      case 1:
        return {
          ...court,
          picturePath: null,
          color: "green",
        };
      case 2:
        return {
          ...court,
          picturePath: null,
          color: "red",
        };
      case 3:
        return {
          ...court,
          picturePath: null,
          color: "yellow",
        };
      default:
        return {
          ...court,
          picturePath: null,
          color: "yellow",
        };
    }
  });
};

export const get_Courts = async () => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/courts`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore: ${response.status} durante il fetch dei dati`);
    }

    const result = await response.json();
    let rawCourts: any[] = [];

    if (result.data) {
      rawCourts = result.data;
    } else {
      throw new Error("Risposta API non valida: mancano i dati.");
    }

    const processedCourts = addPropertyAtCourts(rawCourts);
    return processedCourts;
  } catch (e) {
    console.error("Errore nel recupero dei campi:", e);
    return COURT_MOCK;
  }
};

export const getEvents = async () => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/reservations`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore: ${response.status} durante il fetch dei dati`);
    }

    const result = await response.json();
    let reservations: any[] = [];
    if (result.data) {
      reservations = result.data;
    } else {
      throw new Error("Risposta API non valida: mancano i dati.");
    }

    // console.log("CALENDAR_ITENS_MOCK", CALENDAR_ITENS_MOCK);

    const fixedReservations = reservations.map((reservation: any) => {
      return {
        ...reservation,
        startDate: reservation.start_time,
        endDate: reservation.end_time,
      };
    });
    console.log(fixedReservations);
    return fixedReservations;
    // return CALENDAR_ITENS_MOCK;
  } catch (e) {
    console.error("Errore nel recupero dei campi:", e);
    return CALENDAR_ITENS_MOCK;
  }
};
