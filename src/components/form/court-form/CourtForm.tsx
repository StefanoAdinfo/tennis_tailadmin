import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import { ClosedDay, WeekSchedule } from "../../../lib/type";
import OpeningHours from "./OpeningHours";
import { PlusIcon, TrashBinIcon } from "../../../icons";
import Button from "../../ui/button/Button";
import ClosedDays from "./ClosedDays";
import { Modal } from "~/components/ui/modal";
export const CourtForm = (id: any) => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [closedDays, setClosedDays] = useState<ClosedDay[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [schedule, setSchedule] = useState<WeekSchedule>({});

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const optionsCourtType = [
    { value: "terra_rossa", label: "Terra rossa" },
    { value: "erba", label: "Erba" },
    { value: "sintetico", label: "Sintetico" },
    { value: "cemento", label: "Cemento" },
  ];
  const optionsCourtPosition = [
    { value: "indoor", label: "Dentro" },
    { value: "outdoor", label: "Fuori" },
  ];
  const optionsCourtState = [
    { value: "open", label: "Aperto" },
    { value: "closed", label: "Chiuso" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <ComponentCard
        title={` ${id.id ? "Modifica campo" : "Aggiungi campo"}`}
        buttonShow={id.id ? true : false}
        customButton={
          <Button
            className="bg-red-600 hover:bg-red-800"
            onClick={() => setIsOpen(true)}
          >
            Elimina campo
          </Button>
        }
        className="col-span-12"
      >
        <div className="w-full">
          <Label className="mb-1" htmlFor="name">
            Nome
          </Label>
          <Input type="text" id="name" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Label className="mb-1">Tipologia</Label>
            <Select
              options={optionsCourtType}
              placeholder="Seleziona un opzione"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div className="w-full">
            <Label className="mb-1">Posizione</Label>
            <Select
              options={optionsCourtPosition}
              placeholder="Seleziona un opzione"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
        </div>
        <div className="w-full">
          <Label className="mb-1">Stato del campo</Label>
          <Select
            options={optionsCourtState}
            placeholder="Seleziona un opzione"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div className="w-full ">
          <Label>Descrizione</Label>
          <TextArea
            placeholder="Inserisci una descrizione"
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Prezzi" className="col-span-12">
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="w-full">
            <div className="w-full mb-4">
              <Label className="mb-1" htmlFor="price_socio">
                Prezzo Socio
              </Label>
              <Input type="number" id="price_socio" />
            </div>
            <div className="w-full mb-4">
              <Label className="mb-1" htmlFor="price_not_socio">
                Prezzo non Socio
              </Label>
              <Input type="number" id="price_not_socio" />
            </div>
            <div className="w-full mb-4">
              <Label className="mb-1" htmlFor="price_junior">
                Prezzo Junior
              </Label>
              <Input type="number" id="price_junior" />
            </div>
          </div>

          <div className="w-full">
            <div className="w-full mb-4">
              <Label className="mb-1" htmlFor="price_socio_doppio">
                {" "}
                Prezzo Socio Doppio
              </Label>
              <Input type="number" id="price_socio_doppio" />
            </div>
            <div className="w-full mb-4">
              <Label className="mb-1" htmlFor="price_not_socio_doppio">
                {" "}
                Prezzo non Socio Doppio
              </Label>
              <Input type="number" id="price_not_socio_doppio" />
            </div>
            <div className="w-full mb-4">
              <Label className="mb-1" htmlFor="price_junior_doppio">
                {" "}
                Prezzo Junior Doppio
              </Label>
              <Input type="number" id="price_junior_doppio" />
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <Label className="mb-1" htmlFor="price_light">
            Prezzo luci
          </Label>
          <Input type="number" id="price_light" />
        </div>
      </ComponentCard>
      {/* parte destra  */}

      {/* Orari*/}
      <ComponentCard title="Orari" className="col-span-12">
        <OpeningHours schedule={schedule} onChange={setSchedule} />
      </ComponentCard>

      <ComponentCard
        title="Giorni di chiusura"
        buttonShow
        customButton={
          <Button
            key={"add-closed-day"}
            variant="outline"
            onClick={() => setOpenModal((prev) => !prev)}
          >
            <PlusIcon />
            Aggiungi giorno di chiusura
          </Button>
        }
        className="col-span-12"
      >
        <ClosedDays
          closedDays={closedDays}
          onChange={setClosedDays}
          openModal={openModal}
        />
      </ComponentCard>

      <div className="col-span-12 flex justify-end">
        <Button variant="primary">{id.id ? "Modifica" : "Crea"}</Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className="max-w-lg p-6"
      >
        <h5 className="text-lg font-medium text-gray-800 dark:text-white/90 my-2">
          Sei sicuro di voler eliminare questo Campo?
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
      </Modal>
    </div>
  );
};
