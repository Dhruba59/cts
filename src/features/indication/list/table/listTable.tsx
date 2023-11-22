"use client";
import Pagination from "@/components/pagination";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { LIST_COLUMN } from "./columns";
import { Indication, IndicationQuery } from "@/model/indication";
import { get_indications } from "@/service/indication-service";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTableProps } from "@/model/common";



export function ListTable<TData, TValue>({data, columns, sorting, setSorting} :  DataTableProps<TData, TValue>){

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Indication
      </h4>

      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Indication"
          listTitleKey="indication_name"
        />
      </div>


    </div>
  );
};

export default ListTable;
