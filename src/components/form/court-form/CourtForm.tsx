import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import { ClosedDay, WeekSchedule } from "../../../lib/type";
import OpeningHours from "./OpeningHours";
import { PlusIcon } from "../../../icons";
import Button from "../../ui/button/Button";
import ClosedDays from "./ClosedDays";
export const CourtForm = (id?: any) => {
  const [message, setMessage] = useState("");

  const [closedDays, setClosedDays] = useState<ClosedDay[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [schedule, setSchedule] = useState<WeekSchedule>({});

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
      <ComponentCard title="Dettagli" className="col-span-12 ">
        <div className="w-full">
          <Label className="mb-1" htmlFor="name">
            Nome
          </Label>
          <Input type="text" id="name" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Label className="mb-1">Ruolo</Label>
            <Select
              options={optionsCourtType}
              placeholder="Seleziona un opzione"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div className="w-full">
            <Label className="mb-1">Ruolo</Label>
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
    </div>
  );
};
