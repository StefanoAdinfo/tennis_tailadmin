import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectUsers from "../../components/tables/BasicTables/BasicTableCollectUsers";
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

export default function UsersCollect() {
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
        header: "Cognome",
        accessorKey: "last_name",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Nome",
        accessorKey: "first_name",
        cell: (info: any) => info.getValue(),
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
          <ComponentCard>
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
              perPage={meta ? meta.per_page : 0}
            />
          </ComponentCard>
        </div>
      </div>
      <UserPayMatchModal
        open={openPayments}
        onOpenChange={setOpenPayments}
        reservation={selectedPayment?.reservation || []}
        id={selectedPayment?.user_id || ""}
        name={selectedPayment?.name || ""}
        surname={selectedPayment?.surname || ""}
        total_amount={selectedPayment?.total_amount || 0}
      />
    </>
  );
}
