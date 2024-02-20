"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { ChangeRequestAuditListColumns } from "./columns";
import { useForm } from "react-hook-form";
import ChangeRequestAuditDetailModal from "../detail/table/change-request-audit-detail-modal";


export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();

  const [viewDetailModal, setViewDetailModal] = useState<React.ReactNode>(null);
  const [id, setId] = useState<number>(0);

  const onViewDetail = (subjectId: number | undefined, requestId: number | undefined, regionGroupsId: number | undefined) => {
    setViewDetailModal(
      <ChangeRequestAuditDetailModal subjectId={subjectId} requestId={requestId} regionGroupsId={regionGroupsId} onHideDetail={onHideDetail}/>
    );
  }

  const onHideDetail = () => {
    setViewDetailModal(null);
  }
  const columns = useMemo(() => ChangeRequestAuditListColumns({ onViewDetail }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6">
        List of Change Request Audit
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Indication"
          listTitleKey="indication_name"
        />
      </div>
      {viewDetailModal}
    </div>
  );
};

export default ListTable;
