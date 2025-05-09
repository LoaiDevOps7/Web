"use client"

import * as React from "react"
import { useContext } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Subscription } from "@/types/Subscribtion"
import { getSubscriptionsByUser } from "@/api/subscription"
import { UserContext } from "@/context/UserContext";

export const columns: ColumnDef<Subscription>[] = [
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
    accessorKey: "id",
    header: "رقم الاشتراك",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "تاريخ البدء",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return (
        <div>
          {date.toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "تاريخ الانتهاء",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return (
        <div>
          {date.toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    header: "اسم الباقة",
    accessorFn: (row) => row.package.name,
    cell: ({ row }) => <div>{row.original.package.name}</div>,
  },
  {
    header: "السعر",
    accessorFn: (row) => row.package.price,
    cell: ({ row }) => <div>{row.original.package.price} $</div>,
  },
  {
    header: "المدة (أيام)",
    accessorFn: (row) => row.package.duration,
    cell: ({ row }) => <div>{row.original.package.duration} أيام</div>,
  },
  {
    accessorKey: "notified",
    header: "إشعار",
    cell: ({ row }) => (
      <div>{row.getValue("notified") ? "تم الإشعار" : "لم يتم الإشعار"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">افتح القائمة</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>النشاطات</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>عرض العميل</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function SubscribtionsList() {
  const [subscription, setSubscription] = React.useState<Subscription[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { user } = useContext(UserContext) || {};

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const data = await getSubscriptionsByUser(user.sub);
      setSubscription(data);
    };

    fetchData();
  }, [user]);


  const table = useReactTable({
    data: subscription,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
       <Input
          placeholder="...البحث"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              الأعمدة <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize hidden md:table-cell"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-lamagreen">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  لا نتائج
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-lamagreen"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  )
}
