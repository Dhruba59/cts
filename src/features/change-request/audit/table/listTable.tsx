"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { DataTableProps } from "@/model/common";
import { useMemo, useState } from "react";
import { ChangeRequestAuditListColumns } from "./columns";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import { toast } from "react-toastify";
import { getColumns } from "@/features/study/list-of-study/list-table/columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteIndication } from "@/hooks/rq-hooks/indication-hooks";
import { number } from 'yup';
import { MODAL_TYPE_ENUM } from "@/model/enum";
import ChangeRequestAuditDetailModal from "../detail/table/change-request-audit-detail-modal";


export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();

  const [childModal, setChildModal] = useState<React.ReactNode>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);


  const onViewDetail = (subjectId: number | undefined, regionGroupsId: number | undefined) => {
    setChildModal(
      <ChangeRequestAuditDetailModal subjectId={subjectId} regionGroupsId={regionGroupsId} />
    );
    setOpen(true);
  }

  const onHideDetail = () => {
    setChildModal(null);
    setOpen(false);
  }
  const columns = useMemo(() => ChangeRequestAuditListColumns({ onViewDetail }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
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
      <Modal
        open={open}
        onClose={onHideDetail}
        title="Changed Request Audit Detail!"
        containerClassName="flex flex-1 flex-col mx-10"
        renderFooter={{
          cancelButtonName: "Close",
          cancelButtonOnly: true
        }}
      >
        {childModal}
      </Modal>
    </div>
  );
};

export default ListTable;
