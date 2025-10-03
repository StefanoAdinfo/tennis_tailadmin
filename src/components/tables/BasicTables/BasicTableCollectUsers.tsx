import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Payment } from "../../../lib/type";
import { EuroIcon, HandCoins } from "../../../icons";
import Button from "../../ui/button/Button";
import { useState } from "react";
import { UserPayMatchModal } from "../../ui/modal/UserPayMatchModal";

const tableData: Payment[] = [
  {
    id: "1",
    name: "Stefano",
    surname: "D'aniello",
    total_amount: 61.2,
    date: "17/06/2025",
    email: "stefano.daniello@example.com",
    role: "Player",
    is_active: true,
    reservation: [
      {
        id: "1",
        user: {
          id: "1",
          name: "Stefano",
          surname: "D'aniello",
          email: "stefano.daniello@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        total_amount: 90.5,
        lights_cost: 0,
        is_paid: true,
        note: "Prenotazione singola",
        partecipants: [
          {
            id: "1",
            name: "Stefano",
            surname: "D'aniello",
            credit: 10,
            is_paid: true,
            total_amount: 20.4,
            email: "stefano.daniello@example.com",
          },
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
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
          id: "1",
          name: "Stefano",
          surname: "D'aniello",
          email: "stefano.daniello@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        startDate: "17/06/2025 - 13:00",
        endDate: "17/06/2025 - 14:00",
        is_double: false,
        is_cancelled: true,
        phone_number: "555-123-4567",
        total_amount: 90.5,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione singola",
        partecipants: [
          {
            id: "1",
            name: "Stefano",
            surname: "D'aniello",
            credit: 10,
            is_paid: false,
            total_amount: 20.4,
            email: "stefano.daniello@example.com",
          },
          {
            id: "3",
            name: "Tommaso",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50.0,
            email: "tommaso.verdi@example.com",
          },
        ],
        court_name: "Campo 2",
        date: "17/06/2025",
        duration: "1 ora",
        light: false,
      },
      {
        id: "3",
        user: {
          id: "1",
          name: "Stefano",
          surname: "D'aniello",
          email: "stefano.daniello@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        startDate: "17/06/2025 - 13:00",
        endDate: "17/06/2025 - 14:00",
        is_double: false,
        is_cancelled: false,
        phone_number: "555-123-4567",
        total_amount: 90.5,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione multipla",
        partecipants: [
          {
            id: "1",
            name: "Stefano",
            surname: "D'aniello",
            credit: 10,
            is_paid: false,
            total_amount: 20.4,
            email: "stefano.daniello@example.com",
          },
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
            email: "luisa.verdi@example.com",
          },
          {
            id: "3",
            name: "Tommaso",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
            email: "tommaso.verdi@example.com",
          },
          {
            id: "5",
            name: "Giuseppe",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
            email: "giuseppe.verdi@example.com",
          },
        ],
        court_name: "Campo 3",
        date: "17/06/2025",
        duration: "1 ora",
        light: false,
      },
    ],
  },
  {
    id: "2",
    name: "Luisa",
    surname: "Verdi",
    total_amount: 150.0,
    date: "17/06/2025",
    email: "luisa.verdi@example.com",
    role: "Player",
    is_active: true,
    reservation: [
      {
        id: "4",
        user: {
          id: "2",
          name: "Luisa",
          surname: "Verdi",
          email: "luisa.verdi@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        total_amount: 90.5,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione singola",
        partecipants: [
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50.0,
            email: "luisa.verdi@example.com",
          },
          {
            id: "1",
            name: "Stefano",
            surname: "D'aniello",
            credit: 10,
            is_paid: false,
            total_amount: 20.4,
            email: "stefano.daniello@example.com",
          },
        ],
        court_name: "Campo 1",
        date: "17/06/2025",
        duration: "1 ora",
        light: false,
      },
      {
        id: "5",
        user: {
          id: "2",
          name: "Luisa",
          surname: "Verdi",
          email: "luisa.verdi@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        startDate: "17/06/2025 - 13:00",
        endDate: "17/06/2025 - 14:00",
        is_double: false,
        is_cancelled: false,
        phone_number: "555-123-4567",
        total_amount: 90.5,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione singola",
        partecipants: [
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50.0,
            email: "luisa.verdi@example.com",
          },
          {
            id: "3",
            name: "Tommaso",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
            email: "tommaso.verdi@example.com",
          },
        ],
        court_name: "Campo 2",
        date: "17/06/2025",
        duration: "1 ora",
        light: false,
      },
      {
        id: "6",
        user: {
          id: "2",
          name: "Luisa",
          surname: "Verdi",
          email: "luisa.verdi@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        startDate: "17/06/2025 - 13:00",
        endDate: "17/06/2025 - 14:00",
        is_double: false,
        is_cancelled: false,
        phone_number: "555-123-4567",
        total_amount: 90.5,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione multipla",
        partecipants: [
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50.0,
            email: "luisa.verdi@example.com",
          },
          {
            id: "1",
            name: "Stefano",
            surname: "D'aniello",
            credit: 10,
            is_paid: false,
            total_amount: 20.4,
            email: "stefano.daniello@example.com",
          },
          {
            id: "3",
            name: "Tommaso",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
            email: "tommaso.verdi@example.com",
          },
          {
            id: "5",
            name: "Giuseppe",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50.0,
            email: "giuseppe.verdi@example.com",
          },
        ],
        court_name: "Campo 3",
        date: "17/06/2025",
        duration: "1 ora",
        light: false,
      },
    ],
  },
  {
    id: "3",
    name: "Marco",
    surname: "Rossi",
    total_amount: 45.0,
    date: "18/06/2025",
    email: "marco.rossi@example.com",
    role: "Admin",
    is_active: true,
    reservation: [
      {
        id: "7",
        user: {
          id: "3",
          name: "Marco",
          surname: "Rossi",
          email: "marco.rossi@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Admin",
          is_active: true,
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
        startDate: "18/06/2025 - 10:00",
        endDate: "18/06/2025 - 11:00",
        is_double: false,
        is_cancelled: false,
        phone_number: "555-987-6543",
        total_amount: 45.0,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione mattutina",
        partecipants: [
          {
            id: "3",
            name: "Marco",
            surname: "Rossi",
            credit: 5,
            is_paid: false,
            total_amount: 45.0,
            email: "marco.rossi@example.com",
          },
          {
            id: "1",
            name: "Stefano",
            surname: "D'aniello",
            credit: 10,
            is_paid: false,
            total_amount: 20.4,
            email: "stefano.daniello@example.com",
          },
        ],
        court_name: "Campo 4",
        date: "18/06/2025",
        duration: "1 ora",
        light: false,
      },
    ],
  },
  {
    id: "4",
    name: "Sara",
    surname: "Bianchi",
    total_amount: 45.0,
    date: "19/06/2025",
    email: "sara.bianchi@example.com",
    role: "Player",
    is_active: true,
    reservation: [
      {
        id: "8",
        user: {
          id: "4",
          name: "Sara",
          surname: "Bianchi",
          email: "sara.bianchi@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Player",
          is_active: true,
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
        startDate: "19/06/2025 - 09:30",
        endDate: "19/06/2025 - 10:30",
        is_double: true,
        is_cancelled: false,
        phone_number: "555-222-3344",
        total_amount: 90.0,
        lights_cost: 0,
        is_paid: false,
        note: "Doppio mattutino",
        partecipants: [
          {
            id: "4",
            name: "Sara",
            surname: "Bianchi",
            credit: 15,
            is_paid: false,
            total_amount: 45.0,
            email: "sara.bianchi@example.com",
          },
          {
            id: "6",
            name: "Paolo",
            surname: "Riva",
            credit: 5,
            is_paid: true,
            total_amount: 45.0,
            email: "paolo.riva@example.com",
          },
        ],
        court_name: "Campo 5",
        date: "19/06/2025",
        duration: "1 ora",
        light: false,
      },
    ],
  },
  {
    id: "5",
    name: "Davide",
    surname: "Neri",
    total_amount: 20.0,
    date: "20/06/2025",
    email: "davide.neri@example.com",
    role: "Socio",
    is_active: true,
    reservation: [
      {
        id: "9",
        user: {
          id: "5",
          name: "Davide",
          surname: "Neri",
          email: "davide.neri@example.com",
          avatar: "/images/user/user-17.jpg",
          role: "Socio",
          is_active: true,
        },
        court: {
          id: "6",
          name: "Campo 6",
          picturePath: "/images/court/court-6.jpg",
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
        startDate: "20/06/2025 - 16:00",
        endDate: "20/06/2025 - 17:30",
        is_double: true,
        is_cancelled: false,
        phone_number: "555-456-7890",
        total_amount: 60.0,
        lights_cost: 0,
        is_paid: false,
        note: "Prenotazione pomeridiana",
        partecipants: [
          {
            id: "5",
            name: "Davide",
            surname: "Neri",
            credit: 10,
            is_paid: false,
            total_amount: 20.0,
            email: "davide.neri@example.com",
          },
          {
            id: "7",
            name: "Luca",
            surname: "Gialli",
            credit: 10,
            is_paid: false,
            total_amount: 20.0,
            email: "luca.gialli@example.com",
          },
          {
            id: "8",
            name: "Matteo",
            surname: "Blu",
            credit: 10,
            is_paid: false,
            total_amount: 20.0,
            email: "matteo.blu@example.com",
          },
        ],
        court_name: "Campo 6",
        date: "20/06/2025",
        duration: "1 ora e 30 min",
        light: false,
      },
    ],
  },
];

export default function BasicTableOne() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [openPayments, setOpenPayments] = useState(false);

  const handleOpenModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpenPayments(true);
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
                Cognome
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nome
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
            {tableData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.surname}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.total_amount.toFixed(2) + " €"}
                </TableCell>

                <TableCell className="px-4 py-3  text-theme-sm dark:text-gray-400 flex items-center justify-center ">
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenModal(user)}
                    className="hover:text-brand-500 dark:hover:text-brand-500"
                  >
                    <EuroIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UserPayMatchModal
        open={openPayments}
        onOpenChange={setOpenPayments}
        reservation={selectedPayment?.reservation || []}
        id={selectedPayment?.id || ""}
        name={selectedPayment?.name || ""}
        surname={selectedPayment?.surname || ""}
        total_amount={selectedPayment?.total_amount || 0}
      />
    </div>
  );
}
