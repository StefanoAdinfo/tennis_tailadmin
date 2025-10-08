import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
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
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from "~/icons";
import Button from "~/components/ui/button/Button";
import Filter from "./Filter";

interface MyTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pageCount: number; // Numero totale di pagine dal server (meta.last_page)
  rowCount: number; // Numero totale di righe dal server (meta.total_amount)
}

export default function TsTable({
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
