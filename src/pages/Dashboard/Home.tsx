import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectGames from "../../components/tables/BasicTables/BasicTableCollectGames";
import BasicTableCollectUsers from "../../components/tables/BasicTables/BasicTableCollectUsers";
import BasicTableNextGame from "../../components/tables/BasicTables/BasicTableNextGame";
import DataCard from "~/components/ui/card/DataCard";
import { WalletMinimal, EuroIcon, CalendarPlus, CalendarOff } from "~/icons";
import TsTable from "~/components/tables/TanstackTable/TSTable";
import {
  PaginationState,
  ColumnFiltersState,
  SortingState,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import Badge from "~/components/ui/badge/Badge";
import { Link } from "react-router";
import Button from "~/components/ui/button/Button";
import { Meta, Payment } from "~/lib/type";
import { UserPayMatchModal } from "~/components/ui/modal/UserPayMatchModal";
import { differenceInMinutes, format } from "date-fns";
import { ReservationSummaryModal } from "~/components/ui/modal/ReservationSummaryModal";
import { Modal } from "~/components/ui/modal";
import Avatar from "~/components/ui/my_avatar/Avatar";
import { Tooltip } from "react-tooltip";

export default function Home() {
  const token = import.meta.env.VITE_TOKEN;

  //  Utenti da incassare
  const [data, setData] = useState<any[]>([]);

  const [meta, setMeta] = useState<Meta | null>(null);

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
        header: "Cognome",
        accessorKey: "last_name",
        cell: (info: any) => info.getValue(),
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Nome",
        accessorKey: "first_name",
        cell: (info: any) => info.getValue(),
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Totale",
        accessorKey: "total_amount",
        cell: (info: any) => {
          return info.row.original.total_amount + " €";
        },
        enableSorting: false,
        enableColumnFiltering: false,
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
        enableColumnFiltering: false,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
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

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/UsersTotUnpaid?${params.toString()}&page=${page}`;

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
        throw new Error("Si è verificato un errore sconosciuto.");
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

  // Admin Data

  const [adminData, setAdminData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/ReservationPartecipasntsAdminData`;

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
          setAdminData(result.data);
        } else {
          throw new Error("Risposta API non valida: mancano 'data' .");
        }
      } catch (e) {
        throw new Error("Si è verificato un errore sconosciuto.");
      }
    };

    fetchData();
  }, [token]);

  // --------------------------------- //

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

  const handleOpenModalPartite = (reservation: any) => {
    console.log(reservation);
    setSelectedReservations(reservation);
    setOpenReservations(true);
  };

  const [columnFiltersPartite, setColumnFiltersPartite] =
    React.useState<ColumnFiltersState>([]);
  const [sortingPartite, setSortingPartite] = React.useState<SortingState>([]);

  const columnsPartite = useMemo<ColumnDef<any>[]>(
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
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Campo",
        accessorKey: "court_name",
        cell: (info: any) => {
          return <div>{info.row.original.court.name}</div>;
        },
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Totale",
        accessorKey: "total_amount",
        cell: (info: any) => {
          return info.row.original.total_amount + " €";
        },
        enableSorting: false,
        enableColumnFiltering: false,
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
              onClick={() => handleOpenModalPartite(row)}
              className="text-green-500 hover:underline text-xs"
            >
              PAGA
            </Button>
          );
        },
        enableSorting: false,
        columnCenter: true,
        enableColumnFiltering: false,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const pagePartite = pagination.pageIndex + 1;

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
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/reservations`;

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
          const filteredData = result.data
            .filter(
              (partita: any) =>
                partita.reservation_participants.length > 0 &&
                partita.is_cancelled == 0
            )
            .splice(0, 5);

          setDataPartite(filteredData);
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

  // --------------------------------- //
  // Prossime partite

  const [dataProssimePartite, setDataProssimePartite] = useState<any[]>([]);

  const [metaProssimePartite, setMetaProssimePartite] = useState<Meta | null>(
    null
  );

  const [isOpenProssimaPartita, setIsOpenProssimaPartita] = useState(false);
  const [selectProssimaPartita, setSelecProssimaPartita] = useState<any | null>(
    null
  );
  const handleCloseModalProssimaPartita = () => {
    setIsOpenProssimaPartita(false);
  };

  const [paginationProssimePartite, setPaginationProssimePartite] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5,
    });

  const handleOpenModalProssimePartite = (reservation: any) => {
    setSelecProssimaPartita(reservation);
    setIsOpenProssimaPartita(true);
  };

  const [columnFiltersProssimePartite, setColumnFiltersProssimePartite] =
    React.useState<ColumnFiltersState>([]);
  const [sortingProssimePartite, setSortingProssimePartite] =
    React.useState<SortingState>([]);

  const columnsProssimePartite = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Utente",
        accessorKey: "user_name_surname",

        cell: (info: any) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar
                avatar={row.user.avatar || "/images/user/default-avatar.svg"}
                userName={row.user.name}
                userSurname={row.user.surname}
                size={40}
              />
              <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {row.user.name} {row.user.surname}
                </span>
              </div>
            </div>
          );
        },
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Partecipanti",
        accessorKey: "reservation_participants",
        cell: (info: any) => {
          const row = { ...info.row.original };
          if (row.reservation_participants.length > row.number_of_people) {
            row.reservation_participants.shift();
          }
          return (
            <>
              <div
                data-tooltip-id="prossime-partite-tooltip"
                className="flex -space-x-2 cursor-pointer"
              >
                {row.reservation_participants.map((player) => (
                  <div
                    key={`player-${player.id}`}
                    className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                  >
                    <img
                      width={24}
                      height={24}
                      src={player.avatar || "/images/user/default-avatar.svg"}
                      alt={`player-${player.surname}`}
                      className="w-full size-6 object-cover"
                    />
                  </div>
                ))}
              </div>
              <Tooltip id="prossime-partite-tooltip">
                <div className="flex flex-col p-1 text-sm text-gray-700 dark:text-gray-200">
                  <strong className="mb-1">Partecipanti:</strong>
                  {row.reservation_participants.map((partecipant, i) => (
                    <div
                      key={`partecipantContent-${i}`}
                      className="flex items-center gap-2 py-0.5 whitespace-nowrap"
                    >
                      <div className="w-5 h-5 overflow-hidden rounded-full flex-shrink-0">
                        <img
                          width={20}
                          height={20}
                          src={partecipant.avatar || "/images/user/user-17.jpg"}
                          alt={partecipant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{`${partecipant.surname}`}</span>
                    </div>
                  ))}
                </div>
              </Tooltip>
            </>
          );
        },
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Campo",
        accessorKey: "court_name",
        cell: (info: any) => {
          return <div>{info.row.original.court.name}</div>;
        },
        enableSorting: false,
        enableColumnFiltering: false,
      },
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
        enableSorting: false,
        enableColumnFiltering: false,
      },
      {
        header: "Durata",
        accessorKey: "end_time",
        cell: (info: any) => {
          const durationMinutes = differenceInMinutes(
            info.row.original.end_time,
            info.row.original.start_time
          );
          const hours = Math.floor(durationMinutes / 60);
          const minutes = durationMinutes % 60;

          const durationString =
            (hours > 0 ? `${hours}h` : "") +
            (hours > 0 && minutes > 0 ? " " : "") +
            (minutes > 0 ? `${minutes}m` : "");

          const duration = durationString || "0m";
          return <div>{duration}</div>;
        },
        enableSorting: false,
        columnCenter: true,
        enableColumnFiltering: false,
      },
      {
        header: "Luci",
        accessorKey: "lights_cost",
        cell: (info: any) => {
          const light = Number(info.row.original.lights_cost);

          return (
            <Badge size="sm" color={light ? "success" : "error"}>
              {light ? "Si" : "No"}
            </Badge>
          );
        },
        enableSorting: false,
        columnCenter: true,
        enableColumnFiltering: false,
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
              onClick={() => handleOpenModalProssimePartite(row)}
              className="text-red-500 hover:underline text-xs"
            >
              ANNULLA
            </Button>
          );
        },
        enableSorting: false,
        columnCenter: true,
        enableColumnFiltering: false,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const pageProssimePartite = pagination.pageIndex + 1;

      const paramsProssimePartite = new URLSearchParams();
      columnFiltersProssimePartite.forEach((filter) => {
        paramsProssimePartite.append(filter.id, filter.value as any);
      });
      sortingProssimePartite.forEach((sort) => {
        const paramName = `sort[${sort.id}]`;
        const paramValue = sort.desc ? "desc" : "asc";
        paramsProssimePartite.append(paramName, paramValue);
      });

      // const apiUrl = `${import.meta.env.VITE_API_URL}/api/reservation?${paramsProssimePartite.toString()}&page=${pageProssimePartite}`;
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/next5`;

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
          const filteredData = result.data
            .filter(
              (partita: any) =>
                partita.reservation_participants.length > 0 &&
                partita.is_cancelled == 0
            )
            .splice(0, 5);

          setDataProssimePartite(filteredData);
        } else {
          throw new Error("Risposta API non valida: mancano 'data' o 'meta'.");
        }
      } catch (e) {
        throw new Error("Si è verificato un errore sconosciuto.");
      }
    };

    fetchData();
  }, [
    paginationProssimePartite.pageIndex,
    paginationProssimePartite.pageSize,
    columnFiltersProssimePartite,
    sortingProssimePartite,
    token,
  ]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 ">
          {/* <EcommerceMetrics /> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            <DataCard
              icon={<WalletMinimal />}
              title={"Totale Incassato"}
              result={adminData.total_paid + " €"}
              badgeStatus={"success"}
              percentage={11.01}
              bgIcon="bg-yellow-200 dark:bg-yellow-600"
            />
            <DataCard
              icon={<EuroIcon />}
              title={"Totale da incassare"}
              result={adminData.total_unpaid + " €"}
              badgeStatus={"error"}
              percentage={1.01}
              bgIcon="bg-blue-200 dark:bg-blue-800"
            />
            <DataCard
              icon={<CalendarPlus />}
              title={"Totale Partite"}
              result={adminData.total_reservations}
              badgeStatus={"success"}
              percentage={8.01}
              bgIcon="bg-green-200 dark:bg-green-800"
            />
            <DataCard
              icon={<CalendarOff />}
              title={"Partite Annullate"}
              result={adminData.total_cancelled_reservation}
              badgeStatus={"error"}
              percentage={3.01}
              bgIcon="bg-red-200 dark:bg-red-800"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 space-y-6">
          <ComponentCard
            title="Partite da incassare"
            buttonShow
            to="/partite-da-incassare"
          >
            {/* <BasicTableCollectGames /> */}
            <TsTable
              data={dataPartite}
              columns={columnsPartite}
              sorting={sortingPartite}
              setSorting={setSortingPartite}
              pagination={paginationPartite}
              setPagination={setPaginationPartite}
              columnFilters={columnFiltersPartite}
              setColumnFilters={setColumnFiltersPartite}
              pageCount={metaPartite ? metaPartite.last_page : 0}
              rowCount={metaPartite ? metaPartite.total : 0}
              perPage={metaPartite ? metaPartite.per_page : 5}
            />
          </ComponentCard>
        </div>

        <div className="col-span-12 md:col-span-6 space-y-6">
          <ComponentCard
            title="Utenti da incassare"
            buttonShow
            to="/utenti-da-incassare"
          >
            {/* <BasicTableCollectUsers /> */}
            <TsTable
              data={data}
              columns={columns}
              sorting={sorting}
              setSorting={setSorting}
              pagination={pagination}
              setPagination={setPagination}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              pageCount={meta ? meta.last_page : 0}
              rowCount={meta ? meta.total : 0}
              perPage={meta ? meta.per_page : 5}
            />
          </ComponentCard>
        </div>

        <div className="col-span-12 space-y-6">
          <ComponentCard
            title="Prossime partite"
            buttonShow
            to="/calendario"
            buttonText="Calendario"
          >
            <TsTable
              data={dataProssimePartite}
              columns={columnsProssimePartite}
              sorting={sortingProssimePartite}
              setSorting={setSortingProssimePartite}
              pagination={paginationProssimePartite}
              setPagination={setPaginationProssimePartite}
              columnFilters={columnFiltersProssimePartite}
              setColumnFilters={setColumnFiltersProssimePartite}
              pageCount={
                metaProssimePartite ? metaProssimePartite.last_page : 0
              }
              rowCount={metaProssimePartite ? metaProssimePartite.total : 0}
              perPage={metaProssimePartite ? metaProssimePartite.per_page : 5}
            />
          </ComponentCard>
        </div>
      </div>
      {/* Partite */}
      <ReservationSummaryModal
        open={openReservations}
        onOpenChange={setOpenReservations}
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
      {/* Utenti */}
      <UserPayMatchModal
        open={openPayments}
        onOpenChange={setOpenPayments}
        reservation={selectedPayment?.reservation || []}
        id={selectedPayment?.id || ""}
        name={selectedPayment?.name || ""}
        surname={selectedPayment?.surname || ""}
        total_amount={selectedPayment?.total_amount || 0}
      />
      {/* Prossime partite */}
      <Modal
        isOpen={isOpenProssimaPartita}
        onClose={handleCloseModalProssimaPartita}
        className="max-w-lg p-6"
      >
        <h5 className="text-lg font-medium text-gray-800 dark:text-white/90 my-2">
          Sei sicuro di voler annullare questa partita?
        </h5>
        {/* <p className="mt-4 text-sm leading-normal text-gray-500 dark:text-gray-400">
          Data: {selectProssimaPartita?.start_time}
        </p>
        <p className="mt-1 text-sm leading-normal text-gray-500 dark:text-gray-400">
          Durata: {selectProssimaPartita?.duration}
        </p>
        <p className="mt-4 text-sm leading-normal text-gray-500 dark:text-gray-400">
          Campo: {selectProssimaPartita?.court_name}
        </p>
        <p className="max-w-xs mt-1 text-sm leading-normal text-gray-500 dark:text-gray-400">
          {" "}
          Partecipanti:{" "}
          {selectProssimaPartita?.reservation_participants
            .map((partecipant) => partecipant.surname)
            .join(", ")}
        </p> */}

        <div className="mt-6 flex justify-end ">
          <Button onClick={handleCloseModalProssimaPartita} variant="danger">
            Annulla partita
          </Button>
        </div>
      </Modal>
    </>
  );
}
