import { useEffect, useMemo, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectGames from "../../components/tables/BasicTables/BasicTableCollectGames";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Meta } from "~/lib/type";
import React from "react";
import { format } from "date-fns";
import Button from "~/components/ui/button/Button";
import TsTable from "~/components/tables/TanstackTable/TSTable";
import { ReservationSummaryModal } from "~/components/ui/modal/ReservationSummaryModal";

export default function ReservationCollect() {
  const token = import.meta.env.VITE_TOKEN;

  // Partite da incassare

  const [dataPartite, setDataPartite] = useState<any[]>([]);

  const [metaPartite, setMetaPartite] = useState<Meta | null>(null);

  const [paginationPartite, setPaginationPartite] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [selectedReservations, setSelectedReservations] = useState<any | null>(
    null
  );
  const [openReservations, setOpenReservations] = useState(false);

  const handleOpenModal = (reservation: any) => {
    console.log("Selected reservation:", reservation);
    setSelectedReservations(reservation);
    setOpenReservations(true);
  };

  const [columnFiltersPartite, setColumnFiltersPartite] =
    React.useState<ColumnFiltersState>([]);
  const [sortingPartite, setSortingPartite] = React.useState<SortingState>([]);

  const columnsParite = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Data",
        accessorKey: "start_time",
        cell: (info: any) => {
          const formattedDate = format(
            info.row.original.start_time,
            "dd/MM/yyyy - HH:mm"
          );
          return <div>{formattedDate}</div>;
        },
      },
      {
        header: "Campo",
        accessorKey: "court_name",
        cell: (info: any) => {
          return <div>{info.row.original.court.name}</div>;
        },
      },
      {
        header: "Totale",
        accessorKey: "total_amount",
        cell: (info: any) => {
          return info.row.original.total_amount + " €";
        },
      },
      {
        id: "azioni",
        header: "Azioni",
        accessorKey: "id",
        cell: (info) => {
          const row = info.row.original;
          return (
            <Button
              variant="ghost"
              onClick={() => handleOpenModal(row)}
              className="text-green-500 hover:underline text-xs"
            >
              PAGA
            </Button>
          );
        },
        enableSorting: false,
        columnCenter: true,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const pagePartite = paginationPartite.pageIndex + 1;

      const paramsPartite = new URLSearchParams();
      columnFiltersPartite.forEach((filter) => {
        paramsPartite.append(filter.id, filter.value as any);
      });
      sortingPartite.forEach((sort) => {
        const paramName = `sort[${sort.id}]`;
        const paramValue = sort.desc ? "desc" : "asc";
        paramsPartite.append(paramName, paramValue);
      });

      // const apiUrl = `${import.meta.env.VITE_API_URL}/api/reservation?${paramsPartite.toString()}&page=${pagePartite}`;
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/reservations?${paramsPartite.toString()}`;

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

        if (result.data) {
          // const filteredData = result.data
          //   .filter(
          //     (partita: any) => partita.reservation_participants.length > 0
          //   )
          //   .splice(0, 5);

          // console.log(filteredData);

          setDataPartite(result.data);
          setMetaPartite(result.meta);

          // setPaginationPartite((prev) => ({
          //   ...prev,
          //   pageIndex: result.meta.current_page - 1,
          //   pageSize: result.meta.per_page,
          // }));
        } else {
          throw new Error("Risposta API non valida: mancano 'data' o 'meta'.");
        }
      } catch (e) {
        throw new Error("Si è verificato un errore sconosciuto.");
      }
    };

    fetchData();
  }, [
    paginationPartite.pageIndex,
    paginationPartite.pageSize,
    columnFiltersPartite,
    sortingPartite,
    token,
  ]);
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard>
            <TsTable
              data={dataPartite}
              columns={columnsParite}
              sorting={sortingPartite}
              setSorting={setSortingPartite}
              pagination={paginationPartite}
              setPagination={setPaginationPartite}
              columnFilters={columnFiltersPartite}
              setColumnFilters={setColumnFiltersPartite}
              pageCount={metaPartite ? metaPartite.last_page : 0}
              rowCount={metaPartite ? metaPartite.total : 0}
              perPage={metaPartite ? metaPartite.per_page : 0}
            />
            {/* <BasicTableCollectGames /> */}
          </ComponentCard>
        </div>
      </div>
      <ReservationSummaryModal
        open={openReservations}
        onOpenChange={setOpenReservations}
        id={selectedReservations?.id || ""}
        startDate={
          selectedReservations?.start_time
            ? format(selectedReservations?.start_time, "dd/MM/yyyy - HH:mm")
            : ""
        }
        court_name={selectedReservations?.court.name || ""}
        is_double={selectedReservations?.is_double || false}
        lights_cost={selectedReservations?.lights_cost || 0}
        note={selectedReservations?.reservation_note || ""}
        partecipants={selectedReservations?.reservation_participants || []}
        total_amount={selectedReservations?.total_amount || 0}
      />
    </>
  );
}
