"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useState } from "react";
import Modal from "@/components/modal";
import { useDeleteIndication } from "@/hooks/rq-hooks/indication-hooks";
import { MODAL_TYPE_ENUM } from "@/model/enum";
import { getColumns } from "./columns";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteIndication } = useDeleteIndication();
  const router = useRouter();

  const onDeleteConfirm = () => {
     deleteIndication({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        apiResponseToast(data?.data);
        refetch();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data?.title);
        refetch();
      }
    });

  }

  const onDeleteCancel = () => {
    setId(0);
    setOpen(false);
 }
 
  const onDelete = (id: number) => {
    setId(id);
    setOpen(true);
  }

  const columns:any = getColumns({ onDelete });
  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => router.push(`/user/${item?.userId}/edit`) }
      ]
    );
  }

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of User" addButtonLink="add"/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of User"
          // addButtonLink="add"
          listTitleKey="userName"
          getRowActions={getRowActions}
          isLoading={isLoading}
        />
      </div>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={open}
        onClose={() => onDeleteCancel()}
        title="Confirmation!"
        containerClassName="md:!w-[624px]"
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
