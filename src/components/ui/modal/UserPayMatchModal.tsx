import { useEffect, useState } from "react";
import { Reservation } from "../../../lib/type";
import { Modal } from ".";
import Input from "../../form/input/InputField";
import Button from "../button/Button";
import { CircleAlert } from "../../../icons";
import { Separator } from "../separator/Separator";

interface UserPayMatchModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  reservation: Reservation[];
  id: string;
  name: string;
  surname: string;
  total_amount: number;
}
export function UserPayMatchModal({
  open,
  onOpenChange,
  reservation,
  id,
  name,
  surname,
  total_amount,
}: UserPayMatchModalProps) {
  const [amount, setAmount] = useState(0);
  const [credit, setCredit] = useState(0);
  const [reservationState, setReservationStete] = useState<Reservation[]>([]);

  const calcAmount = () => {
    let total = 0;
    reservation.forEach((r) => {
      r.partecipants.forEach((p) => {
        if (p?.id == id) {
          total += p.total_amount || 0;
        }
      });
    });
    setAmount(Math.round(total * 100) / 100);
  };
  const calcCredit = () => {
    let total = 0;
    reservation.forEach((r) => {
      r.partecipants.forEach((p) => {
        if (p?.id == id) {
          total += p.credit || 0;
        }
      });
    });
    setCredit(Math.round(total * 100) / 100);
  };

  // const updateAmount = (inputValue: number) => {
  //   const updatedReservations = reservation.map((res) => ({
  //     ...res,
  //     partecipants: res.partecipants.map((p) => ({ ...p })),
  //   }));

  //   // Caso: azzeramento input → reset totale
  //   if (inputValue === 0) {
  //     updatedReservations.forEach((res) => {
  //       res.partecipants.forEach((p) => {
  //         if (String(p.id) === String(id)) {
  //           p.is_paid = false;
  //         }
  //       });
  //     });

  //     // Reset amount e credit agli originali
  //     const totalAmount = reservation.reduce((sum, r) => {
  //       const p = r.partecipants.find((p) => String(p.id) === String(id));
  //       return p ? sum + (p.total_amount || 0) : sum;
  //     }, 0);

  //     const totalCredit = reservation.reduce((sum, r) => {
  //       const p = r.partecipants.find((p) => String(p.id) === String(id));
  //       return p ? sum + (p.credit || 0) : sum;
  //     }, 0);

  //     setAmount(Math.round(totalAmount * 100) / 100);
  //     setCredit(Math.round(totalCredit * 100) / 100);
  //     setReservationStete(updatedReservations);
  //     return;
  //   }

  //   // Altrimenti: calcolo partite pagabili
  //   let available = inputValue + credit;
  //   let newAmount = 0;

  //   updatedReservations.forEach((res) => {
  //     res.partecipants.forEach((p) => {
  //       if (String(p.id) === String(id)) {
  //         if (!p.is_paid && p.total_amount <= available) {
  //           p.is_paid = true;
  //           available -= p.total_amount;
  //         } else {
  //           p.is_paid = false; // fallback in caso venga superato dopo reset
  //         }

  //         // Ricontare solo gli unpaid
  //         if (!p.is_paid) {
  //           newAmount += p.total_amount || 0;
  //         }
  //       }
  //     });
  //   });

  //   setAmount(Math.round(newAmount * 100) / 100);
  //   setCredit(Math.round(available * 100) / 100);
  //   setReservationStete(updatedReservations);
  // };

  useEffect(() => {
    setReservationStete(reservation);
    calcAmount();
    calcCredit();
  }, [reservation, id]);

  const handleCloseModal = () => {
    onOpenChange?.(false);
  };

  return (
    <Modal isOpen={open} onClose={handleCloseModal} className="max-w-lg p-6">
      <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90 py-2">
        {name} {surname}{" "}
      </h3>
      <div className="grid grid-cols-1 gap-3 mt-5">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] px-4 text-sm font-semibold text-gray-600 gap-3 ">
          <div className="w-[15px] "></div>
          <div>Data</div>
          <div>Campo</div>
          <div>Partecipanti</div>
          <div className="text-right w-14">Importo</div>
        </div>

        {reservationState.map((r) => (
          <div
            key={r.id}
            className={`grid grid-cols-[auto_1fr_1fr_1fr_auto] border border-gray-300 border-dashed rounded-xl py-3 px-4 gap-3  items-center  ${
              r.is_paid
                ? "bg-gray-100 dark:bg-white/[0.20]"
                : "dark:bg-white/[0.03]"
            }`}
          >
            <div className="w-[15px] ">
              {r.partecipants[0].is_paid === true ? (
                <svg
                  xmlns="http://www.w3.o rg/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check text-white bg-green-500 rounded-full flex-none p-0.5"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              ) : r.partecipants[0].is_paid === false ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-x text-white bg-red-500 rounded-full flex-none p-0.5"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <CircleAlert className="text-white bg-yellow-400 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5" />
              )}
            </div>

            <div className="text-sm text-gray-800 dark:text-white/90">
              {r.startDate}
            </div>
            <div className="text-sm text-gray-800 dark:text-white/90">
              {r.court.name}
            </div>
            <ul>
              {r.partecipants.map((p) => (
                <li
                  key={p.id}
                  className="text-xs text-gray-800 dark:text-white/90"
                >
                  {p.name} {p.surname}
                </li>
              ))}
            </ul>

            <div className="text-sm text-right w-14 text-gray-800 dark:text-white/90">
              {r.partecipants[0].total_amount} €
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between  border-gray-200 pt-2 mt-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Saldo
        </h4>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {credit.toFixed(2)} €
        </h4>
      </div>
      <div className="flex items-center justify-between  border-gray-200 pt-4 ">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Contante
        </h4>
        <Input
          type="number"
          id="amount"
          min="0"
          // onChange={(e) => {
          //   const val = Number(e.target.value);
          //   updateAmount(val);
          // }}
        />
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between  pt-2 mt-2 text-gray-800 dark:text-white/90">
        <h4 className="text-2xl font-semibold ">Totale</h4>
        <h4 className="text-2xl font-semibold">{amount.toFixed(2)}€</h4>
      </div>
      <div className="flex justify-end mt-3 cursor-pointer">
        <Button onClick={handleCloseModal}>Paga Partite</Button>
      </div>
    </Modal>
  );
}
