import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Reservation } from "../../../lib/type";
import Badge from "../../ui/badge/Badge";
import { Tooltip } from "~/components/ui/tooltip/Tooltip";
import { useState } from "react";

const tableData: Reservation[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      role: "user",
      is_active: true,
      avatar: "/images/user/user-18.jpg",
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
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
    ],
    court_name: undefined,
    date: undefined,
    duration: undefined,
    light: undefined,
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Lucia",
      surname: "Blu",
      email: "lucia.blu@example.com",
      role: "user",
      is_active: true,
      avatar: "/images/user/user-17.jpg",
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
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
        id: "3",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-17.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "4",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-18.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
      {
        id: "5",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "6",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
    ],
    court_name: undefined,
    date: undefined,
    duration: undefined,
    light: undefined,
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      role: "user",
      is_active: true,
      avatar: "/images/user/user-20.jpg",
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
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
        id: "7",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-17.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "8",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-18.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
      {
        id: "9",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "10",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
    ],
    court_name: undefined,
    date: undefined,
    duration: undefined,
    light: undefined,
  },
  {
    id: "4",
    user: {
      id: "4",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      role: "user",
      is_active: true,
      avatar: "/images/user/user-27.jpg",
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    court: {
      id: "4",
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
        id: "11",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-17.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "12",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-18.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
      {
        id: "13",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "14",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
    ],
    court_name: undefined,
    date: undefined,
    duration: undefined,
    light: undefined,
  },
  {
    id: "5",
    user: {
      id: "5",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      role: "user",
      is_active: true,
      avatar: "/images/user/user-21.jpg",
      card: "",
      phone_number: "",
      memeber_type: "",
      junior: false,
    },
    court: {
      id: "5",
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
        id: "15",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-17.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "16",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-18.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
      {
        id: "17",
        name: "Stefano",
        surname: "D'aniello",
        avatar: "/images/user/user-20.jpg",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "stefano.daniello@example.com",
      },
      {
        id: "18",
        name: "Luisa",
        surname: "Verdi",
        avatar: "/images/user/user-21.jpg",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
      },
    ],
    court_name: undefined,
    date: undefined,
    duration: undefined,
    light: undefined,
  },
];

export default function BasicTablePlayedGames() {
  const [openTooltipMap, setOpenTooltipMap] = useState<{
    [key: string]: boolean;
  }>({});

  const handleSetOpenTooltip = (
    reservationId: string | number,
    isOpen: boolean
  ) => {
    setOpenTooltipMap((prevMap) => ({
      ...prevMap,
      [reservationId]: isOpen,
    }));
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
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data Partita
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Partecipanti
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Campo
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Totale
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500  text-theme-xs dark:text-gray-400 text-center"
              >
                Annullata
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500  text-theme-xs dark:text-gray-400 text-center"
              >
                Pagata
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.startDate}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {/* {reservation.partecipants.map((partecipant, index) => (
                    <div key={index}>
                      {partecipant.name} {partecipant.surname}
                      {","}
                    </div>
                  ))} */}
                  <Tooltip
                    trigger={
                      <div className="flex -space-x-2 cursor-pointer">
                        {reservation.partecipants.map((partecipant) => (
                          <div
                            key={`partecipant-${partecipant.id}`}
                            className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                          >
                            <img
                              width={24}
                              height={24}
                              src={partecipant.avatar || ""}
                              alt={`Partecipante ${partecipant.name}`}
                              className="w-full size-6 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    }
                    open={openTooltipMap[reservation.id] || false}
                    setOpen={(isOpen: boolean) =>
                      handleSetOpenTooltip(reservation.id, isOpen)
                    }
                  >
                    <div className="flex flex-col p-1 text-sm text-gray-700 dark:text-gray-200">
                      <strong className="mb-1">Partecipanti:</strong>
                      {reservation.partecipants.map((partecipant) => (
                        <div
                          key={partecipant.id}
                          className="flex items-center gap-2 py-0.5 whitespace-nowrap"
                        >
                          <div className="w-5 h-5 overflow-hidden rounded-full flex-shrink-0">
                            <img
                              width={20}
                              height={20}
                              src={partecipant.avatar || ""}
                              alt={partecipant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>
                            {`${partecipant.name} ${partecipant.surname}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.court.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {reservation.total_amount.toFixed(2)}€
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={reservation.is_cancelled ? "success" : "error"}
                  >
                    {reservation.is_cancelled ? "Si" : "No"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500  text-theme-sm dark:text-gray-400 text-center">
                  <Badge
                    size="sm"
                    color={reservation.is_paid ? "success" : "error"}
                  >
                    {reservation.is_paid ? "Si" : "No"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
