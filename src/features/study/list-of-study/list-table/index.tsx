"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import Modal from "@/components/modal";
import { ListTableProps } from "@/model/study";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";

const ListTable = ({ data, sorting, setSorting }: ListTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [studyDeleteId, setStudyDeleteId] = useState<number>();
  const { mutate: deleteStudy, isLoading: isDeleteLoading } = useGetStudyDelete();

  const onDeleteConfirm = () => {
    if (studyDeleteId) {
      deleteStudy({ studyId: studyDeleteId }, {
        onSuccess: (data) => {
          setIsDeleteModalOpen(false);
          apiResponseToast(data?.data?.details);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.detail)
        }
      });
    }
  }

  const onDeleteCancel = () => {
    setStudyDeleteId(undefined);
    setIsDeleteModalOpen(false);
  }

  const onDelete = (studyId: number) => {
    setIsDeleteModalOpen(true);
    setStudyDeleteId(studyId)
  }
  const columns = useMemo(() => getColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Study" addButtonLink="add"/>
      <div className="w-full block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of study"
          addButtonLink="add"
          listTitleKey="protocol_number"
        />
      </div>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} />
      </div>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={isDeleteModalOpen}
        isLoading={isDeleteLoading}
        onClose={() => onDeleteCancel()}
        title="Delete Confirmation!"
        containerClassName="!w-[624px] h-fit"
        renderFooter={{
          onSave: onDeleteConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
      >
        <div className="text-black text-base">
          Do you want to delete this study?
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
