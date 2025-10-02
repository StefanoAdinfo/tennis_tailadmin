import { ClientContainer } from "~/calendar/components/client-container";
import { Separator } from "../components/ui/separator/Separator";

export default function Calendario() {
  // const { viewCalendar } = useCalendar();
  return (
    <>
      <ClientContainer view={"week"} />
    </>
  );
}
