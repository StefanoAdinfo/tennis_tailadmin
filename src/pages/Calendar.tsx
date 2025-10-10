import { ClientContainer } from "~/calendar/components/client-container";
import { Separator } from "../components/ui/separator/Separator";
import { useCalendar } from "~/calendar/contexts/calendar-context";

export default function Calendario() {
  const { viewCalendar } = useCalendar();
  return <ClientContainer view={viewCalendar} />;
}
