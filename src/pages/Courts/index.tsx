import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCourts from "../../components/tables/BasicTables/BasicTableCourts";
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

export default function Revenue() {
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

  function getCourtTypeLabel(courtType: string): string {
    switch (courtType) {
      case "terra_rossa":
        return "Terra Rossa";
      default:
        return courtType;
    }
  }

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Nome",
        accessorKey: "name",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Locazione",
        accessorKey: "location",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Tipologia",
        accessorKey: "court_type",
        meta: {
          filterVariant: "select",
          filterOptions: [{ value: "terra_rossa", label: "Terra Rossa" }],
        },
        cell: (info: any) => getCourtTypeLabel(info.getValue()),
      },
      {
        header: "Attivo",
        accessorKey: "active",
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
            <Link to={`/campi/${info.getValue()}`}>
              <Button
                variant="ghost"
                className="text-yellow-600 dark:text-yellow-500 hover:underline text-xs"
              >
                MODIFICA
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

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/courts?${params.toString()}&page=${page}`;

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
          <ComponentCard
            title="Tabella Campi"
            buttonShow
            to="/campi/creazione"
            buttonText="Aggiungi campo"
          >
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
