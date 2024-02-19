"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { ChangeRequestDashboardListColumns } from "./columns";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import { useAcceptChangeRequest, useRejectChangeRequest } from "@/hooks/rq-hooks/change-request-hooks";
import { useSession } from "next-auth/react";
import { USER_ROLE_ENUM } from "@/model/enum";
import ChangeRequestDashboardModal from "./detail/change-request-dashboard-modal";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";

export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {
  
  const [childModal, setChildModal] = useState<React.ReactNode>(null);
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [openAccept, setOpenAccept] = useState<boolean>(false);
  const [openReject, setOpenReject] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<number>(0);
  const { mutate: acceptChangeRequest, isLoading: isLoadingAcceptRequest } = useAcceptChangeRequest();
  const { mutate: rejectChangeRequest, isLoading: isLoadingRejectRequest } = useRejectChangeRequest();
  const { data: session } = useSession();
  // @ts-ignore
  const isSysAdmin = session?.user?.currentRole?.roleId === USER_ROLE_ENUM.SYSTEM_ADMIN;

  const onRejectConfirm = () => {
    rejectChangeRequest({ changeRequestId: requestId }, {
      onSuccess: (data) => {
        setRequestId(0);
        setOpenReject(false);
        apiResponseToast(data?.data);
        refetch();
      },
      onError: (error: any) => {
        setRequestId(0);
        setOpenReject(false);
        toast.error(error?.response?.data?.title);
        refetch();
      }
    });

  }

  const onAcceptConfirm = () => {
    acceptChangeRequest({ changeRequestId: requestId }, {
      onSuccess: (data) => {
        setRequestId(0);
        setOpenAccept(false);
        apiResponseToast(data?.data);
        refetch();
      },
      onError: (error: any) => {
        setRequestId(0);
        setOpenAccept(false);
        toast.error(error?.response?.data.detail);
        refetch();
      }
    });

  }

  const onCancel = () => {
    setRequestId(0);
    setOpenAccept(false);
    setOpenReject(false);
    setChildModal(null);
    setOpenViewDetail(false);
    setIsPending(false);
  }

  const onAcceptOnDetailsView = (id: number) => {
    setRequestId(id);
    setOpenViewDetail(false);
    setOpenAccept(true);
  }
  const onRejectOnDetailsView = (id: number) => {
    setRequestId(id);
    setOpenViewDetail(false);
    setOpenReject(true);
  }

  const onAccept = (id: number) => {
    setRequestId(id);
    setOpenViewDetail(false);
    setOpenAccept(true);
    // acceptChangeRequest({ changeRequestId: id }, {
    //   onSuccess: (data) => {
    //     toast.success(data?.data.details, { position: "top-center" });
    //     refetch();
    //   },
    //   onError: (error: any) => {
    //     toast.error(error?.response?.data.title, { position: "top-center" });
    //   }
    // });
    // onAcceptConfirm(id);
    //console.log(`ID: ${id}`);
  }

  const onReject = (id: number) => {
    setRequestId(id);
    setOpenViewDetail(false);
    setOpenReject(true);
    // rejectChangeRequest({ changeRequestId: id }, {
    //   onSuccess: (data) => {
    //     toast.success(data?.data.details, { position: "top-center" });
    //     refetch();
    //   },
    //   onError: (error: any) => {
    //     toast.error(error?.response?.data.title, { position: "top-center" });
    //   }
    // });
    //console.log(`ID: ${id}`);

  }

  const onViewDetail = (id: number, pending: boolean) => {
    setChildModal(
      <ChangeRequestDashboardModal requestId={id} onAccept={onAcceptOnDetailsView} onReject={onRejectOnDetailsView} isSysAdmin={isSysAdmin}/>
    )
    setOpenViewDetail(true);
    setIsPending(pending);
    setRequestId(id);
  }

  const columns = useMemo(() => ChangeRequestDashboardListColumns({ onViewDetail, onAccept, onReject, isSysAdmin }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6">
        List of Change Request
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Indication"
          listTitleKey="indication_name"
        />
      </div>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={openReject}
        onClose={() => onCancel()}
        title="Confirmation!"
        containerClassName="!w-[624px] z-50"
        renderFooter={{
          onSave: onRejectConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
        isLoading={isLoadingRejectRequest}
      >
        <div className="text-base px-6 py-2">
          <p>Do you want to reject?</p>
        </div>
      </Modal>
      <Modal
        type={MODAL_TYPE_ENUM.WARNING}
        open={openAccept}
        onClose={() => onCancel()}
        title="Confirmation!"
        containerClassName="!w-[624px] z-50"
        renderFooter={{
          onSave: onAcceptConfirm,
          submitButtonName: "Confirm",
          cancelButtonName: "Cancel"
        }}
        isLoading={isLoadingAcceptRequest}
      >
        <div className="text-black text-base px-6 py-2">
          <p>Do you want to accept?</p>
        </div>
      </Modal>

      {/* Request detail modal */}
      <Modal
        open={openViewDetail}
        maskClosable={false}
        onClose={() => onCancel()}
        title="Changed Request Detail"
        containerClassName="flex flex-1 flex-col mx-10 z-0 overflow-auto max-w-[700px]"
        renderFooter={{
          onSave: () => { onAcceptOnDetailsView(requestId) },
          onReject: () => { onRejectOnDetailsView(requestId) },
          submitButtonName: isSysAdmin && isPending ? "Approve" : undefined,
          rejectButtonName: isSysAdmin && isPending ? "Reject" : undefined,
          cancelButtonName: "Close",
          cancelButtonOnly: isSysAdmin && isPending  ? false : true
        }}
      >
        {childModal}
      </Modal>
    </div>
  );
};

export default ListTable;
