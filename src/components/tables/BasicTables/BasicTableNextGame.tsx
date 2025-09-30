import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Games } from "../../../lib/type";
import Badge from "../../ui/badge/Badge";
import { HandCoins } from "../../../icons";

const tableData: Games[] = [
  {
    id: "1",
    court_name: "Campo 1",
    user: {
      id: "1",
      email: "ste1@gmail.com",
      avatar: "/images/user/user-17.jpg",
      surname: "D'aniello",
      name: "Lindsey",
    },
    date: "17/06/2025 - 13:00",
    duration: "1h",
    light: true,
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
        total_amount: 20.4,
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
        id: "2",
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
    court_name: "Campo Esterno 1",
    user: {
      id: "2",
      email: "ste@gmail.com",
      avatar: "/images/user/user-18.jpg",
      surname: "D'aniello",
      name: "Lindsey",
    },
    date: "18/06/2025 - 15:30",
    duration: "1h 30m",
    light: false,
    partecipants: [
      {
        id: "2",
        name: "Mario",
        surname: "Rossi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "mario.rossi@example.com",
      },
      {
        id: "2",
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
    id: "3",
    court_name: "Campo Esterno 2",
    user: {
      id: "3",
      email: "ste3@gmail.com",
      avatar: "/images/user/user-27.jpg",
      surname: "D'aniello",
      name: "Lindsey",
    },
    date: "19/06/2025 - 09:00",
    duration: "2h",
    light: true,
    partecipants: [
      {
        id: "3",
        name: "Luca",
        surname: "Bianchi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "luca.bianchi@example.com",
      },
      {
        id: "2",
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
    id: "4",
    court_name: "Campo 1",
    user: {
      id: "4",
      email: "ste4@gmail.com",
      avatar: "/images/user/user-21.jpg",
      surname: "D'aniello",
      name: "Marco",
    },
    date: "20/06/2025 - 11:00",
    duration: "1h",
    light: false,
    partecipants: [
      {
        id: "4",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
      },
      {
        id: "2",
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
    id: "5",
    court_name: "Campo Esterno 3",
    user: {
      id: "5",
      email: "ste2@gmail.com",
      avatar: "/images/user/user-20.jpg",
      surname: "D'aniello",
      name: "Lindsey",
    },
    date: "21/06/2025 - 14:00",
    duration: "1h 45m",
    light: true,
    partecipants: [
      {
        id: "5",
        name: "Marco",
        surname: "Neri",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "marco.neri@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
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
                Utente
              </TableCell>
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
                Durata
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Luci
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
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={reservation.user.avatar}
                        alt={reservation.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {reservation.user.name} {reservation.user.surname}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.court_name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.date}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.duration}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={reservation.light ? "success" : "error"}
                  >
                    {reservation.light ? "Si" : "No"}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center justify-center">
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
