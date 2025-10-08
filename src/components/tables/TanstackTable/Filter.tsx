import { Column } from "@tanstack/react-table";

import Input from "~/components/form/input/InputField";
import Select from "~/components/form/Select";

export default function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  console.log(column.id);

  const handleSelectChange = (value: string) => {
    column.setFilterValue(value);
  };

  if (column.id === "azioni") return <div className="h-9"></div>;

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
      className="text-theme-sm p-2! h-9! dark:bg-dark-900"
      onChange={handleSelectChange}
      defaultValue={columnFilterValue?.toString()}
      options={column.columnDef.meta ? column.columnDef.meta.filterOptions : []}
      placeholder="Seleziona un opzione"
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
