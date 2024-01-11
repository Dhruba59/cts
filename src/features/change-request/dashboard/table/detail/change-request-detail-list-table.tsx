"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { DataTableProps } from "@/model/common";
import { useMemo, useState } from "react";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import { toast } from "react-toastify";
import { getColumns } from "@/features/study/list-of-study/list-table/columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteIndication } from "@/hooks/rq-hooks/indication-hooks";
import { number } from 'yup';
import { MODAL_TYPE_ENUM } from "@/model/enum";
import { ChangeRequestReviewDetailListColumns } from "./change-request-detail-columns";


export function ChangeRequestDetailListTable({ data, sorting, setSorting, refetchIndications }: any) {

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
    deleteIndication({ id }, {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        toast.success(data?.data.details, { position: "top-center" });
        refetchIndications();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data.title, { position: "top-center" });
        refetchIndications();
      }
    });

  }

  const onDeleteCancel = () => {
    console.log('onDelete Cancel')
    setId(0);
    setOpen(false);
  }



  const columns = useMemo(() => ChangeRequestReviewDetailListColumns({}), []);

  return (
    <div className="">
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Indication"
          listTitleKey="indication_name"
        />
      </div>

    </div>
  );
};

export default ChangeRequestDetailListTable;
