import { format, parseISO } from "date-fns";

import type { IEvent } from "~/calendar/interfaces";
import { ReservationSummaryModal } from "~/components/ui/modal/ReservationSummaryModal";

interface IProps {
  event: IEvent;
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

export function EventDetailsDialog({ event, open, setOpen }: IProps) {
  const startDateString = format(parseISO(event.startDate), "dd/MM/yyyy HH:mm");
  return (
    <ReservationSummaryModal
      startDate={startDateString}
      court_name={event.court.name}
      is_double={event.is_double}
      lights_cost={event.lights_cost}
      note={event.note}
      partecipants={event.partecipants}
      total_amount={event.total_amount}
      open={open}
      onOpenChange={setOpen}
    />
  );
}
