import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Reservation } from "../../../lib/type";
import { HandCoins } from "../../../icons";
import { useState } from "react";
import { ReservationSummaryModal } from "../../ui/modal/ReservationSummaryModal";
import Button from "../../ui/button/Button";

const tableData: Reservation[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      role: "Player",
      is_active: true,
      avatar: "/images/user/user-1.jpg",
    },
    court: {
      id: "1",
      name: "Campo 1",
      picturePath: "/images/court/court-1.jpg",
      court_type: "Padel",
      location: "Area Nord",
      active: 1,
      price_socio: 15.0,
      price_non_socio: 20.0,
      price_lights: 5.0,
      price_junior: 10.0,
      special_days: null,
      timetable: null,
    },
    startDate: "17/06/2025 - 13:00",
    endDate: "17/06/2025 - 14:00",
    is_double: false,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 90.0,
    lights_cost: 0,
    is_paid: false,
    note: "Prenotazione Singola - Padel",
    partecipants: [
      {
        id: "p101",
        name: "Mario",
        surname: "Rossi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "mario.rossi@example.com",
      },
      {
        id: "p102",
        name: "Luisa",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
    ],
    court_name: "Campo 1",
    date: "17/06/2025",
    duration: "1 ora",
    light: false,
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Lucia",
      surname: "Blu",
      email: "lucia.blu@example.com",
      role: "Player",
      is_active: true,
      avatar: "/images/user/user-2.jpg",
    },
    court: {
      id: "2",
      name: "Campo 2",
      picturePath: "/images/court/court-2.jpg",
      court_type: "Tennis",
      location: "Area Sud",
      active: 1,
      price_socio: 12.0,
      price_non_socio: 18.0,
      price_lights: 5.0,
      price_junior: 8.0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 13:00",
    endDate: "30/06/2025 - 14:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-987-6543",
    total_amount: 75.0,
    lights_cost: 0,
    is_paid: false,
    note: "Doppio - Tennis",
    partecipants: [
      {
        id: "p201",
        name: "Giovanni",
        surname: "Bianchi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "giovanni.bianchi@example.com",
      },
      {
        id: "p202",
        name: "Anna",
        surname: "Neri",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "anna.neri@example.com",
      },
      {
        id: "p203",
        name: "Paolo",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "paolo.gialli@example.com",
      },
    ],
    court_name: "Campo 2",
    date: "30/06/2025",
    duration: "1 ora",
    light: false,
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      role: "Socio",
      is_active: true,
      avatar: "/images/user/user-3.jpg",
    },
    court: {
      id: "3",
      name: "Campo 3",
      picturePath: "/images/court/court-3.jpg",
      court_type: "Beach Volley",
      location: "Area Centrale",
      active: 1,
      price_socio: 10.0,
      price_non_socio: 15.0,
      price_lights: 7.0,
      price_junior: 5.0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75.0,
    lights_cost: 0,
    is_paid: true,
    note: "Doppio pagato",
    partecipants: [
      {
        id: "p301",
        name: "Andrea",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "andrea.gialli@example.com",
      },
      {
        id: "p302",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
      },
      {
        // Partecipante incompleto, riempito con valori di default
        id: "p303",
        name: "Giovanni",
        surname: "Sconosciuto",
        credit: 0,
        is_paid: false,
        total_amount: 0.0,
        email: "giovanni.sconosciuto@example.com",
      },
    ],
    court_name: "Campo 3",
    date: "30/06/2025",
    duration: "1 ora",
    light: false,
  },
  {
    id: "4",
    user: {
      id: "4",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      role: "Player",
      is_active: true,
      avatar: "/images/user/user-4.jpg",
    },
    court: {
      id: "4",
      name: "Campo 4",
      picturePath: "/images/court/court-4.jpg",
      court_type: "Padel",
      location: "Area Ovest",
      active: 1,
      price_socio: 15.0,
      price_non_socio: 20.0,
      price_lights: 5.0,
      price_junior: 10.0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75.0,
    lights_cost: 0,
    is_paid: true,
    note: "Quattro partecipanti",
    partecipants: [
      {
        id: "p401",
        name: "Giuseppe",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giuseppe.verdi@example.com",
      },
      {
        id: "p402",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
      },
      {
        id: "p403",
        name: "Andrea",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "andrea.gialli@example.com",
      },
      {
        id: "p404",
        name: "Francesca",
        surname: "Bruno",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "francesca.bruno@example.com",
      },
    ],
    court_name: "Campo 4",
    date: "30/06/2025",
    duration: "1 ora",
    light: false,
  },
  {
    id: "5",
    user: {
      id: "5",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      role: "Socio",
      is_active: true,
      avatar: "/images/user/user-5.jpg",
    },
    court: {
      id: "5",
      name: "Campo 5",
      picturePath: "/images/court/court-5.jpg",
      court_type: "Tennis",
      location: "Area Est",
      active: 1,
      price_socio: 12.0,
      price_non_socio: 18.0,
      price_lights: 5.0,
      price_junior: 8.0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75.0,
    lights_cost: 0,
    is_paid: true,
    note: "Prenotazione con incompleto (Tennis)",
    partecipants: [
      {
        id: "p501",
        name: "Francesca",
        surname: "Bruno",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "francesca.bruno@example.com",
      },
      {
        id: "p502",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
      },
      {
        // Partecipante incompleto, riempito con valori di default
        id: "p503",
        name: "Giovanni",
        surname: "Sconosciuto",
        credit: 0,
        is_paid: false,
        total_amount: 0.0,
        email: "giovanni.sconosciuto@example.com",
      },
      {
        id: "p504",
        name: "Andrea",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "andrea.gialli@example.com",
      },
    ],
    court_name: "Campo 5",
    date: "30/06/2025",
    duration: "1 ora",
    light: false,
  },
];
export default function BasicTableCollectGames() {
  const [selectedReservations, setSelectedReservations] =
    useState<Reservation | null>(null);
  const [openReservations, setOpenReservations] = useState(false);

  const handleOpenModal = (reservation: Reservation) => {
    setSelectedReservations(reservation);
    setOpenReservations(true);
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Campo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Totale
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 flex items-center justify-center"
              >
                Azione
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.court.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.startDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.total_amount.toFixed(2) + " €"}
                </TableCell>

                <TableCell className="px-4 py-3  text-theme-sm dark:text-gray-400 flex items-center justify-center ">
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenModal(reservation)}
                    className="hover:text-brand-500 dark:hover:text-brand-500"
                  >
                    <HandCoins />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ReservationSummaryModal
        open={openReservations}
        onOpenChange={setOpenReservations}
        startDate={selectedReservations?.startDate || ""}
        court_name={selectedReservations?.court.name || ""}
        is_double={selectedReservations?.is_double || false}
        lights_cost={selectedReservations?.lights_cost || 0}
        note={selectedReservations?.note || ""}
        partecipants={selectedReservations?.partecipants || []}
        total_amount={selectedReservations?.total_amount || 0}
      />
    </div>
  );
}
