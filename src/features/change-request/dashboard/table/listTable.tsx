"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { DataTableProps } from "@/model/common";
import { useMemo, useState } from "react";
import { ChangeRequestDashboardListColumns } from "./columns";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import { toast } from "react-toastify";
import { getColumns } from "@/features/study/list-of-study/list-table/columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteIndication } from "@/hooks/rq-hooks/indication-hooks";
import { number } from 'yup';
import { MODAL_TYPE_ENUM } from "@/model/enum";
import { useAcceptChangeRequest, useRejectChangeRequest } from "@/hooks/rq-hooks/change-request-hooks";


export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();
  
  const [openAccept, setOpenAccept] = useState<boolean>(false);
  const [openReject, setOpenReject] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<number>(0);
  const { mutate: acceptChangeRequest } = useAcceptChangeRequest();
  const { mutate: rejectChangeRequest } = useRejectChangeRequest();
  
  const onRejectConfirm = () => {
    rejectChangeRequest({requestId} , {
      onSuccess: (data) => {
        setRequestId(0);
        setOpenReject(false);
        toast.success(data?.data.details ,{position:"top-center"});
        refetch();
      },
      onError: (error: any) => {
        setRequestId(0);
        setOpenReject(false);
        toast.error(error?.response?.data.title ,{position:"top-center"});
        refetch();
      }
    });

  }

  const onAcceptConfirm = () => {
    acceptChangeRequest({requestId} , {
      onSuccess: (data) => {
        setRequestId(0);
        setOpenAccept(false);
        toast.success(data?.data.details ,{position:"top-center"});
        refetch();
      },
      onError: (error: any) => {
        setRequestId(0);
        setOpenAccept(false);
        toast.error(error?.response?.data.title ,{position:"top-center"});
        refetch();
      }
    });

  }

  const onCancel = () => {
    setRequestId(0);
    setOpenAccept(false);
    setOpenReject(false);
 }
 
 const onAccept = (id: number) => {
  setRequestId(0);
  setOpenAccept(true);
  console.log(`ID: ${id}`);
}

const onReject = (id: number) => {
  setRequestId(0);
  setOpenReject(true);
  console.log(`ID: ${id}`);

}

  const columns = useMemo(() => ChangeRequestDashboardListColumns({ onAccept, onReject }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Indication
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
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
        type={MODAL_TYPE_ENUM.WARNING}
        open={openReject}
        onClose={() => onCancel()}
        title="Confirmation!"
        containerClassName="!w-[624px]"
        renderFooter={{
          onSave: onRejectConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
      >
        <div className="text-black text-base px-6 py-2">
          <p>Do you want to reject?</p>
        </div>
      </Modal>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={openAccept}
        onClose={() => onCancel()}
        title="Confirmation!"
        containerClassName="!w-[624px]"
        renderFooter={{
          onSave: onAcceptConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
      >
        <div className="text-black text-base px-6 py-2">
          <p>Do you want to accept?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
