import { Fragment, useEffect, useState } from "react";
import { Modal } from ".";
import { CheckLineIcon, CircleAlert, X } from "../../../icons";
import Input from "../../form/input/InputField";
import Button from "../button/Button";
import { Separator } from "../separator/Separator";
import { Tooltip } from "react-tooltip";
import { format } from "date-fns";

export type Partecipants = {
  id: string | null;
  name: string;
  surname: string | null;
  credit: number | null;
  is_paid: boolean | null;
  total_amount: number | null;
  email: string | null;
};
interface ReservationSummaryModalProps {
  id: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  startDate: string;
  court_name: string;
  is_double: boolean;
  lights_cost: number;
  note: string;
  partecipants: Partecipants[];
  total_amount: number;
}
export function ReservationSummaryModal({
  id,
  open,
  onOpenChange,
  startDate,
  court_name,
  is_double,
  lights_cost,
  note,
  partecipants,
  total_amount,
}: ReservationSummaryModalProps) {
  const handleCloseModal = () => {
    onOpenChange?.(false);
  };
  const [reservation, setReservation] = useState<any[]>([]);
  const [reservationPartecipants, setReservationPartecipants] = useState<any[]>(
    []
  );

  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      // Online
      // https://api.tennisclubottaviano.it/api/UsersTotUnpaid?page=1

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/reservationPartecipants?reservation_id=${id}`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Errore: ${response.status} durante il fetch dei dati`
          );
        }

        const result = await response.json();

        if (result) {
          setReservation(result.reservation);
          setReservationPartecipants(result.reservationPartecipants);
        } else {
          throw new Error("Risposta API non valida: mancano 'data' o 'meta'.");
        }
      } catch (e) {
        throw new Error("Si è verificato un errore sconosciuto.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Modal isOpen={open} onClose={handleCloseModal} className="max-w-lg p-6">
      {reservation.map((r) => (
        <Fragment key={r.id}>
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90 py-2">
            Paga Partita del : {format(r.start_time, "dd/MM/yyyy")}
          </h3>

          <div className="flex flex-col md:flex-row gap-2 text-gray-800 dark:text-white/90">
            <span>{r.court.name}</span> ,
            <span>{r.is_double ? "Doppio" : "Singolo"}</span>
          </div>

          <div className="flex max-w-md items-center gap-2 text-gray-800 dark:text-white/90">
            <h4>Illuminazione:</h4>
            <span>{r.lights_cost ? "Si" : "No"}</span>
          </div>
          <div className="mb-2 space-y-1  ">
            <h4 className="dark:text-gray-600 font-semibold">Note</h4>
            <div className="bg-gray-100 dark:bg-white/[0.20] rounded-md p-2 text-gray-800 dark:text-white/90">
              {r.note ? r.note : "Nessuna nota"}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <h4 className="text-lg text-gray-800 dark:text-white/90">
              Partecipanti
            </h4>

            <div
              data-tooltip-id={`incassi-tooltip-${r.id}`}
              className="flex -space-x-2 cursor-pointer"
            >
              {reservationPartecipants.map((player, i) => {
                if (i > r.number_of_people - 1) return null;
                else
                  return (
                    <div
                      key={`player-${r.id}-${player.id}`}
                      className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                    >
                      <img
                        width={24}
                        height={24}
                        src={player.avatar || "/images/user/default-avatar.svg"}
                        alt={`player-${player.surname}`}
                        className="w-full size-6 object-cover"
                      />
                    </div>
                  );
              })}
            </div>
          </div>

          <Tooltip
            id={`incassi-tooltip-${r.id}`}
            className="border border-gray-100 dark:border-gray-700/50 bg-white! dark:bg-gray-800! rounded-xl! shadow-2xl pointer-events-auto p-4 text-gray-700! dark:text-gray-400!"
          >
            <div className="flex flex-col">
              <strong className="mb-1">Partecipanti:</strong>
              {reservationPartecipants.map((player, i) => {
                if (i > r.number_of_people - 1) return null;
                else
                  return (
                    <div
                      key={`partecipantContent-${i}`}
                      className="flex items-center gap-2 py-0.5 whitespace-nowrap"
                    >
                      <div className="w-5 h-5 overflow-hidden rounded-full flex-shrink-0">
                        <img
                          width={20}
                          height={20}
                          src={
                            player.avatar || "/images/user/default-avatar.svg"
                          }
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{`${player.surname}`}</span>
                    </div>
                  );
              })}
            </div>
          </Tooltip>
          <Separator className="my-4" />
          <div className="flex items-center justify-between  text-gray-800 dark:text-white/90">
            <h4 className="text-2xl font-semibold">Totale</h4>
            <h4 className="text-2xl font-semibold">{r.total_amount}€</h4>
          </div>
        </Fragment>
      ))}
      {/* <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-4 gap-3 px-4 text-sm font-semibold text-gray-600 text-center">
          <div className="col-span-1">Nome</div>
          <div className="col-span-1">Saldo</div>
          <div className="col-span-1">Da pagare</div>
          <div className="col-span-1">Paga</div>
        </div>
        {partecipants.map((partecipant) => (
          <div
            key={partecipant.id}
            className={`grid grid-cols-4 items-center border border-gray-300 border-dashed rounded-xl py-3 px-4 gap-3 ${
              partecipant.is_paid == true
                ? "bg-gray-100 dark:bg-white/[0.20]"
                : "dark:bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center gap-3">
              {partecipant.is_paid == true ? (
                <CheckLineIcon className="text-white bg-green-500 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              ) : partecipant.is_paid == false ? (
                <X className="text-white bg-red-500 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              ) : (
                <CircleAlert className="text-white bg-yellow-400 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              )}

              <h3 className="text-gray-800 dark:text-white/90">
                {`${partecipant.surname} `}
              </h3>
            </div>

            <div className="flex justify-center">
              <span
                className={`${
                  partecipant?.credit && partecipant?.credit > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {partecipant.credit || 0} €
              </span>
            </div>

            <div className="flex justify-center">
              <Input
                type="number"
                className={`w-20 ${
                  partecipant.is_paid ? "bg-gray-100 text-gray-500" : ""
                }`}
                value={
                  partecipant.amount == null || partecipant.is_paid
                    ? 0
                    : partecipant.amount
                }
                disabled={partecipant.is_paid}
              />
            </div>

            <div className="flex justify-center">
              <Button className="cursor-pointer" disabled={partecipant.is_paid}>
                Paga
              </Button>
            </div>
          </div>
        ))}
      </div> */}

      <div className="flex justify-end mt-4">
        <Button>Paga</Button>
      </div>
      <Separator className="my-4" />
      <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Azioni Pericolose
      </h5>
      <div className="flex items-center justify-start gap-2">
        <Button variant="danger">Annulla Partita</Button>
        <Button variant="danger">Elimina Partita</Button>
      </div>
      <Separator className="mt-4" />
    </Modal>
  );
}
