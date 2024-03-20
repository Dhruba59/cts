"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { ChangeRequestAuditListColumns } from "./columns";
import ChangeRequestAuditDetailModal from "../detail/table/change-request-audit-detail-modal";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";


export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  const [viewDetailModal, setViewDetailModal] = useState<React.ReactNode>(null);

  const onViewDetail = (subjectId: number | undefined, requestId: number | undefined, regionGroupsId: number | undefined) => {
    setViewDetailModal(
      <ChangeRequestAuditDetailModal subjectId={subjectId} requestId={requestId} regionGroupsId={regionGroupsId} onHideDetail={onHideDetail}/>
    );
  }

  const onHideDetail = () => {
    setViewDetailModal(null);
  }
  const columns = useMemo(() => ChangeRequestAuditListColumns({ onViewDetail }), []);
  const getRowActions = (item: any) => {
    return [
      {
        content: "View",
        onClick: () =>
          onViewDetail(item?.subjectId, item?.requestId, item?.regionGroupsId),
      },
    ];
  };

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Change Request Audit" addButtonLink=""/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of Indication"
          listTitleKey="audit_list"
          getRowActions={getRowActions}
        />
      </div>
      {viewDetailModal}
    </div>
  );
};

export default ListTable;
