"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteTrainingMaterial } from "@/hooks/rq-hooks/training-material-hooks";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import { TrainingMaterialListColumns } from "./columns";
import { apiResponseToast } from "@/utils/toast";


export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteIndication } = useDeleteTrainingMaterial();

  const onDeleteConfirm = () => {
     deleteIndication({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        apiResponseToast(data?.data?.details, data?.data?.type);
        refetch();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        apiResponseToast(error?.response?.data?.title, RESPONSE_TYPE_ENUM.ERROR);
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

  const columns = useMemo(() => TrainingMaterialListColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Training Material
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Training Material"
          listTitleKey="trainingName"
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


