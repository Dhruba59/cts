"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import Modal from "@/components/modal";
import { MODAL_TYPE_ENUM } from "@/model/enum";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ListTable = ({ data, sorting, setSorting, isLoading }: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [studyDeleteId, setStudyDeleteId] = useState<number>();
  const { mutate: deleteStudy, isLoading: isDeleteLoading } = useGetStudyDelete();
  const router = useRouter();

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
  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => router.push(`/study/${item?.studyId}/edit`) },
        { content: "Delete", onClick: () => onDelete(item?.studyId)}
      ]
    );
  }

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Study" addButtonLink="add"/>
      <div className="w-full block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of study"
          // addButtonLink="add"
          listTitleKey="protocol_number"
          getRowActions={getRowActions}
        />
      </div>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      </div>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={isDeleteModalOpen}
        isLoading={isDeleteLoading}
        onClose={() => onDeleteCancel()}
        title="Delete Confirmation!"
        containerClassName="md:!w-[624px] h-fit"
        renderFooter={{
          onSave: onDeleteConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
      >
        <div className="text-base">
          Do you want to delete this study?
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
