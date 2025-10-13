import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Input from "~/components/form/input/InputField";
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from "~/icons";
import Button from "~/components/ui/button/Button";
import Select from "~/components/form/Select";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

interface Person {
  user_id: string;
  surname: string;
  total_amount: number;
}

interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface MyTableProps {
  data: Person[];
  columns: ColumnDef<Person>[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pageCount: number; // Numero totale di pagine dal server (meta.last_page)
  rowCount: number; // Numero totale di righe dal server (meta.total_amount)
}

export default function TanstackTableUser() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS50ZW5uaXNjbHVib3R0YXZpYW5vLml0L2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzU5OTMwNzQwLCJleHAiOjE3NTk5MzQzNDAsIm5iZiI6MTc1OTkzMDc0MCwianRpIjoib055NHdpWmgxcHhpWWUxbyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJzLmRhbmllbGxvQGFkaW5mby5pdCJ9.JDYeGaBHFe7DqFLE_Z9XHv47I3SUenf91Ol2NcqdkdI";
  const [data, setData] = useState<Person[]>([]);

  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: "ID Utente",
        accessorKey: "user_id",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Cognome",
        accessorKey: "surname",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Totale",
        accessorKey: "total_amount",
        cell: (info: any) => `${info.getValue()} €`,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      const page = pagination.pageIndex + 1;

      const params = new URLSearchParams();
      columnFilters.forEach((filter) => {
        params.append(filter.id, filter.value as any);
      });
      sorting.forEach((sort) => {
        const paramName = `sort[${sort.id}]`;
        const paramValue = sort.desc ? "desc" : "asc";
        params.append(paramName, paramValue);
      });

      console.log(params.toString());

      const apiUrl = `https://api.tennisclubottaviano.it/api/users?${params.toString()}&page=${page}`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Errore: ${response.status} durante il fetch dei dati`
          );
        }

        const result = await response.json();

        if (result.data && result.meta) {
          setData(result.data);
          setMeta(result.meta);

          setPagination((prev) => ({
            ...prev,
            pageIndex: result.meta.current_page - 1,
            pageSize: result.meta.per_page,
          }));
        } else {
          throw new Error("Risposta API non valida: mancano 'data' o 'meta'.");
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Si è verificato un errore sconosciuto.");
        }
      }
    };

    fetchData();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    columnFilters,
    sorting,
    token,
  ]);

  console.log(sorting);

  return (
    <div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md mb-4"
          role="alert"
        >
          <p className="font-bold">Errore di Caricamento Dati:</p>
          <p>{error}</p>
        </div>
      )}

      {meta && (
        <MyTable
          data={data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
          sorting={sorting}
          columnFilters={columnFilters}
          pageCount={meta.last_page} // Totale pagine dal server
          rowCount={meta.total} // Totale righe dal server
        />
      )}

      {!meta && !error && (
        <div className="text-gray-500 dark:text-gray-400">
          In attesa dei dati...
        </div>
      )}
    </div>
  );
}

function MyTable({
  data,
  columns,
  pagination,
  setColumnFilters,
  columnFilters,
  setPagination,
  pageCount,
  setSorting,
  sorting,
  rowCount,
}: MyTableProps) {
  const table = useReactTable({
    columns,
    data,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    manualSorting: true,
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,

    onPaginationChange: setPagination,
    manualPagination: true, // Indica che la paginazione è gestita esternamente
    pageCount, // Indica il numero totale di pagine (necessario per disabilitare i pulsanti)
    state: {
      pagination,
      columnFilters,
      sorting,
    },
  });

  console.log(columnFilters);
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell
                        key={header.id}
                        colSpan={header.colSpan}
                        isHeader
                        className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        <div
                          {...{
                            // Abilita il cursore e l'interazione solo se la colonna è ordinabile
                            className: `flex items-center gap-4 mb-3 ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }`,
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {/* Titolo della Colonna */}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          <div className="flex flex-col justify-center text-sm gap-0.5">
                            {header.column.getIsSorted() === false && (
                              <ArrowUpDown className="text-gray-400 dark:text-gray-600 opacity-40" />
                            )}
                            {header.column.getIsSorted() === "asc" && (
                              <ArrowUpIcon className="text-gray-900 dark:text-white size-3" />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <ArrowDownIcon className="text-gray-900 dark:text-white size-3" />
                            )}
                          </div>
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="mt-2">
                            {/* <Filter column={header.column} table={table} /> */}
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="h-2" />
      <div className="flex items-center justify-between gap-2">
        <div className="text-theme-sm text-gray-500 dark:text-gray-400">
          Risultati:{" "}
          <strong className="text-gray-900 dark:text-white">
            {rowCount.toLocaleString()}
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="py-1!"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="py-1!"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>

          <span className="flex items-center gap-1 text-theme-sm text-gray-500 dark:text-gray-400">
            <div>Pagina</div>
            <strong className="text-gray-900 dark:text-white">
              {table.getState().pagination.pageIndex + 1} di{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>

          <Button
            variant="outline"
            size="sm"
            className="py-1!"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="py-1!"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const optionsProva = [
    { value: "", label: "Tutti" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const handleSelectChange = (value: string) => {
    column.setFilterValue(value);
  };

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        <Input
          className="text-theme-sm p-2! h-9!"
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder={`Min`}
        />
        <Input
          className="text-theme-sm p-2! h-9!"
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder={`Max`}
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <Select
      onChange={handleSelectChange}
      defaultValue={columnFilterValue?.toString()}
      options={optionsProva}
      placeholder="Seleziona un opzione"
      className="dark:bg-dark-900"
    />
  ) : (
    <Input
      className="text-theme-sm p-2! h-9!"
      onChange={(e) => column.setFilterValue(e.target.value)}
      // onClick={(e) => e.stopPropagation()}
      placeholder={`Cerca...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
