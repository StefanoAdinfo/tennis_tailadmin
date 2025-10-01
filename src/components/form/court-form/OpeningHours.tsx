import { useEffect } from "react";
import Label from "../Label";
import Switch from "../switch/Switch";
import Button from "../../ui/button/Button";
import { PlusIcon, TrashBinIcon } from "../../../icons";
import Input from "../input/InputField";
import ComponentCard from "../../common/ComponentCard";

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  isOpen: boolean;
  timeSlots: TimeSlot[];
}

interface WeekSchedule {
  [key: string]: DaySchedule;
}

interface OpeningHoursProps {
  schedule: WeekSchedule;
  onChange: (newSchedule: WeekSchedule) => void;
}

const DAYS = [
  { id: "monday", label: "Lunedì" },
  { id: "tuesday", label: "Martedì" },
  { id: "wednesday", label: "Mercoledì" },
  { id: "thursday", label: "Giovedì" },
  { id: "friday", label: "Venerdì" },
  { id: "saturday", label: "Sabato" },
  { id: "sunday", label: "Domenica" },
];

const DEFAULT_TIME_SLOT: TimeSlot = { start: "08:00", end: "22:00" };
const DEFAULT_DAY_SCHEDULE: DaySchedule = {
  isOpen: true,
  timeSlots: [{ ...DEFAULT_TIME_SLOT }],
};

export const OpeningHours = ({ schedule, onChange }: OpeningHoursProps) => {
  const getValidSchedule = (): WeekSchedule => {
    const validSchedule: WeekSchedule = { ...schedule };
    DAYS.forEach((day) => {
      if (!validSchedule[day.id]) {
        validSchedule[day.id] = {
          isOpen: DEFAULT_DAY_SCHEDULE.isOpen,
          timeSlots: DEFAULT_DAY_SCHEDULE.timeSlots.map((slot) => ({
            ...slot,
          })),
        };
      }
    });
    return validSchedule;
  };

  const currentSchedule = getValidSchedule();

  useEffect(() => {
    // Solo se schedule è vuoto, aggiorniamo lo stato con i valori di default
    if (Object.keys(schedule).length === 0) {
      onChange({ ...currentSchedule });
    }
  }, []);

  const handleAddTimeSlot = (day: string) => {
    const newSchedule = {
      ...currentSchedule,
      [day]: {
        ...currentSchedule[day],
        timeSlots: [
          ...currentSchedule[day].timeSlots,
          { ...DEFAULT_TIME_SLOT },
        ],
      },
    };
    onChange(newSchedule);
  };

  const handleRemoveTimeSlot = (day: string, index: number) => {
    const newSchedule = { ...currentSchedule };
    newSchedule[day].timeSlots.splice(index, 1);
    if (newSchedule[day].timeSlots.length === 0) {
      newSchedule[day].timeSlots = [{ ...DEFAULT_TIME_SLOT }];
    }
    onChange(newSchedule);
  };

  const handleTimeChange = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const newSchedule = { ...currentSchedule };
    newSchedule[day].timeSlots[index] = {
      ...newSchedule[day].timeSlots[index],
      [field]: value,
    };
    onChange(newSchedule);
  };

  const handleDayOpenChange = (day: string, isOpen: boolean) => {
    const newSchedule = {
      ...currentSchedule,
      [day]: {
        ...currentSchedule[day],
        isOpen,
        timeSlots: isOpen ? [{ ...DEFAULT_TIME_SLOT }] : [],
      },
    };

    onChange(newSchedule);
  };

  return (
    <div className="space-y-4">
      {DAYS.map((day) => (
        <ComponentCard key={day.id}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Label className="text-lg font-medium">{day.label}</Label>

              <Switch
                defaultChecked={currentSchedule[day.id].isOpen}
                onChange={(checked) => handleDayOpenChange(day.id, checked)}
                label={currentSchedule[day.id].isOpen ? "Aperto" : "Chiuso"}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddTimeSlot(day.id)}
              disabled={!currentSchedule[day.id].isOpen}
              className="flex items-center gap-2 text-black"
            >
              <PlusIcon />
              Aggiungi fascia oraria
            </Button>
          </div>
          {currentSchedule[day.id].isOpen && (
            <div className="space-y-3">
              {currentSchedule[day.id].timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="start">Apertura</Label>
                    <Input
                      className="[color-scheme:light]"
                      type="time"
                      value={slot.start}
                      onChange={(e) =>
                        handleTimeChange(day.id, index, "start", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="end">Chiusura</Label>
                    <Input
                      className="[color-scheme:light]"
                      type="time"
                      value={slot.end}
                      onChange={(e) =>
                        handleTimeChange(day.id, index, "end", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveTimeSlot(day.id, index)}
                    className="mt-6 text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
                    disabled={currentSchedule[day.id].timeSlots.length === 1}
                  >
                    <TrashBinIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ComponentCard>
      ))}
    </div>
  );
};

export default OpeningHours;
