import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import Filter from "./Filter";
import Pagination from "./Pagination";
import { Fragment } from "react/jsx-runtime";

type TData = {};

interface TsTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  pageCount: number; // Numero totale di pagine dal server (meta.last_page)
  rowCount: number; // Numero totale di righe dal server (meta.total_amount)
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  perPage?: number;
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
  perPage,
  renderSubComponent,
  getRowCanExpand,
}: TsTableProps) {
  const table = useReactTable({
    columns,
    data,
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
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
      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full">
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
                        className="px-4 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 "
                      >
                        <div
                          {...{
                            // Abilita il cursore e l'interazione solo se la colonna è ordinabile
                            className: `flex items-center gap-4  ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none mb-3"
                                : ""
                            }${
                              header.column.columnDef.columnCenter !=
                                undefined &&
                              header.column.columnDef.columnCenter
                                ? " justify-center"
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
                          {header.column.columnDef.enableSorting != undefined &&
                          !header.column.columnDef.enableSorting ? null : (
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
                          )}
                        </div>
                        {header.column.getCanFilter() &&
                          header.column.columnDef.enableColumnFiltering !==
                            false && (
                            <div className="mt-2">
                              <Filter column={header.column} />
                            </div>
                          )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {table.getRowModel().rows.map((row) => {
                return (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            className={`${
                              cell.column.columnDef.columnCenter != undefined &&
                              cell.column.columnDef.columnCenter
                                ? "text-center "
                                : ""
                            }px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400`}
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
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={row.getVisibleCells().length}>
                          {renderSubComponent({ row })}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      {rowCount >= perPage && (
        <Pagination table={table} pageCount={pageCount} rowCount={rowCount} />
      )}
    </>
  );
}
