"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo } from "react";
import { ChangeRequestReviewDetailListColumns } from "./change-request-detail-columns";


export function ChangeRequestDetailListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  const columns = useMemo(() => ChangeRequestReviewDetailListColumns({}), []);

  return (
    <div className="">
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block  sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of Indication"
          listTitleKey="change_req_detail"
        />
      </div>

    </div>
  );
};

export default ChangeRequestDetailListTable;
