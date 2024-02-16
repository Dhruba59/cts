"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { StudyCompoundListColumns } from "./columns";
import { useDeleteStudyCompound } from "@/hooks/rq-hooks/study-compound-hooks";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";

export function ListTable({ data, sorting, setSorting, isLoading, refetch }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteStudyCompound, isLoading: isDeleting } = useDeleteStudyCompound();

  const onDeleteConfirm = () => {
     deleteStudyCompound({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        apiResponseToast(data?.data);
        refetch();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data.title);
        refetch();
      }
    });

  }

  const onDeleteCancel = () => {
    console.log('onDelete Cancel')
    setId(0);
    setOpen(false);
 }
 
  const onDelete = (id: number) => {
    setId(id);
    setOpen(true);
  }

  const columns = useMemo(() => StudyCompoundListColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Study Compound" addButtonLink="add"/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Study Compound"
          addButtonLink="add"
          listTitleKey="studyCompoundName"
        />
      </div>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={open}
        onClose={() => onDeleteCancel()}
        title="Confirmation!"
        containerClassName="!w-[624px]"
        renderFooter={{
          onSave: onDeleteConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
        isLoading={isDeleting}
      >
        <div className="text-black text-base px-6 py-2">
          <p>Do you want to delete?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
