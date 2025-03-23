import { ColumnDef } from "@tanstack/react-table";
import { ColumnType } from "./types";

// Extend the ColumnDef with a custom 'type' field
export type CustomColumnDef<TData = unknown> = ColumnDef<TData> & {
  type: ColumnType;
  isSearchValuesMenu: boolean;
  searchValuesOptions?: {
    lable: string;
    value: string;
  }[];
};

export const columns: CustomColumnDef[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    type: "number",
    isSearchValuesMenu: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    enableSorting: true,
    type: "string",
    isSearchValuesMenu: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    type: "status",
    isSearchValuesMenu: true,
    searchValuesOptions: [
      {
        lable: "Low",
        value: "Low",
      },
      {
        lable: "High",
        value: "High",
      },
      {
        lable: "Med",
        value: "Med",
      },
    ],
  },
  {
    accessorKey: "priority",
    header: "Priority",
    enableSorting: true,
    type: "number",
    isSearchValuesMenu: false,
  },
  {
    accessorKey: "archived",
    header: "Archived",
    enableSorting: false,
    type: "number",
    isSearchValuesMenu: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    enableSorting: true,
    type: "date",
    isSearchValuesMenu: false,
  },
];
