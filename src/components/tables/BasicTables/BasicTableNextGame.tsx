import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Games } from "../../../lib/type";
import Badge from "../../ui/badge/Badge";
import { TrashBinIcon } from "../../../icons";
import Button from "../../ui/button/Button";
import { useState } from "react";
import { Modal } from "../../ui/modal";

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
      role: "",
      is_active: false,
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    date: "17/06/2025 - 13:00",
    duration: "1h",
    light: true,
    partecipants: [
      {
        id: "1",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-17.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-18.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
      {
        id: "1",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
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
      role: "",
      is_active: false,
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    date: "18/06/2025 - 15:30",
    duration: "1h 30m",
    light: false,
    partecipants: [
      {
        id: "2",
        name: "Mario",
        surname: "Rossi",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "mario.rossi@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
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
      role: "",
      is_active: false,
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    date: "19/06/2025 - 09:00",
    duration: "2h",
    light: true,
    partecipants: [
      {
        id: "3",
        name: "Luca",
        surname: "Bianchi",
        avatar: "/images/user/user-27.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "luca.bianchi@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
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
      role: "",
      is_active: false,
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    date: "20/06/2025 - 11:00",
    duration: "1h",
    light: false,
    partecipants: [
      {
        id: "4",
        name: "Giulia",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-17.jpg",
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
      role: "",
      is_active: false,
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    date: "21/06/2025 - 14:00",
    duration: "1h 45m",
    light: true,
    partecipants: [
      {
        id: "5",
        name: "Marco",
        surname: "Neri",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "marco.neri@example.com",
      },
      {
        id: "2",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
    ],
  },
];

export default function BasicTableOne() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectReservation, setSelectReservation] = useState<Games | null>(
    null
  );

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = (reservation: Games) => {
    setSelectReservation(reservation);
    setIsOpen(true);
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
                Utente
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Giocatori
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
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 "
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
                  <div className="flex -space-x-2">
                    {reservation.partecipants.map((partecipant) => (
                      <div
                        key={partecipant.id}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={partecipant.avatar || ""}
                          alt={`Team member ${partecipant.id}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
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

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenModal(reservation)}
                    className="hover:text-red-500 dark:hover:text-red-500"
                  >
                    <TrashBinIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className="max-w-lg p-6"
      >
        <h5 className="text-lg font-medium text-gray-800 dark:text-white/90 my-2">
          Sei sicuro di voler annullare questa partita?
        </h5>
        <p className="mt-4 text-sm leading-normal text-gray-500 dark:text-gray-400">
          Data: {selectReservation?.date}
        </p>
        <p className="mt-1 text-sm leading-normal text-gray-500 dark:text-gray-400">
          Durata: {selectReservation?.duration}
        </p>
        <p className="mt-4 text-sm leading-normal text-gray-500 dark:text-gray-400">
          Campo: {selectReservation?.court_name}
        </p>
        <p className="max-w-xs mt-1 text-sm leading-normal text-gray-500 dark:text-gray-400">
          {" "}
          Partecipanti:{" "}
          {selectReservation?.partecipants
            .map((partecipant) => partecipant.name + " " + partecipant.surname)
            .join(", ")}
        </p>

        <div className="mt-6 flex  justify-end ">
          <Button onClick={handleCloseModal}>Annulla partita</Button>
        </div>
      </Modal>
    </div>
  );
}
