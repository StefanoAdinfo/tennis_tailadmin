import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import BasicTableRevenue from "../components/tables/BasicTables/BasicTableRevenue";
import TsTable from "~/components/tables/TanstackTable/TSTable";
import { Meta, Payment } from "~/lib/type";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ChevronDownIcon, ChevronRightIcon } from "~/icons";
import { format } from "date-fns";
import { Tooltip } from "react-tooltip";

type TData = {};

export default function Revenue() {
  const token = import.meta.env.VITE_TOKEN;
  const [data, setData] = useState<any[]>([]);

  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [openPayments, setOpenPayments] = useState(false);

  const handleOpenModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpenPayments(true);
  };

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </button>
          ) : (
            <span className="text-blue-500">●</span>
          );
        },
        enableSorting: false,
      },
      {
        header: "Data",
        accessorKey: "date",
        cell: (info: any) => {
          const dateValue = info.row.original.date;
          if (!dateValue) {
            return <div>-</div>;
          }
          const formattedDate = format(new Date(dateValue), "dd/MM/yyyy");
          return <div>{formattedDate}</div>;
        },
      },
      // {
      //   header: "Partite Saldate",
      //   accessorKey: "reservation",
      //   cell: (info: any) => {
      //     const firstReservation = info.row.original.reservation[0];
      //     return (
      //       <div>
      //         {/* {info.row.original.reservation.map((r) => (
      //           <div key={r.id}>
      //             {r.startDate} - {r.court.name} -{" "}
      //             {r.partecipants
      //               .map((p) => p.surname + " " + p.name[0] + ".")
      //               .join(" , ")}
      //             {" - "}
      //             {r.total_amount.toFixed(2) + " €"}
      //           </div>
      //         ))} */}
      //         <div key={firstReservation.id}>
      //           {firstReservation.startDate} - {firstReservation.court.name} -{" "}
      //           {firstReservation.partecipants
      //             .map((p) => p.surname + " " + p.name[0] + ".")
      //             .join(" , ")}
      //           {" - "}
      //           {firstReservation.total_amount.toFixed(2) + " €"}
      //           {info.row.original.reservation.length > 1 && (
      //             <span className="text-sm text-green-500">
      //               {"   "} +{info.row.original.reservation.length} ...
      //             </span>
      //           )}
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        header: "Utente",
        accessorKey: "user",
        cell: (info: any) => {
          return (
            <div>
              {info.row.original.user.surname} {info.row.original.user.name}
            </div>
          );
        },
      },
      {
        header: "Modalità di pagamento",
        accessorKey: "modalita_pagamento",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Stato",
        accessorKey: "state",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Operatore",
        accessorKey: "operator",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Totale",
        accessorKey: "amount",
        cell: (info: any) => {
          return info.row.original.amount.toFixed(2) + " €";
        },
      },
    ],
    []
  );

  const renderSubComponent = ({ row }: { row: Row<TData> }) => {
    return row.original.reservation_participant_payment ? (
      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] m-5">
        <div className="max-w-full">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Data
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Campo
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Partecipanti
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 "
                >
                  Totale
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {row.original.reservation_participant_payment.map((r) => {
                const numberOfPeople =
                  r.reservation_participant.reservation.number_of_people;
                return (
                  <TableRow key={r.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {format(
                        r.reservation_participant.reservation.start_time,
                        "dd-MM-yyyy"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {r.reservation_participant.reservation.court.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <>
                        <div
                          data-tooltip-id={`incassi-tooltip-${r.id}`}
                          className="flex -space-x-2 cursor-pointer"
                        >
                          {r.reservation_participant.reservation.reservation_participants.map(
                            (player, i) => {
                              if (i > numberOfPeople - 1) return null;
                              else
                                return (
                                  <div
                                    key={`player-${r.id}-${player.id}`}
                                    className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                                  >
                                    <img
                                      width={24}
                                      height={24}
                                      src={
                                        player.avatar ||
                                        "/images/user/default-avatar.svg"
                                      }
                                      alt={`player-${player.surname}`}
                                      className="w-full size-6 object-cover"
                                    />
                                  </div>
                                );
                            }
                          )}
                        </div>
                        <Tooltip id={`incassi-tooltip-${r.id}`}>
                          <div className="flex flex-col p-1 text-sm text-gray-700 dark:text-gray-200">
                            <strong className="mb-1">Partecipanti:</strong>
                            {r.reservation_participant.reservation.reservation_participants.map(
                              (partecipant, i) => {
                                if (i > numberOfPeople - 1) return null;
                                else
                                  return (
                                    <div
                                      key={`partecipantContent-${i}`}
                                      className="flex items-center gap-2 py-0.5 whitespace-nowrap"
                                    >
                                      <div className="w-5 h-5 overflow-hidden rounded-full flex-shrink-0">
                                        <img
                                          width={20}
                                          height={20}
                                          src={
                                            partecipant.avatar ||
                                            "/images/user/user-17.jpg"
                                          }
                                          alt={partecipant.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <span>{`${partecipant.surname}`}</span>
                                    </div>
                                  );
                              }
                            )}
                          </div>
                        </Tooltip>
                      </>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 ">
                      {r.reservation_participant.amount + " €"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    ) : null;
  };

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

      // Online
      // https://api.tennisclubottaviano.it/api/UsersTotUnpaid?page=1

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/payments?${params.toString()}&page=${page}`;

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

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard title="Incassi">
            <TsTable
              data={data}
              renderSubComponent={renderSubComponent}
              getRowCanExpand={() => true}
              columns={columns}
              sorting={sorting}
              setSorting={setSorting}
              pagination={pagination}
              setPagination={setPagination}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              pageCount={meta ? meta.last_page : 0}
              rowCount={meta ? meta.total : 0}
              perPage={meta ? meta.per_page : 0}
            />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
