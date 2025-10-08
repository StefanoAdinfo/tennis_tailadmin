import Button from "~/components/ui/button/Button";

interface PaginationProps {
  table: any;
  pageCount: number;
  rowCount: number;
}

export default function Pagination({
  table,
  pageCount,
  rowCount,
}: PaginationProps) {
  return (
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
  );
}
