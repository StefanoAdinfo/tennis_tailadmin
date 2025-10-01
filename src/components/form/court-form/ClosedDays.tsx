import { format } from "date-fns";
import { useEffect, useState } from "react";
import { it } from "date-fns/locale/it";
import Button from "../../ui/button/Button";
import { TrashBinIcon } from "../../../icons";
import Label from "../Label";
import Input from "../input/InputField";
import Switch from "../switch/Switch";
import { Modal } from "../../ui/modal";
import { DayPicker } from "react-day-picker";
import ComponentCard from "../../common/ComponentCard";

export interface ClosedDay {
  id: string;
  name: string;
  date: Date | string;
  isRecurring: boolean;
  year?: number;
}

interface ClosedDaysProps {
  closedDays: ClosedDay[];
  onChange: (days: ClosedDay[]) => void;
  openModal: boolean;
}

interface ClosedDayFormData {
  id: string;
  name: string;
  date: Date;
  isRecurring: boolean;
}

const DEFAULT_CLOSED_DAY: ClosedDayFormData = {
  id: "",
  name: "",
  date: new Date(),
  isRecurring: false,
};

export const ClosedDays = ({
  closedDays,
  onChange,
  openModal,
}: ClosedDaysProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<ClosedDayFormData | null>(null);
  const [localClosedDays, setLocalClosedDays] =
    useState<ClosedDay[]>(closedDays);

  useEffect(() => {
    setLocalClosedDays(closedDays);
  }, [closedDays]);

  useEffect(() => {
    if (openModal) {
      handleOpenModal();
    }
  }, [openModal]);
  const handleOpenModal = (day?: ClosedDay) => {
    if (day) {
      setEditingDay({
        id: day.id,
        name: day.name,
        date: new Date(day.date),
        isRecurring: day.isRecurring,
      });
    } else {
      setEditingDay({
        ...DEFAULT_CLOSED_DAY,
        id: "",
        date: new Date(),
      });
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingDay(null);
  };

  const handleSave = () => {
    if (!editingDay?.name.trim()) {
      return;
    }

    const newDay: ClosedDay = {
      id: editingDay.id.length
        ? editingDay.id
        : typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : uuidv4(),
      name: editingDay.name.trim(),
      date: format(editingDay.date, "yyyy-MM-dd"),
      isRecurring: editingDay.isRecurring,
      year: editingDay.isRecurring ? undefined : editingDay.date.getFullYear(),
    };

    const newClosedDays = editingDay.id.length
      ? localClosedDays.map((day) => (day.id === editingDay.id ? newDay : day))
      : [...localClosedDays, newDay];

    //console.log("handleSave", editingDay.id, newClosedDays, localClosedDays)

    setLocalClosedDays(newClosedDays);
    onChange(newClosedDays);
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    const newDays = localClosedDays.filter((day) => day.id !== id);
    setLocalClosedDays(newDays);
    onChange(newDays);
  };

  const formatDate = (date: Date, isRecurring: boolean) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return isRecurring
      ? `${day}/${month} (ricorrente)`
      : `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {localClosedDays.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4 dark:text-gray-400">
            Nessun giorno di chiusura configurato
          </p>
        ) : (
          localClosedDays.map((day) => (
            <ComponentCard key={day.id}>
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {day.name}
                  </p>
                  <p className="text-sm text-muted-foreground text-gray-800 dark:text-white/90">
                    {formatDate(new Date(day.date), day.isRecurring)}
                  </p>
                </div>
                <div className="flex items-center  gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenModal(day)}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(day.id)}
                    className=" text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
                  >
                    <TrashBinIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </ComponentCard>
          ))
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className="max-w-lg p-6"
      >
        <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
          {editingDay?.id
            ? "Modifica giorno di chiusura"
            : "Nuovo giorno di chiusura"}
        </h5>
        <div className="space-y-4">
          <Label htmlFor="name">Nome</Label>
          <Input
            value={editingDay?.name ?? ""}
            onChange={(e) =>
              setEditingDay(
                (prev) =>
                  prev && {
                    ...prev,
                    name: e.target.value,
                  }
              )
            }
            placeholder="es. Natale, Ferragosto, etc."
          />

          <Label htmlFor="date">Data</Label>

          <DayPicker
            locale={it}
            mode="single"
            selected={editingDay?.date}
            onSelect={(date) =>
              setEditingDay(
                (prev) =>
                  prev && {
                    ...prev,
                    date: date ?? new Date(),
                  }
              )
            }
            classNames={{
              month: "text-gray-800 dark:text-white/90",
            }}
          />

          <Switch
            defaultChecked={editingDay?.isRecurring ?? false}
            className={` ${editingDay?.isRecurring === true ? "!bg-black" : ""}`}
            onChange={(checked) =>
              setEditingDay(
                (prev) =>
                  prev && {
                    ...prev,
                    isRecurring: checked,
                  }
              )
            }
            label={"Ricorrente (si ripete ogni anno)"}
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseModal}>
              Annulla
            </Button>
            <Button
              onClick={handleSave}
              disabled={!editingDay?.name.trim()}
              className="text-white"
            >
              Salva
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClosedDays;

function uuidv4(): string {
  throw new Error("Function not implemented.");
}
