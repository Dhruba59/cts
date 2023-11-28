"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { DataTableProps } from "@/model/common";
import { useMemo } from "react";
import { INDICATION_LIST_COLUMN } from "./columns";

export function ListTable({data, sorting, setSorting} :  any){
  const columns = useMemo(() => INDICATION_LIST_COLUMN, []);
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
