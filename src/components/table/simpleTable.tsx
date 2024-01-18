"use client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import ArrowLongUp from "../icons/arrow-long-up";
import ArrowLongDown from "../icons/arrow-long-down";
import { DataTableProps } from "@/model/common";
import Spinner from "../ui/spinner";
import { useState } from "react";

export function SimpleTable<TData, TValue>({
  columns,
  data,
  totalPages = -1,
  sorting,
  setSorting,
  isLoading,
  containerClassName,
  ...props
}: DataTableProps<TData, TValue>) {


  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection
    },
    onSortingChange: setSorting,
    manualSorting: true,
    manualPagination: true,
    autoResetPageIndex: false,
    pageCount: totalPages,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full p-10 flex justify-center items-center">
        <Spinner size="large" />
      </div>)
  }

  if (data === undefined || data.length === 0) {
    return (
      <div className="w-full h-full p-10 flex justify-center items-center">
        <div>No data found</div>
      </div>)
  }

  return (
    <div {...props} className={`overflow-auto ${containerClassName}`}>
      <Table>
        <TableHeader className="z-0">
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className="z-0"
                  style={{
                    width:
                      header.getSize() !== 150 ? header.getSize() : undefined
                  }}
                >
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none flex flex-row items-center"
                        : "",
                      onClick: header.column.getToggleSortingHandler()
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <ArrowLongUp />,
                      desc: <ArrowLongDown />
                    }[header.column.getIsSorted() as string] ?? ''}

                    {index > 0 && (
                      <div className="absolute left-0 top-3.5 w-[1px] h-[22px] bg-divider" />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows.map((row) => (
            <TableRow key={row.id} className="text-sm text-start">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SimpleTable;
