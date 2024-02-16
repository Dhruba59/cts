"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { SponsorListColumns } from "./columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteSponsor } from "@/hooks/rq-hooks/sponsor-hooks";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";

export function ListTable({ data, sorting, setSorting, isLoading, refetch }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteSponsor } = useDeleteSponsor();

  const onDeleteConfirm = () => {
     deleteSponsor({id} , {
      onSuccess: (data) => {
        //console.log(data);
        setId(0);
        setOpen(false);
        apiResponseToast(data?.data?.details, data?.data?.type);
        refetch();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        apiResponseToast(error?.response?.data.title, RESPONSE_TYPE_ENUM.ERROR);
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

  const columns = useMemo(() => SponsorListColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Sponsor" addButtonLink="add"/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Sponsor"
          addButtonLink="add"
          listTitleKey="study_name"
        />
      </div>
      <Modal
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
