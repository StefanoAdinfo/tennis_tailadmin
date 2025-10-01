import { useState } from "react";
import { X } from "../../icons";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Switch from "../form/switch/Switch";

export default function Step3() {
  const [gameType, setGameType] = useState("SINGOLO");

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
    <div className="mx-auto max-w-screen-xl">
      <div className="flex flex-col lg:flex-row items-start gap-12">
        <form className="flex-1 w-full flex flex-col gap-8">
          {/* 1. PARTITA TIPO (Radio Buttons) */}
          <div>
            <h4 className="text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-5 text-gray-800 dark:text-gray-200">
              Partita tipo
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col md:flex-row gap-4">
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
              </div>
            </div>
          </div>

          {/* 2. PARTECIPANTI (Input e Bottone) */}
          <div className="">
            <h4 className="text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-5 text-gray-800 dark:text-gray-200">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {partecipantsAdded.map((partecipant) => (
              <div
                key={partecipant.id}
                // Bordo, Sfondo e Testo: Dark Mode
                className="border border-gray-200 dark:border-gray-700 border-dashed rounded-xl py-3 px-4 flex flex-row items-center gap-3 justify-between bg-white dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  {/* Avatar (Dark Mode) */}
                  <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700 items-center justify-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {partecipant.name.charAt(0) + partecipant.surname.charAt(0)}
                  </div>
                  <h3 className="text-gray-800 dark:text-gray-200">{`${partecipant.name} ${partecipant.surname}`}</h3>
                </div>
                {/* Bottone X: Usa BLU o un colore visibile in dark mode, ma il rosso è ok per 'rimuovi' */}
                <X className="text-white bg-red-600 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5 cursor-pointer" />
              </div>
            ))}
          </div>

          {/* 4. NOTE (Textarea) */}
          <div className="">
            <h4 className="text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-5 text-gray-800 dark:text-gray-200">
              Note
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 
                         bg-white text-gray-900 focus:ring-brand-600 focus:border-brand-600 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-600 dark:focus:border-brand-600"
                  placeholder="Lascia una nota..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* 5. SWITCH ILLUMINAZIONE */}
          <div className="flex max-w-md items-center gap-4 text-gray-800 dark:text-gray-200">
            <Switch
              // Lo switch deve usare il brand-600 quando attivo (solitamente gestito internamente)
              label={""}
            />
            <span>Illuminazione</span>
          </div>
        </form>

        {/* Riepilogo - Blocco aggiornato per Dark Mode */}
        <div className="flex flex-col w-full lg:w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Riepilogo
          </h3>
          <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <p>Data</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                10/04/2025
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
        </div>
      </div>
    </div>
  );
}
