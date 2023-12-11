import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { LIST_COLUMN } from "./columns";
import Pagination from "@/components/pagination";
import ExpandableTable from "@/components/table/expandableTable";
import { SortingState } from "@tanstack/react-table";


export interface ListTableProps {
  data: any;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  isLoadingTableData?: boolean;
}

const ListTable = ({ data, sorting, setSorting, isLoadingTableData }: ListTableProps) => {
  const columns = useMemo(() => LIST_COLUMN, []);
  // const data = useMemo(() => LIST_DATA, []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Subjects for Re-Print
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} isLoading={isLoadingTableData}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Subjects for Re-Print"
          listTitleKey="sponsor_subject_id"
        />
      </div>
    </div>
  );
};

export default ListTable;
