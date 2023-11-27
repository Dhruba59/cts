"use client";
import Pagination from "@/components/pagination";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { LIST_COLUMN } from "./columns";
import { SortingFn, SortingState } from "@tanstack/react-table";

export interface ListTableProps {
  data: any;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
}

const ListTable = ({ data, sorting, setSorting }: ListTableProps) => {
  const columns = useMemo(() => LIST_COLUMN, []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Study
      </h4>
      <div className="w-full block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of study"
          listTitleKey="protocol_number"
        />
      </div>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} />
      </div>
    </div>
  );
};

export default ListTable;
