// types.ts o all'inizio del file FilterableTable.tsx

// Tipi per i filtri disponibili
export type FilterType = "text" | "number" | "select" | "none";

// Tipo per la configurazione di una singola colonna
export interface ColumnConfig<T> {
  // La chiave nel tuo oggetto dati (es. 'surname', 'total_amount')
  key: keyof T;
  // Etichetta visualizzata nell'header
  label: string;
  // Opzionale: se il campo è ordinabile
  sortable?: boolean;
  // Opzionale: se il campo ha un filtro, e di che tipo
  filterType?: FilterType;
  // Opzionale: per le celle che necessitano di formattazione speciale (es. €)
  render?: (item: T) => React.ReactNode;
  // Opzionale: per le colonne Select (se filterType è 'select')
  filterOptions?: { value: string | number; label: string }[];
  // Opzionale: per le azioni (es. il bottone HandCoins)
  isAction?: boolean;
}

// Tipo per la configurazione del sorting
export interface SortConfig<T> {
  column: keyof T | null;
  direction: "asc" | "desc" | null;
}

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

// --- Componente SortIndicator (compatto) ---
const SortIndicator = ({ direction }: { direction: "asc" | "desc" | null }) => {
  const isAsc = direction === "asc";
  const isDesc = direction === "desc";

  return (
    <div className="flex flex-col ml-1.5 justify-center text-xs">
      <span
        className={`leading-[0.5] ${isAsc ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600 opacity-40"}`}
      >
        ▲
      </span>
      <span
        className={`leading-[0.5] mt-1.5 ${isDesc ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600 opacity-40"}`}
      >
        ▼
      </span>
    </div>
  );
};

// --- Componente per i Filtri (Input, Select, ecc.) ---
const FilterInput = ({
  filterType,
  value,
  onChange,
  placeholder,
  options,
}: any) => {
  const baseClass =
    "w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white dark:placeholder-gray-400";

  if (filterType === "select") {
    return (
      <select value={value} onChange={onChange} className={baseClass}>
        <option value="">{placeholder}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (filterType === "number") {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={baseClass}
      />
    );
  }

  // Default: type 'text'
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={baseClass}
    />
  );
};

// =========================================================================
//                  COMPONENTA PRINCIPALE: FilterableTable
// =========================================================================

export function FilterableTable<T>({
  data,
  columns,
  pageSize = 10,
}: {
  data: T[];
  columns: ColumnConfig<T>[];
  pageSize?: number;
}) {
  // Stato per i filtri: usiamo un oggetto Map<keyof T, string>
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Stato per il sorting
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    column: null,
    direction: null,
  });

  // Funzione per aggiornare un singolo filtro
  const handleFilterChange = (key: keyof T, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key as string]: value,
    }));
  };

  // Funzione per gestire il cambio di sorting
  const requestSort = (column: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.column === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (
      sortConfig.column === column &&
      sortConfig.direction === "desc"
    ) {
      setSortConfig({ column: null, direction: null });
      return;
    }
    setSortConfig({ column, direction });
  };

  // LOGICA DI FILTRO E SORTING centralizzata
  const sortedAndFilteredData = useMemo(() => {
    let currentData = [...data];

    // 1. FILTRAGGIO
    currentData = currentData.filter((item) => {
      return columns.every((col) => {
        const filterValue = filters[col.key as string];
        if (!filterValue || col.filterType === "none" || col.isAction) {
          return true; // Nessun filtro o filtro disabilitato
        }

        const itemValue = item[col.key];

        // Gestione filtro 'text' (inclusione parziale)
        if (typeof itemValue === "string") {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }

        // Gestione filtro 'number' (ricerca su stringa del numero per semplicità)
        if (typeof itemValue === "number") {
          return String(itemValue).includes(filterValue.replace(",", "."));
        }

        // Gestione filtro 'select'
        if (col.filterType === "select") {
          return String(itemValue) === filterValue;
        }

        return true;
      });
    });

    // 2. SORTING
    if (sortConfig.column && sortConfig.direction) {
      currentData.sort((a, b) => {
        const aValue = a[sortConfig.column!];
        const bValue = b[sortConfig.column!];

        // Determina se è numerico (usando la colonna originale)
        const isNumeric =
          typeof aValue === "number" && typeof bValue === "number";

        if (aValue === bValue) return 0;

        let comparison = 0;

        if (isNumeric) {
          comparison = aValue > bValue ? 1 : -1;
        } else {
          // Tratta come stringa per ordinamento alfabetico
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return currentData;
  }, [data, columns, filters, sortConfig]);

  // Componente interno per l'Header cliccabile
  const SortableHeader = ({ config }: { config: ColumnConfig<T> }) => {
    const isCurrent = sortConfig.column === config.key;
    const direction = isCurrent ? sortConfig.direction : null;

    if (config.sortable) {
      return (
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          <div
            onClick={() => requestSort(config.key)}
            className="flex items-center cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-white/[0.08] transition-colors duration-150 -mx-5 -my-3 px-5 py-3"
          >
            {config.label}
            <SortIndicator direction={direction} />
          </div>
        </TableCell>
      );
    }

    // Header non sortabile
    return (
      <TableCell
        isHeader
        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
      >
        {config.label}
      </TableCell>
    );
  };

  // Totale colonne, incluso l'indice (per colSpan)
  const totalColumns = columns.length;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Riga 1: Intestazioni (Cliccabili/Sortabili) */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <SortableHeader key={col.key as string} config={col} />
              ))}
            </TableRow>
          </TableHeader>

          {/* Riga 2: Filtri */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={`filter-${col.key as string}`}
                  className="px-4 py-3 text-start"
                >
                  {col.filterType && col.filterType !== "none" ? (
                    <FilterInput
                      filterType={col.filterType}
                      placeholder={`Filtra ${col.label}`}
                      value={filters[col.key as string] || ""}
                      onChange={(e: { target: { value: string } }) =>
                        handleFilterChange(col.key, e.target.value)
                      }
                      options={col.filterOptions}
                    />
                  ) : (
                    // Cella vuota se non c'è filtro o se è una colonna Azione
                    <div className="h-full"></div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body - Dati filtrati e ordinati */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {sortedAndFilteredData.map((item, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell
                    key={`${col.key as string}-${index}`}
                    className={`px-4 py-3 text-gray-900 text-theme-sm dark:text-white ${col.isAction ? "text-end" : "text-start"}`}
                  >
                    {/* Usa la funzione render custom se disponibile, altrimenti usa il valore diretto */}
                    {col.render
                      ? col.render(item)
                      : (item[col.key] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {sortedAndFilteredData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={totalColumns} // Usa il numero totale di colonne
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Nessun risultato trovato.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Footer per i totali */}
      <div className="flex justify-end items-center p-4 border-t border-gray-100 dark:border-white/[0.05] text-sm text-gray-500 dark:text-gray-400">
        <div className="font-medium text-gray-900 dark:text-white">
          Totali Trovati: {sortedAndFilteredData.length}
        </div>
        <div className="flex justify-between items-center p-4 border-t border-gray-100 dark:border-white/[0.05] text-sm text-gray-500 dark:text-gray-400">
          <div className="font-medium text-gray-900 dark:text-white">
            Totali: {sortedAndFilteredData.length}
          </div>
          <div className="flex items-center space-x-2">
            <button
              aria-label="Pagina precedente"
              className="p-2 rounded-lg border border-gray-300 dark:border-white/[0.1]"
            >
              «
            </button>
            <span className="font-medium text-gray-900 dark:text-white">
              Pagina 1 di 1
            </span>
            <button
              aria-label="Pagina successiva"
              className="p-2 rounded-lg border border-gray-300 dark:border-white/[0.1]"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
