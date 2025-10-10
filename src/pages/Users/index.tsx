import ComponentCard from "../../components/common/ComponentCard";
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
import { Meta } from "~/lib/type";

export default function UsersIndex() {
  const token = import.meta.env.VITE_TOKEN;
  const [data, setData] = useState<any[]>([]);

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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Cognome",
        accessorKey: "surname",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Nome",
        accessorKey: "name",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Ruolo",
        accessorKey: "role",
        cell: (info: any) => info.getValue(),
        meta: {
          filterVariant: "select",
          filterOptions: [
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ],
        },
      },
      {
        header: "Attivo",
        accessorKey: "is_active",
        meta: {
          filterVariant: "select",
          filterOptions: [
            { value: "1", label: "Si" },
            { value: "0", label: "No" },
          ],
        },
        cell: (info: any) => {
          return (
            <Badge size="sm" color={info.getValue() ? "success" : "error"}>
              {info.getValue() ? "Si" : "No"}
            </Badge>
          );
        },
        columnCenter: true,
      },
      {
        id: "azioni",
        header: "Azioni",
        accessorKey: "id",
        cell: (info) => {
          const row = info.row.original;
          return (
            <Link to={`/utenti/${info.getValue()}`}>
              <Button
                variant="ghost"
                className="text-brand-500 dark:text-brand-400 hover:underline text-xs"
              >
                DETTAGLI
              </Button>
            </Link>
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

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/users?${params.toString()}&page=${page}`;

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
          <ComponentCard title="Tabella Utenti">
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
    </>
  );
}
