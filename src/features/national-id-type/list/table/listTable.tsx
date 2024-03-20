"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { NationalIdTypeListColumns } from "./columns";
import Modal from "@/components/modal";
import { useDeleteNationalIdType } from "@/hooks/rq-hooks/national-id-type-hooks";
import { MODAL_TYPE_ENUM } from "@/model/enum";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ListTable({ data, sorting, setSorting, refetchNationalIdType, isLoading }: any) {
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteNationalIdType } = useDeleteNationalIdType();
  const router = useRouter();

  const onDeleteConfirm = () => {
     deleteNationalIdType({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        apiResponseToast(data?.data);
        refetchNationalIdType();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data.title);
        refetchNationalIdType();
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

  const columns = useMemo(() => NationalIdTypeListColumns({ onDelete }), []);
  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => router.push(`/national-id-type/${item?.nationalTypeId}/edit`) },
        { content: "Delete", onClick: () => onDelete(item?.nationalTypeId)}
      ]
    );
  }

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
          // tableTitle=" List of NID Type"
          // addButtonLink="add"
          listTitleKey="nationalIdTypeName"
          getRowActions={getRowActions}
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
        <div className="text-base px-6 py-2">
          <p>Do you want to delete?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
