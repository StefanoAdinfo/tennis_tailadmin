import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Court } from "../../../lib/type";
import { TrashBinIcon, PenIcon } from "../../../icons";
import Badge from "../../ui/badge/Badge";
import { Link } from "react-router";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import { useState } from "react";

const tableData: Court[] = [
  {
    id: "1",
    picturePath: "/images/campo1.jpg",
    name: "Campo 1",
    court_type: "terra_rossa",
    location: "indoor",
    active: 1,
    price_socio: 10,
    price_non_socio: 15,
    price_lights: 5,
    price_junior: 8,
    special_days: {
      id: "xmas",
      date: "2025-12-25T00:00:00.000Z",
      name: "Natale",
    },
    timetable: {
      monday: {
        isOpen: true,
        timeSlots: [
          { start: "08:00", end: "12:00" },
          { start: "14:00", end: "20:00" },
        ],
      },
      tuesday: { isOpen: true, timeSlots: [{ start: "08:00", end: "20:00" }] },
      wednesday: {
        isOpen: true,
        timeSlots: [{ start: "08:00", end: "20:00" }],
      },
      thursday: { isOpen: true, timeSlots: [{ start: "08:00", end: "20:00" }] },
      friday: { isOpen: true, timeSlots: [{ start: "08:00", end: "20:00" }] },
      saturday: { isOpen: false, timeSlots: [] },
      sunday: { isOpen: false, timeSlots: [] },
    },
  },
  {
    id: "2",
    picturePath: null,
    name: "Campo 2",
    court_type: "terra_rossa",
    location: "indoor",
    active: 1,
    price_socio: 12,
    price_non_socio: 18,
    price_lights: 6,
    price_junior: 10,
    special_days: null,
    timetable: null,
  },
  {
    id: "3",
    picturePath: "/images/campo3.jpg",
    name: "Campo 3",
    court_type: "terra_rossa",
    location: "indoor",
    active: 0,
    price_socio: 8,
    price_non_socio: 14,
    price_lights: 4,
    price_junior: 7,
    special_days: null,
    timetable: {
      monday: { isOpen: false, timeSlots: [] },
      tuesday: { isOpen: true, timeSlots: [{ start: "10:00", end: "16:00" }] },
      wednesday: {
        isOpen: true,
        timeSlots: [{ start: "10:00", end: "16:00" }],
      },
      thursday: { isOpen: true, timeSlots: [{ start: "10:00", end: "16:00" }] },
      friday: { isOpen: true, timeSlots: [{ start: "10:00", end: "16:00" }] },
      saturday: { isOpen: true, timeSlots: [{ start: "10:00", end: "18:00" }] },
      sunday: { isOpen: true, timeSlots: [{ start: "10:00", end: "18:00" }] },
    },
  },
  {
    id: "4",
    picturePath: "/images/campo4.jpg",
    name: "Campo 4",
    court_type: "terra_rossa",
    location: "indoor",
    active: 1,
    price_socio: 15,
    price_non_socio: 20,
    price_lights: 7,
    price_junior: 12,
    special_days: {
      id: "ferragosto",
      date: "2025-08-15T00:00:00.000Z",
      name: "Ferragosto",
    },
    timetable: {
      monday: { isOpen: true, timeSlots: [{ start: "09:00", end: "21:00" }] },
      tuesday: { isOpen: true, timeSlots: [{ start: "09:00", end: "21:00" }] },
      wednesday: {
        isOpen: true,
        timeSlots: [{ start: "09:00", end: "21:00" }],
      },
      thursday: { isOpen: true, timeSlots: [{ start: "09:00", end: "21:00" }] },
      friday: { isOpen: true, timeSlots: [{ start: "09:00", end: "21:00" }] },
      saturday: { isOpen: true, timeSlots: [{ start: "09:00", end: "23:00" }] },
      sunday: { isOpen: true, timeSlots: [{ start: "09:00", end: "23:00" }] },
    },
  },
  {
    id: "5",
    picturePath: null,
    name: "Campo 5",
    court_type: "erba",
    location: "indoor",
    active: 0,
    price_socio: 9,
    price_non_socio: 13,
    price_lights: 5,
    price_junior: 7,
    special_days: null,
    timetable: {
      monday: { isOpen: false, timeSlots: [] },
      tuesday: { isOpen: false, timeSlots: [] },
      wednesday: { isOpen: false, timeSlots: [] },
      thursday: { isOpen: false, timeSlots: [] },
      friday: { isOpen: false, timeSlots: [] },
      saturday: { isOpen: true, timeSlots: [{ start: "15:00", end: "20:00" }] },
      sunday: { isOpen: true, timeSlots: [{ start: "15:00", end: "20:00" }] },
    },
  },
];

function getCourtTypeLabel(courtType: string): string {
  switch (courtType) {
    case "terra_rossa":
      return "Terra Rossa";
    case "erba":
      return "Erba";
    case "sintetico":
      return "Sintetico";
    case "cemento":
      return "Cemento";
    default:
      return "Altro";
  }
}

export default function BasicTableOne() {
  // const [isOpen, setIsOpen] = useState(false);
  const [selectCourt, setSelectCourt] = useState<Court | null>(null);

  // const handleCloseModal = () => {
  //   setIsOpen(false);
  // };
  // const handleOpenModal = (court: Court) => {
  //   setSelectCourt(court);
  //   setIsOpen(true);
  // };

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
                Nome
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Locazione
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tipo
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 "
              >
                Attivo
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 "
              >
                Azione
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((court) => (
              <TableRow key={court.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {court.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {court.location}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {getCourtTypeLabel(court.court_type)}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500  text-theme-sm dark:text-gray-400 text-center">
                  <Badge size="sm" color={court.active ? "success" : "error"}>
                    {court.active ? "Si" : "No"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-theme-sm dark:text-gray-400 flex items-center justify-center cursor-pointer">
                  <Link
                    to={`/campi/${court.id}`}
                    className="hover:text-brand-500 dark:hover:text-brand-500"
                  >
                    <Button
                      variant="ghost"
                      className="text-yellow-600 dark:text-yellow-500 hover:underline text-xs"
                    >
                      MODIFICA
                    </Button>
                  </Link>
                  {/* <Button
                    variant="ghost"
                    onClick={() => handleOpenModal(court)}
                    className="hover:text-red-500 dark:hover:text-red-500"
                  >
                    <TrashBinIcon />
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className="max-w-lg p-6"
      >
        <h5 className="text-lg font-medium text-gray-800 dark:text-white/90 my-2">
          Sei sicuro di voler eliminare {selectCourt?.name}
        </h5>
        <p className="mt-4 text-sm leading-normal text-gray-500 dark:text-gray-400">
          L'azione è irreversibile
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Elimina
          </Button>
        </div>
      </Modal> */}
    </div>
  );
}
