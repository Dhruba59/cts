import { useEffect, useState } from "react";
import { getListColumn } from "./columns";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { LastSubjectPdfData, LastSubjectPrintQueryParams } from "@/model/subject";
import { getLastSubjectReport } from "@/service/subject-service";
import { useQuery } from "react-query";
import LastContactSubjectsPdf from "../../pdf/contact-subject-pdf";
import { PDFViewer } from "@react-pdf/renderer";
import Spinner from "@/components/ui/spinner";
import Modal from "@/components/modal";
import LastSubjectContactModal from "./last-subject-contact-modal";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";

const ListTable = ({ data, isLoading, protocolId, sorting, setSorting, onUpdateSubject }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastSubjectQueryParams, setLastSubjectQueryParams] =
    useState<LastSubjectPrintQueryParams>();
  const [pdfData, setPdfData] = useState<LastSubjectPdfData>();

  const { data: lastSubjectData, isLoading: isLoadingLastSubjectData } =
    useQuery({
      queryFn: getLastSubjectReport,
      queryKey: ["last-subject-report", lastSubjectQueryParams],
      enabled: !!lastSubjectQueryParams,
    });

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateSubjectAndPdfModal = (data: any) => {
    onUpdateSubject();
    const subjectInfo: LastSubjectPrintQueryParams = {
      UserName: data?.userName,
      StudyId: protocolId,
      SubjectId: data?.subjectID,
      SponsorSubjectId: data?.sponsorSubjectID,
      NationalTypeId: data?.nationalTypeID
    }
    setIsModalOpen(true);
    setLastSubjectQueryParams(subjectInfo);
  }

  useEffect(() => {
    setPdfData({
      sponsorSubjectId: lastSubjectData?.data.sponsorSubjectId,
      siteCode: lastSubjectData?.data?.siteCode,
      reportRunTime: lastSubjectData?.data?.originalDateEntered,
      dob: lastSubjectData?.data?.dateOfBirth,
      protocol: lastSubjectData?.data?.protocolNumber,
      intitials: lastSubjectData?.data?.subjectInitials,
      lastSubjectContactDate: lastSubjectData?.data?.dateEntered,
      lastSubjectContactType: lastSubjectData?.data?.visitTypeName,
    });
  }, [lastSubjectData]);

  const [viewDetailModal, setViewDetailModal] = useState<React.ReactNode>(null);
  const onViewDetail = (data: any | undefined, studyId: number | undefined) => {
    setViewDetailModal(
      <LastSubjectContactModal data={data} studyId={studyId} onUpdateSubject={updateSubjectAndPdfModal} onHideDetail={onHideDetail} />
    );
  }

  const onHideDetail = () => {
    setViewDetailModal(null);
  }

  const columns = getListColumn({ studyId: protocolId, onViewDetail });
  const getRowActions = (item: any) => {
    return ([
        { content: "Edit", onClick: () => onViewDetail(item, protocolId)}
      ]
    );
  }

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Last Subjects" addButtonLink=""/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} isLoading={isLoading} sorting={sorting} setSorting={setSorting} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of Last Subjects"
          listTitleKey="last_sub_contact"
          getRowActions={getRowActions}
        />
      </div>
      {viewDetailModal}
      <Modal
        containerClassName="bg-transparent max-h-full !h-full top-0 max-w-full !w-full"
        closeBtnClassName="bg-white rounded-full hover:scale-125 transition-all duration-200 right-8"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onClose={() => onCloseModal}>
        <div className="h-full w-full mt-6">
          {isLoadingLastSubjectData ? (
            <div className="h-[85vh] flex items-center justify-center">
              <Spinner size="large" />{" "}
            </div>
          ) : (
            <PDFViewer className="w-full h-[85vh]">
              <LastContactSubjectsPdf
                data={pdfData}
                isLoadingData={isLoadingLastSubjectData}
              />
            </PDFViewer>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
