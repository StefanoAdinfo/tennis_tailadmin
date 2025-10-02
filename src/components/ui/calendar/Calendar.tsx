import { useEffect, memo } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Italian } from "flatpickr/dist/l10n/it";

import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
};

// Ho avvolto il componente in memo per l'ottimizzazione
function CalendarInline({ id, mode, onChange, defaultDate }: PropsType) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    const flatPickr = flatpickr(element, {
      mode: mode || "single",
      locale: Italian,
      static: true,
      inline: true,
      monthSelectorType: "static",
      dateFormat: "d-m-Y",
      defaultDate,
      onChange,
      minDate: "today",
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return <div id={id} />;
}

export default memo(CalendarInline);
