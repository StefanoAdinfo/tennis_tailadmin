import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Reservation } from "../../../lib/type";
import { HandCoins } from "../../../icons";

const tableData: Reservation[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      avatar: "",
      role: "",
      is_active: false,
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
    total_amount: 90,
    lights_cost: 0,
    is_paid: false,
    note: "",
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
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Lucia",
      surname: "Blu",
      email: "lucia.blu@example.com",
      avatar: "",
      role: "",
      is_active: false,
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
    startDate: "30/06/2025 - 13:00",
    endDate: "30/06/2025 - 14:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-987-6543",
    total_amount: 75,
    lights_cost: 0,
    is_paid: false,
    note: "",
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
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      avatar: "",
      role: "",
      is_active: false,
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
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75,
    lights_cost: 0,
    is_paid: true,
    note: "",
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
        id: null,
        name: "Giovanni",
        surname: null,
        credit: null,
        is_paid: null,
        total_amount: null,
        email: null,
      },
    ],
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      avatar: "",
      role: "",
      is_active: false,
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
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75,
    lights_cost: 0,
    is_paid: true,
    note: "",
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
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      avatar: "",
      role: "",
      is_active: false,
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
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75,
    lights_cost: 0,
    is_paid: true,
    note: "",
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
        id: null,
        name: "Giovanni",
        surname: null,
        credit: null,
        is_paid: null,
        total_amount: null,
        email: null,
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
