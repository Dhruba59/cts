"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { DataTableProps } from "@/model/common";
import { useMemo, useState } from "react";
import { DormantUserListColumns } from "./columns";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import { toast } from "react-toastify";
import { getColumns } from "@/features/study/list-of-study/list-table/columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { number } from 'yup';
import { MODAL_TYPE_ENUM } from "@/model/enum";
import { useDeleteUser } from "@/hooks/rq-hooks/user-hooks";


export function ListTable({ data, sorting, setSorting, refetchUsers }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteUser } = useDeleteUser();

  const onDeleteConfirm = () => {
     deleteUser({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        toast.success(data?.data.details ,{position:"top-center"});
        refetchUsers();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data.title ,{position:"top-center"});
        refetchUsers();
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

  const columns = useMemo(() => DormantUserListColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Dormant User
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Dormant User"
          listTitleKey="User_name"
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
