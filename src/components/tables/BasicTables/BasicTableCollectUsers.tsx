import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Payment } from "../../../lib/type";
import { HandCoins } from "../../../icons";

const tableData: Payment[] = [
  {
    id: "1",
    name: "Stefano",
    surname: "D'aniello",
    total_amount: 61.2,
    reservation: [
      {
        id: "1",
        user: {
          id: "1",
          name: "Stefano",
          surname: "D'aniello",
          email: "stefano.daniello@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "1",
          name: "Campo 1",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
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
            total_amount: 50,
            email: "luisa.verdi@example.com",
          },
        ],
      },
      {
        id: "2",
        user: {
          id: "1",
          name: "Stefano",
          surname: "D'aniello",
          email: "stefano.daniello@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "2",
          name: "Campo 2",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
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
            is_paid: true,
            total_amount: 50,
            email: "tommaso.verdi@example.com",
          },
        ],
      },
      {
        id: "3",
        user: {
          id: "1",
          name: "Stefano",
          surname: "D'aniello",
          email: "stefano.daniello@example.com",
          avatar: "/images/user/user-17.jpg",
        },

        court: {
          id: "3",
          name: "Campo 3",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
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
            total_amount: 50,
            email: "luisa.verdi@example.com",
          },
          {
            id: "3",
            name: "Tommaso",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50,
            email: "tommaso.verdi@example.com",
          },
          {
            id: "5",
            name: "Giuseppe",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50,
            email: "giuseppe.verdi@example.com",
          },
        ],
      },
    ],
    date: null,
  },
  {
    id: "2",
    name: "Luisa",
    surname: "Verdi",
    total_amount: 150,
    reservation: [
      {
        id: "4",
        user: {
          id: "2",
          name: "Luisa",
          surname: "Verdi",
          email: "luisa.verdi@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "1",
          name: "Campo 1",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
        partecipants: [
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50,
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
      },
      {
        id: "5",
        user: {
          id: "2",
          name: "Luisa",
          surname: "Verdi",
          email: "luisa.verdi@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "2",
          name: "Campo 2",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
        partecipants: [
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50,
            email: "luisa.verdi@example.com",
          },
          {
            id: "3",
            name: "Tommaso",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50,
            email: "tommaso.verdi@example.com",
          },
        ],
      },
      {
        id: "6",
        user: {
          id: "2",
          name: "Luisa",
          surname: "Verdi",
          email: "luisa.verdi@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "3",
          name: "Campo 3",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
        partecipants: [
          {
            id: "2",
            name: "Luisa",
            surname: "Verdi",
            credit: 10,
            is_paid: false,
            total_amount: 50,
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
            total_amount: 50,
            email: "tommaso.verdi@example.com",
          },
          {
            id: "5",
            name: "Giuseppe",
            surname: "Verdi",
            credit: 10,
            is_paid: true,
            total_amount: 50,
            email: "giuseppe.verdi@example.com",
          },
        ],
      },
    ],
    date: null,
  },
  {
    id: "3",
    name: "Marco",
    surname: "Rossi",
    total_amount: 45.0,
    reservation: [
      {
        id: "7",
        user: {
          id: "3",
          name: "Marco",
          surname: "Rossi",
          email: "marco.rossi@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "4",
          name: "Campo 4",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
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
      },
    ],
    date: null,
  },
  {
    id: "4",
    name: "Sara",
    surname: "Bianchi",
    total_amount: 45,
    reservation: [
      {
        id: "8",
        user: {
          id: "4",
          name: "Sara",
          surname: "Bianchi",
          email: "sara.bianchi@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "5",
          name: "Campo 5",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
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
      },
    ],
    date: null,
  },
  {
    id: "5",
    name: "Davide",
    surname: "Neri",
    total_amount: 20.0,
    reservation: [
      {
        id: "9",
        user: {
          id: "5",
          name: "Davide",
          surname: "Neri",
          email: "davide.neri@example.com",
          avatar: "/images/user/user-17.jpg",
        },
        court: {
          id: "6",
          name: "Campo 6",
          picturePath: null,
          court_type: "",
          location: "",
          active: 0,
          price_socio: 0,
          price_non_socio: 0,
          price_lights: 0,
          price_junior: 0,
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
        note: "",
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
      },
    ],
    date: null,
  },
];

export default function BasicTableOne() {
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
                  <HandCoins />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
