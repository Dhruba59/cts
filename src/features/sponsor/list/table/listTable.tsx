"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { SponsorListColumns } from "./columns";
import Modal from "@/components/modal";
import { useDeleteSponsor } from "@/hooks/rq-hooks/sponsor-hooks";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { WarningIcon } from "@/assets/icons";
import { MODAL_TYPE_ENUM } from "@/model/enum";

export function ListTable({ data, sorting, setSorting, isLoading, refetch }: any) {  
  
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const { mutate: deleteSponsor, isLoading: isDeletingSponsor } = useDeleteSponsor();
  const router = useRouter();

  const onDeleteConfirm = () => {
     deleteSponsor({id} , {
      onSuccess: (data) => {
        setId(0);
        setOpen(false);
        apiResponseToast(data?.data);
        refetch();
      },
      onError: (error: any) => {
        setId(0);
        setOpen(false);
        toast.error(error?.response?.data.detail);
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

  const columns = useMemo(() => SponsorListColumns({ onDelete }), []);
  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => router.push(`/sponsor/${item?.sponsorId}/edit`) },
        { content: "Delete", onClick: () => onDelete(item?.sponsorId)}
      ]
    );
  }

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
          // tableTitle=" List of Sponsor"
          // addButtonLink="add"
          listTitleKey="study_name"
          getRowActions={getRowActions}
        />
      </div>
      <Modal
        open={open}
        type={MODAL_TYPE_ENUM.WARNING}
        onClose={() => onDeleteCancel()}
        title="Confirmation!"
        isLoading={isDeletingSponsor}
        containerClassName="!w-[624px]"
        renderFooter={{
          onSave: onDeleteConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
      >
        <div className="text-base px-2 py-2">
          <p>Do you want to delete?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
