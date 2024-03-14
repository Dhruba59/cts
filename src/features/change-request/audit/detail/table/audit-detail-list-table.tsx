"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { ChangeRequestAuditDetailListColumns } from "./audit-detail-columns";

export function AuditDetailListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const onDelete = (id: number) => {
    setId(id);
    setOpen(true);
  }

  const columns = useMemo(() => ChangeRequestAuditDetailListColumns({ onDelete }), []);

  return (
    <div className="">
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle="List of Audit"
          listTitleKey="audit_detail_view"
        />
      </div>

    </div>
  );
};

export default AuditDetailListTable;
