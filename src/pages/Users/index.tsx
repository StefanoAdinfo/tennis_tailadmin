import TanstackTableUser from "~/components/tables/TanstackTable/TanstackTableUser";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableUsers from "../../components/tables/BasicTables/BasicTableUsers";
import TsTable from "~/components/tables/TanstackTable/TSTable";
import {
  PaginationState,
  ColumnFiltersState,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import Badge from "~/components/ui/badge/Badge";
import { Link } from "react-router";
import Button from "~/components/ui/button/Button";

interface Person {
  surname: string;
  name: string;
  email: string;
  role: string;
  is_active: string;
}

interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function UsersIndex() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS50ZW5uaXNjbHVib3R0YXZpYW5vLml0L2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzU5OTM4MzcyLCJleHAiOjE3NTk5NDE5NzIsIm5iZiI6MTc1OTkzODM3MiwianRpIjoiN0k5MHZFdWpwY2JHaFRNRyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJzLmRhbmllbGxvQGFkaW5mby5pdCJ9.sOQ-oq4ceN1vPmvsVM_y0j_astjoMQUggHB1rzr9wyQ";
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
            />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
