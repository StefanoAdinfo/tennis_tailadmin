import type { TEventFormData } from "@/calendar/schemas";
import { useEffect, useState } from "react";
import Input from "~/components/form/input/InputField";
import Label from "~/components/form/Label";
import Button from "~/components/ui/button/Button";
import { Modal } from "~/components/ui/modal";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import Select from "~/components/form/Select";
import { Court } from "~/lib/type";
import Switch from "~/components/form/switch/Switch";
import { ArrowRightIcon, X } from "~/icons";

interface IProps {
  startDate?: Date;
  startTime?: { hour: number; minute: number };
  court_id?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const courtsData: Court[] = [
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
          { start: "14:00", end: "23:00" },
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

export function AddEventDialog({
  startDate,
  startTime,
  court_id,
  open,
  setOpen,
}: IProps) {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [gameType, setGameType] = useState("SINGOLO");
  const [showRiepilogo, setShowRiepilogo] = useState(false);

  const handleCloseModal = () => {
    setShowRiepilogo(false);
    setOpen(false);
  };

  const optionsCourtType = courtsData.map((court) => ({
    value: court.id,
    label: court.name,
  }));

  const handleSelectChange = (value: string) => {
    const foundCourt = courtsData.find((court) => court.id === value) || null;
    setSelectedCourt(foundCourt);
  };

  const minTime = selectedCourt
    ? selectedCourt.timetable?.monday?.timeSlots?.[0]?.start || "08:00"
    : "08:00";
  const maxTime = selectedCourt
    ? selectedCourt.timetable?.monday?.timeSlots?.slice(-1)[0]?.end || "20:00"
    : "20:00";

  const partecipantsAdded = [
    // ... (dati invariati)
    {
      id: 7,
      name: "Giuseppe",
      surname: "Ambrosio",
      email: "ambrosio.giuseppe85@gmail.com",
      avatar: null,
    },
    {
      id: 15,
      name: "Giuseppe",
      surname: "Fusco",
      email: "g.fusco@adinfo.it",
      avatar: null,
    },
    {
      id: 18,
      name: "Giuseppe",
      surname: "Fusco",
      email: "emiliaadinfo@gmail.com",
      avatar: null,
    },
    {
      id: 20,
      name: "Giuseppe",
      surname: "Ugliano",
      email: "peppeugliano@gmail.com",
      avatar: null,
    },
  ];

  return (
    <Modal isOpen={open} onClose={handleCloseModal} className="max-w-lg p-6">
      {!showRiepilogo ? (
        <div id="create-event">
          <h5 className="text-lg font-medium text-gray-800 dark:text-white/90 my-2">
            Crea un nuovo evento per il:{" "}
            {startDate ? format(startDate, "dd/MM/yyyy", { locale: it }) : ""}
          </h5>
          <div className="grid gap-4 py-4">
            <div className="sm:col-span-1">
              <Label className="mb-1">Campo</Label>
              <Select
                defaultValue={court_id}
                options={optionsCourtType}
                placeholder="Seleziona un campo"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>

            <div className="flex flex-row gap-4">
              <div className="w-full">
                <Label className="mb-1">Orario inizio</Label>
                <Input type="time" min={minTime} max={maxTime} />
              </div>
              <div className="w-full">
                <Label className="mb-1">Orario fine</Label>
                <Input type="time" min={minTime} max={maxTime} />
              </div>
            </div>

            <div className="flex  justify-between md:flex-row gap-4">
              <div className="flex flex-row gap-4">
                {/* Radio: Singolo */}
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="singolo"
                    name="gameType"
                    value="SINGOLO"
                    checked={gameType === "SINGOLO"}
                    onChange={() => setGameType("SINGOLO")}
                    className="h-5 w-5 text-brand-600 border-gray-300 dark:border-gray-600 focus:ring-brand-600 dark:focus:ring-brand-600 bg-white dark:bg-gray-700  cursor-pointer"
                  />
                  <Label
                    htmlFor="singolo"
                    className="text-gray-800 dark:text-gray-200"
                  >
                    Singolo
                  </Label>
                </div>

                {/* Radio: Doppio */}
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="doppio"
                    name="gameType"
                    value="DOPPIO"
                    checked={gameType === "DOPPIO"}
                    onChange={() => setGameType("DOPPIO")}
                    // Colore del radio/focus: BLU (brand-600)
                    className="h-5 w-5 text-brand-600 border-gray-300 dark:border-gray-600 focus:ring-brand-600 dark:focus:ring-brand-600 bg-white dark:bg-gray-700  cursor-pointer"
                  />
                  <Label
                    htmlFor="doppio"
                    className="text-gray-800 dark:text-gray-200"
                  >
                    Doppio
                  </Label>
                </div>
              </div>

              <div className="text-gray-400 dark:text-gray-600 block">|</div>

              <div className="flex max-w-md items-center gap-4 text-gray-800 dark:text-gray-200">
                <Switch label={""} />
                <span>Illuminazione</span>
              </div>
            </div>

            <div className="">
              <h4 className="text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-800 dark:text-gray-200">
                Partecipanti
              </h4>
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Inserisci nome e cognome"
                    // L'Input deve già gestire dark mode e focus:brand-600 internamente
                  />
                </div>
                {/* Bottone: Sfondo BLU con focus BLU */}
                <Button className="cursor-pointer transition-transform active:scale-95 bg-brand-600 text-white focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 w-10 h-10 flex items-center justify-center rounded-full">
                  +
                </Button>
              </div>
            </div>

            {/* 3. LISTA PARTECIPANTI AGGIUNTI */}
            <div className="grid grid-cols-2 gap-2">
              {partecipantsAdded.map((partecipant) => (
                <div
                  key={partecipant.id}
                  // Bordo, Sfondo e Testo: Dark Mode
                  className="border border-gray-200 dark:border-gray-700 border-dashed rounded-xl py-3 px-4 flex flex-row items-center gap-3 justify-between bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    {/* Avatar (Dark Mode) */}
                    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700 items-center justify-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {partecipant.name.charAt(0) +
                        partecipant.surname.charAt(0)}
                    </div>
                    <h3 className="text-gray-800 dark:text-gray-200">{`${partecipant.name} ${partecipant.surname}`}</h3>
                  </div>
                  {/* Bottone X: Usa BLU o un colore visibile in dark mode, ma il rosso è ok per 'rimuovi' */}
                  <X className="text-white bg-red-600 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancella
            </Button>
            <Button variant="primary" onClick={() => setShowRiepilogo(true)}>
              Riepilogo
              <ArrowRightIcon className="ml-1 text-white" fill="currentColor" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full " id="riepilogo-event">
          <h5 className="text-lg font-medium text-gray-800 dark:text-white/90 my-2">
            Riepilogo
          </h5>
          <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300 py-4">
            <div className="flex justify-between">
              <p>Data</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {startDate
                  ? format(startDate, "dd/MM/yyyy", { locale: it })
                  : ""}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Campo</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                Centrale
              </p>
            </div>
            <div className="flex justify-between">
              <p>Orario</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                09:00 - 10:00
              </p>
            </div>{" "}
            <div>
              <p>Note</p>
              <div>
                <div className="flex-1">
                  <textarea
                    id="message"
                    rows={2}
                    className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 
                         bg-white text-gray-900 focus:ring-brand-600 focus:border-brand-600 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-600 dark:focus:border-brand-600"
                    placeholder="Lascia una nota..."
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 dark:border-gray-600 my-3" />
            <div className="flex justify-between">
              <p>Costo partecipanti</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                9.00 €
              </p>
            </div>
            <div className="flex justify-between">
              <p>Costo luci</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                9.00 €
              </p>
            </div>
            <hr className="border-gray-300 dark:border-gray-600 my-3" />
            <div className="flex justify-between text-gray-800 dark:text-gray-200">
              <p className="font-bold text-lg">Totale</p>
              <p className="font-bold text-lg">18.00 €</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowRiepilogo(false)}>
              indietro
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Crea evento
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
