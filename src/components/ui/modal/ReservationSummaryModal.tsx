import { Modal } from ".";
import { CheckLineIcon, CircleAlert, X } from "../../../icons";
import Input from "../../form/input/InputField";
import Button from "../button/Button";
import { Separator } from "../separator/Separator";

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
  return (
    <Modal isOpen={open} onClose={handleCloseModal} className="max-w-lg p-6">
      <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90 py-2">
        Paga Partita del {startDate}
      </h3>

      <div className="flex flex-col md:flex-row gap-2 text-gray-800 dark:text-white/90">
        <span>{court_name}</span>-
        <span>{is_double ? "Doppio" : "Singolo"}</span>
      </div>

      <div className="flex max-w-md items-center gap-2 text-gray-800 dark:text-white/90">
        <h4>Illuminazione:</h4>
        <span>{lights_cost ? "Si" : "No"}</span>
      </div>
      <div className="mb-2 space-y-1  ">
        <h4 className="dark:text-gray-600 font-semibold">Note</h4>
        <div className="bg-gray-100 dark:bg-white/[0.20] rounded-md p-2 text-gray-800 dark:text-white/90">
          {note ? note : "Nessuna nota"}
        </div>
      </div>

      <h4 className="text-lg pb-2 mb-2 text-gray-800 dark:text-white/90">
        Partecipanti
      </h4>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 gap-3">
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
              partecipant.is_paid || partecipant.email === null
                ? "bg-gray-100 dark:bg-white/[0.20]"
                : "dark:bg-white/[0.03]"
            }`}
          >
            {/* Colonna 1: Nome + icona */}
            <div className="flex items-center gap-3">
              {partecipant.is_paid === true ? (
                <CheckLineIcon className="text-white bg-green-500 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              ) : partecipant.is_paid === false ? (
                <X className="text-white bg-red-500 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              ) : (
                <CircleAlert className="text-white bg-yellow-400 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              )}

              <h3 className="text-gray-800 dark:text-white/90">
                {`${partecipant.name} ${
                  partecipant.email === null ? "" : partecipant.surname
                }`}
              </h3>
            </div>

            {/* Colonna 2: Totale */}
            <div className="flex justify-center">
              <span
                className={`${
                  partecipant?.credit && partecipant?.credit > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {partecipant.credit}
                {partecipant.email === null ? "" : "€"}
              </span>
            </div>

            {partecipant.email ? (
              <>
                <div className="flex justify-center">
                  <Input
                    type="number"
                    className={`w-20 ${
                      partecipant.is_paid ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    value={
                      partecipant.email === null ||
                      partecipant.total_amount === null ||
                      partecipant.is_paid
                        ? 0
                        : partecipant.total_amount
                    }
                    disabled={partecipant.is_paid || partecipant.email === null}
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    className="cursor-pointer"
                    disabled={partecipant.is_paid || partecipant.email === null}
                  >
                    Paga
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>

      <Separator className="my-4" />
      <div className="flex items-center justify-between  text-gray-800 dark:text-white/90">
        <h4 className="text-2xl font-semibold">Totale</h4>
        <h4 className="text-2xl font-semibold">{total_amount}€</h4>
      </div>
    </Modal>
  );
}
