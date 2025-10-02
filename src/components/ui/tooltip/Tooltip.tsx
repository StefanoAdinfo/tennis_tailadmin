import {
  RefObject,
  useLayoutEffect,
  useState,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------
// HOOK PER IL POSIZIONAMENTO ADATTIVO
// -----------------------------------------------------------------

interface PositionClasses {
  positionClasses: string;
}

function useTooltipPosition(
  ref: RefObject<HTMLElement>,
  isOpen: boolean
): PositionClasses {
  const [positionClasses, setPositionClasses] = useState<string>(
    "left-1/2 top-full mt-2 transform -translate-x-1/2" // Default: sotto
  );

  // useLayoutEffect per misurare il DOM prima che il browser disegni la pagina
  useLayoutEffect(() => {
    if (!isOpen || !ref.current) {
      return;
    }

    const triggerRect = ref.current.getBoundingClientRect();

    // Parametri del Tooltip
    // Si assume che il tooltip abbia w-64 (256px) e altezza max 200px
    const TOOLTIP_WIDTH = 256;
    const TOOLTIP_HEIGHT = 200;
    const TOOLTIP_MARGIN = 8;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;

    let position = "bottom";

    // 1. Logica Verticale (Priorità: Sotto, poi Sopra)
    if (
      spaceBelow < TOOLTIP_HEIGHT + TOOLTIP_MARGIN &&
      spaceAbove >= TOOLTIP_HEIGHT + TOOLTIP_MARGIN
    ) {
      position = "top";
    }

    // 2. Logica Orizzontale (per prevenire il taglio laterale)
    let horizontalClasses = "left-1/2 transform -translate-x-1/2"; // Centrato di default

    // Se il tooltip centrato a sinistra esce dalla finestra
    if (triggerRect.left < TOOLTIP_WIDTH / 2) {
      // Allinea a sinistra
      horizontalClasses = "left-0 transform-none";
    }
    // Se il tooltip centrato a destra esce dalla finestra
    else if (triggerRect.right + TOOLTIP_WIDTH / 2 > viewportWidth) {
      // Allinea a destra
      horizontalClasses = "right-0 transform-none";
    }

    // Combina le classi
    if (position === "bottom") {
      setPositionClasses(`${horizontalClasses} top-full mt-2`);
    } else {
      // top
      setPositionClasses(`${horizontalClasses} bottom-full mb-2`);
    }
  }, [isOpen, ref]);

  return { positionClasses };
}

// -----------------------------------------------------------------
// TOOLTIP COMPONENT
// -----------------------------------------------------------------

interface ITooltipProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode; // L'elemento che attiva il tooltip (es. EventBlock)
  children: ReactNode; // Il contenuto del tooltip
  open: boolean;
  setOpen: (open: boolean) => void;
  // Aggiungiamo un ritardo opzionale per la chiusura, ma sconsigliato
  closeDelay?: number;
}

export function Tooltip({
  trigger,
  children,
  open,
  setOpen,
  className,
  closeDelay = 50,
}: ITooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Usa l'hook per calcolare le classi di posizione
  const { positionClasses } = useTooltipPosition(triggerRef, open);

  // Gestisce la chiusura con un piccolo ritardo per permettere il movimento del mouse
  const handleMouseLeave = () => {
    setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  };

  // Funzione per mantenere aperto quando il mouse è sul trigger o sul tooltip
  const handleMouseEnter = () => setOpen(true);

  return (
    <div
      className="relative"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. TRIGGER */}
      <div className="w-full h-full">{trigger}</div>

      {/* 2. TOOLTIP */}
      {open && (
        <div
          // L'elemento contenitore del tooltip deve essere assoluto rispetto al genitore
          className={cn("absolute z-50", positionClasses)}
        >
          <div
            className={cn(
              "w-64 max-w-xs text-sm p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700/50 pointer-events-auto",
              className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
