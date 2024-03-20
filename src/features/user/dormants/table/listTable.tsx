"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { DormantUserListColumns } from "./columns";
import Modal from "@/components/modal";
import { MODAL_TYPE_ENUM } from "@/model/enum";
import { useDeleteDormantUsers } from "@/hooks/rq-hooks/user-hooks";
import { useTableRowsSelection } from "@/hooks/table-rows-selection-hooks";
import { UserQuery } from "@/model/user";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";
import { useRouter } from "next/navigation";


export function ListTable({ data, pageSize, totalPages, sorting, setSorting, refetch, isLoading }: any) {

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [dormantUsers, setDormantUsers] = useState<number[]>([]);
  const { mutate: deleteDormantUsers } = useDeleteDormantUsers();
  const router = useRouter();

  const onDeleteConfirm = () => {
    deleteDormantUsers({ dormantUsers }, {
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

  const { selectedRows, onRowSelectionChange, onAllRowsSelectionChange
  } = useTableRowsSelection<UserQuery>();

  const columns = useMemo(() => DormantUserListColumns({
    onDelete, pageSize, onRowSelectionChange, onAllRowsSelectionChange
  }), []);

  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => router.push(`/user/${item?.userId}/edit`) },
      ]
    );
  }

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Dormant User"addButtonLink=""/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} totalPages={totalPages} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of Dormant User"
          listTitleKey="User_name"
          getRowActions={getRowActions}
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
