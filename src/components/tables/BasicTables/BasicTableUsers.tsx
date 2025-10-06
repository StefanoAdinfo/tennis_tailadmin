import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { User } from "../../../lib/type";
import { EyeIcon, PenIcon } from "../../../icons";
import Badge from "../../ui/badge/Badge";
import { Link } from "react-router";
import Button from "../../ui/button/Button";

const tableData: User[] = [
  {
    id: "1",
    name: "Stefano",
    surname: "D'aniello",
    role: "admin",
    is_active: true,
    email: "stefano.daniello@example.com",
    avatar: "/images/user/user-17.jpg",
    card: "",
    phone_number: "",
    memeber_type: "",
    junior: false,
  },
  {
    id: "2",
    name: "Luisa",
    surname: "Verdi",
    role: "admin",
    is_active: false,
    email: "luisa.verdi@example.com",
    avatar: "/images/user/user-18.jpg",
    card: "",
    phone_number: "",
    memeber_type: "",
    junior: false,
  },
  {
    id: "3",
    name: "Marco",
    surname: "Rossi",
    role: "user",
    is_active: true,
    email: "marco.rossi@example.com",
    avatar: "/images/user/user-21.jpg",
    card: "",
    phone_number: "",
    memeber_type: "",
    junior: false,
  },
  {
    id: "4",
    name: "Sara",
    surname: "Bianchi",
    role: "user",
    is_active: false,
    email: "sara.bianchi@example.com",
    avatar: "/images/user/user-19.jpg",
    card: "",
    phone_number: "",
    memeber_type: "",
    junior: false,
  },
  {
    id: "5",
    name: "Davide",
    surname: "Neri",
    role: "user",
    is_active: true,
    email: "davide.neri@example.com",
    avatar: "/images/user/user-20.jpg",
    card: "",
    phone_number: "",
    memeber_type: "",
    junior: false,
  },
];

export default function BasicTableRevenue() {
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
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ruolo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Attivo
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
                  {user.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.role[0].toUpperCase() + user.role.slice(1)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={user.is_active ? "success" : "error"}>
                    {user.is_active ? "Si" : "No"}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3  text-theme-sm  dark:text-gray-400 flex items-center justify-center cursor-pointer ">
                  <Link to={`/utenti/${user.id}`}>
                    <Button
                      variant="ghost"
                      className="hover:text-brand-500 dark:hover:text-brand-500"
                    >
                      <EyeIcon />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
