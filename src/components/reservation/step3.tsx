import { useState } from "react";
import { X } from "../../icons";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Switch from "../form/switch/Switch";

export default function Step3() {
  const [switch1, setSwitch1] = useState(false);
  // Nuovo stato per gestire il tipo di partita (Singolo/Doppio)
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
          <div>
            <h4 className="text-lg border-b-1 border-gray-200 pb-2 mb-5">
              Partita tipo
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                {/* SOSTITUZIONE: Uso di input radio standard HTML */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="singolo"
                      name="gameType" // Stesso nome per il raggruppamento
                      value="SINGOLO"
                      checked={gameType === "SINGOLO"}
                      onChange={() => setGameType("SINGOLO")}
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black" // Stili Tailwind di base
                    />
                    <Label htmlFor="singolo">Singolo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="doppio"
                      name="gameType" // Stesso nome per il raggruppamento
                      value="DOPPIO"
                      checked={gameType === "DOPPIO"}
                      onChange={() => setGameType("DOPPIO")}
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black" // Stili Tailwind di base
                    />
                    <Label htmlFor="doppio">Doppio</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="text-lg border-b-1 border-gray-200 pb-2 mb-5">
              Partecipanti
            </h4>
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <Input
                  id="nome"
                  type="text"
                  placeholder="Inserisci nome e cognome"
                />
              </div>
              <Button className="cursor-pointer transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                +
              </Button>
            </div>
          </div>
          {/* remove: xl:grid-cols-4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {partecipantsAdded.map((partecipant) => (
              <div
                key={partecipant.id}
                className="border border-gray-200 border-dashed rounded-xl py-3 px-4 flex flex-row items-center gap-3 justify-between"
              >
                <div className="flex items-center gap-2">
                  {/* SOSTITUZIONE: Uso di div stilizzato per l'Avatar */}
                  <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-300 items-center justify-center text-sm font-semibold text-gray-800">
                    {/* Qui puoi mettere le iniziali o un'immagine */}
                    {partecipant.name.charAt(0) + partecipant.surname.charAt(0)}
                  </div>
                  <h3>{`${partecipant.name} ${partecipant.surname}`}</h3>
                </div>
                <X className="text-white bg-red-500 rounded-full flex-none w-5 h-5 md:w-4 md:h-4 p-0.5 cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="">
            <h4 className="text-lg border-b-1 border-gray-200 pb-2 mb-5">
              Note
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                  placeholder="Lascia una nota..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex  max-w-md  items-center gap-4">
            <Switch
              label={""} // className="scale-125 cursor-pointer transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              // checked={switch1}
              // onCheckedChange={(checked) => setSwitch1(checked)}
            />
            <span>Illuminazione</span>
          </div>
        </form>
        {/* Riepilogo - Blocco invariato */}
        <div className="flex flex-col w-full lg:w-xs rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-none">
          <div className="flex h-full flex-col gap-4 p-6 justify-start">
            <h3 className="text-xl font-semibold">Riepilogo</h3>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p>Data</p>
                <p className="font-semibold">10/04/2025</p>
              </div>
              <div className="flex justify-between">
                <p>Campo</p>
                <p className="font-semibold">Centrale</p>
              </div>
              <div className="flex justify-between">
                <p>Orario</p>
                <p className="font-semibold">09:00 - 10:00</p>
              </div>
              <hr className="border-gray-300 my-3" />
              <div className="flex justify-between">
                <p>Costo partecipanti</p>
                <p className="font-semibold">9.00 €</p>
              </div>
              <div className="flex justify-between">
                <p>Costo luci</p>
                <p className="font-semibold">9.00 €</p>
              </div>
              <hr className="border-gray-300 my-3" />
              <div className="flex justify-between">
                <p className="font-bold text-lg">Totale</p>
                <p className="font-bold text-lg">18.00 €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
