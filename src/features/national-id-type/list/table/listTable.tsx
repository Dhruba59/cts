"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { NationalIdTypeListColumns } from "./columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteNationalIdType } from "@/hooks/rq-hooks/national-id-type-hooks";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";


export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteNationalIdType } = useDeleteNationalIdType();

  const onDeleteConfirm = () => {
     deleteNationalIdType({id} , {
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

  const columns = useMemo(() => NationalIdTypeListColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of NID Type" addButtonLink="add"/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of NID Type"
          addButtonLink="add"
          listTitleKey="nationalIdTypeName"
          
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
        <div className="text-base px-6 py-2">
          <p>Do you want to delete?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
