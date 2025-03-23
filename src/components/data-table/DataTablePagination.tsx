import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex justify-between items-center mt-4 text-gray-800">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="bg-green-200 px-4 py-2 rounded disabled:opacity-50 transition"
      >
        السابق
      </button>
      <span>
        صفحة {table.getState().pagination.pageIndex + 1} من{" "}
        {table.getPageCount()}
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="bg-green-200 px-4 py-2 rounded disabled:opacity-50 transition"
      >
        التالي
      </button>
    </div>
  );
};
