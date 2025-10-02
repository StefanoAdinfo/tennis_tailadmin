import { useCalendar } from "~/calendar/contexts/calendar-context";

// Assicurati che il percorso sia corretto per il tuo componente Select standard
import Select from "~/components/form/Select";
// Avatar non è necessario per il componente Select generico, ma lo teniamo per riferimento
import Avatar from "~/components/ui/my_avatar/Avatar";

// Definizione del tipo Option (come nel tuo Select.tsx)
interface Option {
  value: string;
  label: string;
}

export function CourtSelect() {
  const { courts, selectedUserId, setSelectedUserId } = useCalendar();

  // 1. Definisci l'opzione speciale "Tutti"
  const allOption: Option = {
    value: "all",
    label: "Tutti",
  };

  // 2. Mappa l'array 'courts' nel formato Option[]
  const courtOptions: Option[] = courts.map((court) => ({
    // Usa l'ID come valore per la gestione dello stato
    value: court.id,
    // Usa il nome come etichetta da visualizzare
    label: court.name,
  }));

  // 3. Combina l'opzione "Tutti" con le opzioni dei campi
  const optionsCourts: Option[] = [allOption, ...courtOptions];

  // Nota: I tuoi commenti (SelectItem) indicano che stai cercando di mostrare
  // gli avatar nel menu a discesa. Il tuo componente Select generico non supporta
  // contenuti complessi (come gli Avatar) negli elementi del menu, ma solo testo.
  // Se vuoi gli Avatar, dovrai tornare alla Select di shadcn/ui con SelectItem personalizzati,
  // come mostrato nella mia risposta precedente, o espandere il tuo Select.tsx
  // per accettare un `renderOption` prop.

  // Usiamo il tuo Select generico per ora:
  return (
    <Select
      options={optionsCourts}
      placeholder="Seleziona un campo"
      className="dark:bg-dark-900"
      // Il valore predefinito dovrebbe essere gestito da useCalendar
      defaultValue={selectedUserId}
      // La funzione di callback
      onChange={setSelectedUserId}
    />
  );
}
