"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteTrainingMaterial } from "@/hooks/rq-hooks/training-material-hooks";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import { TrainingMaterialListColumns } from "./columns";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import { MenuItemProps } from "@/model/menu-items";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { TrainingMaterialQuery } from "@/model/training-material";

export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  
  // const [open, setOpen] = useState<boolean>(false);
  // const [id, setId] = useState<number>(0);
  // const { mutate: deleteIndication } = useDeleteTrainingMaterial();
  const router = useRouter();

  // const onDeleteConfirm = () => {
  //    deleteIndication({id} , {
  //     onSuccess: (data) => {
  //       setId(0);
  //       setOpen(false);
  //       apiResponseToast(data?.data);
  //       refetch();
  //     },
  //     onError: (error: any) => {
  //       setId(0);
  //       setOpen(false);
  //       toast.error(error?.response?.data.title);
  //       refetch();
  //     }
  //   });

  // }

//   const onDeleteCancel = () => {
//     setId(0);
//     setOpen(false);
//  }
 
//   const onDelete = (id: number) => {
//     setId(id);
//     setOpen(true);
//   }
  const columns: ColumnDef<TrainingMaterialQuery>[] = useMemo(() => TrainingMaterialListColumns(), []);
  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => router.push(`/training-material/${item?.trainingId}/edit`) },
      ]
    );
  }

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="Training Materials" addButtonLink="add"/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle="Training Materials"
          // addButtonLink="add"
          listTitleKey="trainingName"
          getRowActions={getRowActions}
          isLoading={isLoading}
        />
      </div>
      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default ListTable;


