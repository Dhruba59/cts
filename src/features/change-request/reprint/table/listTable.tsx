"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteIndication } from "@/hooks/rq-hooks/indication-hooks";
import { number } from 'yup';
import { MODAL_TYPE_ENUM } from "@/model/enum";
import { ChangeRequestReprintListColumns } from "./columns";


export function ListTable({ data, sorting, setSorting, refetchIndications }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteIndication } = useDeleteIndication();

  const onDeleteConfirm = () => {
     deleteIndication({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        toast.success(data?.data.details ,{position:"top-center"});
        refetchIndications();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data.title ,{position:"top-center"});
        refetchIndications();
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

  const columns = useMemo(() => ChangeRequestReprintListColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
      Change Request & Re-Print
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" Change Request & Re-Print"
          listTitleKey="indication_name"
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
      >
        <div className="text-black text-base px-6 py-2">
          <p>Do you want to delete?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
