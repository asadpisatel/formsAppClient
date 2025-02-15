"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { any } from 'zod';

export type User = {
  email: string;
  role: "USER" | "ADMIN";
  status: "Blocked" | "Active";
};

type CustomTableMeta = {
  t: (key: string) => string;
};


export const columns:  ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column, table }) => {
      const t = (table.options.meta as CustomTableMeta)?.t
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t('email')} <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({table}) => {
      const t = (table.options.meta as CustomTableMeta)?.t
      return t('role')
    },
  },
  {
    accessorKey: "status",
    header: ({table}) => {
      const t = (table.options.meta as CustomTableMeta)?.t
      return t('status')
    },
  },
];
