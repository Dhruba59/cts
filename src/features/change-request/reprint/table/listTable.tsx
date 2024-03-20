"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { useDeleteIndication } from "@/hooks/rq-hooks/indication-hooks";
import { useReprintMatchReportRequest } from "@/hooks/rq-hooks/change-request-hooks";
import { MODAL_TYPE_ENUM, RESPONSE_TYPE_ENUM } from "@/model/enum";
import { ChangeRequestReprintListColumns } from "./columns";
import Spinner from "@/components/ui/spinner";
import { PDFViewer } from "@react-pdf/renderer";
import ChangeRequestModal from "./change-request-modal";
import ReprintPdf from "../../pdf/reprint-pdf";
//import { getSubjectMatchReport } from "@/service/report-service";
import { useQuery } from "react-query";
import { MatchReportQueryParams } from "@/model/subject";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";

export function ListTable({ data, sorting, setSorting, refetch, isLoading }: any) {

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [printData, setPrintData] = useState();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const { mutate: deleteIndication } = useDeleteIndication();
  const { mutate: matchReportRequest, isLoading: isLoadingPrintData } = useReprintMatchReportRequest();
  const [viewChangeRequestModal, setViewChangeRequestModal] = useState<React.ReactNode>(null); 
  const [subjectMatchReportQueryParams, setSubjectMatchReportQueryParams] =
  useState<MatchReportQueryParams>();

  /* <ChangeRequestModal id={row.original.subjectId + '_' + row.original.nationalTypeId} visitTypeId={row.original.visitTypeIdForBusinessLogic} isPreScreen={row.original.preScreen} onPrintClick={onPrintClick}/> */
const onOpenChangeRequestModal = (subjectId: number | undefined, nationalTypeId: number | undefined, visitTypeId: number | undefined, isPreScreen: boolean | undefined)=> {
  const subjectInfo: MatchReportQueryParams = {
    SubjectId: subjectId ?? '',
    NationalTypeId: nationalTypeId ?? ''
  }
  setViewChangeRequestModal(
    <ChangeRequestModal id={subjectId + '_' + nationalTypeId} visitTypeId={visitTypeId} isPreScreen={isPreScreen} onPrintClick={() => onPrintClick(subjectInfo)} onHideChangeRequestModal={onHideChangeRequestModal} refetchList={refetch}/>
  );
}

const onHideChangeRequestModal = () => {
  setViewChangeRequestModal(null);
}

const onCloseModal = () => {
  setIsPrintModalOpen(false);
};

const onPrintClick = (subjectInfo: MatchReportQueryParams) => {
  setSubjectMatchReportQueryParams(subjectInfo);
  matchReportRequest(subjectInfo, {
    onSuccess: (data) => {
      setPrintData(data.data);
    }
  })
  setIsPrintModalOpen(true);
};

const onDeleteConfirm = () => {
  deleteIndication({ id }, {
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

const columns = useMemo(() => ChangeRequestReprintListColumns({ onOpenChangeRequestModal }), []);
const getRowActions = (item: any) => {
  return ([
      { content: "Edit", onClick: () => onOpenChangeRequestModal(item?.subjectId, item?.nationalTypeId, item?.visitTypeIdForBusinessLogic, item?.preScreen) }
    ]
  );
}

return (
  <div className="sm:wrapper">
     <TableTopWithAddButtin headerText="Change Request & Re-Print" addButtonLink=""/>
    <div className="hidden sm:block">
      <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
    </div>
    <div className="block sm:hidden">
      <ExpandableTable
        data={data}
        columns={columns}
        // tableTitle=" Change Request & Re-Print"
        listTitleKey="change_req_reprint"
        getRowActions={getRowActions}
      />
    </div>
    {viewChangeRequestModal}
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
      <div className="text-black text-base px-6 py-2">
        <p>Do you want to delete?</p>
      </div>
    </Modal>
    <Modal
      containerClassName="bg-transparent max-h-full !h-full top-0 max-w-full !w-full"
      closeBtnClassName="bg-white rounded-full hover:scale-125 transition-all duration-200 right-8"
      open={isPrintModalOpen}
      setOpen={setIsPrintModalOpen}
      onClose={() => onCloseModal}>
      <div className="h-full w-full mt-6">
        {isLoadingPrintData ? (
          <div className="h-[85vh] flex items-center justify-center">
            <Spinner size="large" />{" "}
          </div>
        ) : (
          <PDFViewer className="w-full h-[85vh]">
            <ReprintPdf
              data={printData}
            />
          </PDFViewer>
        )}
      </div>
    </Modal>
  </div>
);
};

export default ListTable;
