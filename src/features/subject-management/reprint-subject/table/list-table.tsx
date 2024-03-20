import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { LIST_COLUMN, getColumns } from "./columns";
import ExpandableTable from "@/components/table/expandableTable";
import { SortingState } from "@tanstack/react-table";
import Modal from "@/components/modal";
import { PDFViewer } from "@react-pdf/renderer";
import LastContactSubjectsPdf from "../../pdf/contact-subject-pdf";
import { LastSubjectPdfData, LastSubjectPrintQueryParams } from "@/model/subject";
import { useGetLastSubjectReport } from "@/hooks/rq-hooks/subject-hooks";
import { getLastSubjectReport } from "@/service/subject-service";
import { useQuery } from "react-query";
import Spinner from "@/components/ui/spinner";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";

export interface ListTableProps {
  data: any;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  isLoadingTableData?: boolean;
}



const ListTable = ({
  data,
  sorting,
  setSorting,
  isLoadingTableData,
}: ListTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastSubjectQueryParams, setLastSubjectQueryParams] =
    useState<LastSubjectPrintQueryParams>();
  const [pdfData, setPdfData] = useState<LastSubjectPdfData>();

  const { data: lastSubjectData, isLoading: isLoadingLastSubjectData } =
    useQuery({
      queryFn: getLastSubjectReport,
      queryKey: ["lastReprintSubjects", lastSubjectQueryParams],
      enabled: !!lastSubjectQueryParams,
    });

  const onPrintClick = (subjectInfo: LastSubjectPrintQueryParams) => {
    setLastSubjectQueryParams(subjectInfo);
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const columns = useMemo(() => getColumns({ onPrintClick }), []); 
  const getRowActions = (item: any) => {
    const subjectInfo: LastSubjectPrintQueryParams = {
      NationalTypeId: item?.nationalTypeId,
      SponsorSubjectId: item?.sponsorSubjectId,
      StudyId: item?.studyId,
      SubjectId: item?.subjectId,
      UserName: item?.userName,
    };
    return [{ content: "Print", onClick: () => onPrintClick(subjectInfo) }];
  };

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

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Last Contact Subjects" addButtonLink=""/>
      <div className="hidden sm:block">
        <SimpleTable
          data={data}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          isLoading={isLoadingTableData}
        />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of Last Contact Subjects"
          listTitleKey="reprint_subject_id"
          isLoading={isLoadingTableData}
          getRowActions={getRowActions}
        />
      </div>
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
