import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { getColumns } from "./columns";
import ExpandableTable from "@/components/table/expandableTable";
import { SortingState } from "@tanstack/react-table";import ReprintReportPdf from "../reprint-report-pdf";
import { PDFViewer } from "@react-pdf/renderer";
import Spinner from "@/components/ui/spinner";
import Modal from "@/components/modal";
import ReprintPdf from "@/features/change-request/pdf/reprint-pdf";
import { getSubjectMatchReport } from "@/service/report-service";
import { useQuery } from "react-query";
import { MatchReportQueryParams } from "@/model/subject";
import TableTopWithAddButtin from "@/components/table/table-top-with-add-button";


export interface ListTableProps {
  data: any;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  isLoadingTableData?: boolean;
}

const ListTable = ({ data, sorting, setSorting, isLoadingTableData }: ListTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastSubjectQueryParams, setLastSubjectQueryParams] =
  useState<MatchReportQueryParams>();
  const { data: subjectMatchReport, isLoading: isLoadingSubjectMatchReport } =
    useQuery({
      queryFn: getSubjectMatchReport,
      queryKey: ["reportReprintSubjects", lastSubjectQueryParams],
      enabled: !!lastSubjectQueryParams,
    });

    const onPrintClick = (subjectInfo: MatchReportQueryParams) => {
      setLastSubjectQueryParams(subjectInfo);
      setIsModalOpen(true);
    };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(() => getColumns({ onPrintClick }), []);
  const getRowActions = (item: any) => {
    const subjectInfo = {
      SubjectId: item?.sid,
      NationalTypeId: item?.nationalTypeID
    }
    return ([
        { content: "Print", onClick: () => onPrintClick(subjectInfo) },
      ]
    );
  }

  return (
    <div className="sm:wrapper">
      <TableTopWithAddButtin headerText="List of Subjects for Re-Print" addButtonLink=""/>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} isLoading={isLoadingTableData}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          // tableTitle=" List of Subjects for Re-Print"
          listTitleKey="sponsor_subject_id"
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
          {isLoadingSubjectMatchReport ? (
            <div className="h-[85vh] flex items-center justify-center">
              <Spinner size="large" />{" "}
            </div>
          ) : (
            <PDFViewer className="w-full h-[85vh]">
              <ReprintPdf
                data={subjectMatchReport?.data}
              />
            </PDFViewer>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
