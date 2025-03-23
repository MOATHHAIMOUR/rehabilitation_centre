import React, { useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Task, columns } from "../../../../components/data-table/Columns";
import { DataTable } from "../../../../components/data-table/DataTable";
import DataTableFilter from "../../../../components/data-table/DataTableFilter";

const tasks: Task[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `TASK-${1000 + i}`,
  status: ["Pending", "In Progress", "Completed"][i % 3], // Rotates statuses
}));

const RoleManagement: React.FC = () => {
  // const [globalFilter, setGlobalFilter] = useState(""); // ✅ Search input state
  // const [pageSize, setPageSize] = useState(5); // ✅ Default page size

  // const table = useReactTable({
  //   data: tasks,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getSortedRowModel: getSortedRowModel(), // ✅ Enables sorting
  //   getFilteredRowModel: getFilteredRowModel(), // ✅ Enables filtering
  //   getPaginationRowModel: getPaginationRowModel(), // ✅ Enables Pagination

  //   state: {
  //     globalFilter, // ✅ Sync filter input with the table
  //     pagination: {
  //       pageIndex: 0, // Always start from first page
  //       pageSize: pageSize, // ✅ Controlled page size
  //     },
  //   },
  //   onPaginationChange: (updater) => {
  //     const newState =
  //       typeof updater === "function"
  //         ? updater(table.getState().pagination)
  //         : updater;
  //     setPageSize(newState.pageSize);
  //   },

  //   onGlobalFilterChange: setGlobalFilter, // ✅ Updates the table filter state
  //   globalFilterFn: (row, columnId, filterValue) => {
  //     const cellValue = row.getValue(columnId);
  //     if (!filterValue) return true; // ✅ If no filter is applied, show all rows
  //     if (typeof cellValue === "string") {
  //       return cellValue.toLowerCase().includes(filterValue.toLowerCase());
  //     }
  //     if (typeof cellValue === "number") {
  //       return cellValue.toString().includes(filterValue);
  //     }
  //     return false; // ✅ Ensures it always returns a boolean
  //   },
  //   getRowId: (row) => row.id, // ✅ Ensure rows have unique IDs
  // });

  const [filters, setFilters] = useState({});

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // // ✅ Get selected rows
  // const selectedRows = table.getSelectedRowModel().rows;

  // // ✅ Function to delete selected rows
  // const handleDeleteSelected = () => {
  //   if (selectedRows.length === 0) return;
  //   const selectedIds = new Set(selectedRows.map((row) => row.original.id));
  //   table.setData((oldData) =>
  //     oldData.filter((row) => !selectedIds.has(row.id))
  //   );
  // };

  console.log("Tasks:", tasks);

  return (
    <>
      {/* ✅ Pass the table instance to DataTable */}
      <DataTableFilter columnsData={columns} onSubmit={() => {}} />
      <DataTable table={table} />
    </>
  );
};

export default RoleManagement;
