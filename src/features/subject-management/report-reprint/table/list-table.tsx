import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { LIST_COLUMN, getColumns } from "./columns";
import ExpandableTable from "@/components/table/expandableTable";
import { SortingState } from "@tanstack/react-table";import ReprintReportPdf from "../reprint-report-pdf";
import { PDFViewer } from "@react-pdf/renderer";
import Spinner from "@/components/ui/spinner";
import Modal from "@/components/modal";


export interface ListTableProps {
  data: any;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  isLoadingTableData?: boolean;
}

const ListTable = ({ data, sorting, setSorting, isLoadingTableData }: ListTableProps) => {
  const isLoading = false;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onPrintClick = () => {
    // setLastSubjectQueryParams(subjectInfo);
    setIsModalOpen(true);
  };

  const columns = useMemo(() => getColumns({ onPrintClick }), []);
  // const data = useMemo(() => LIST_DATA, []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Subjects for Re-Print
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} isLoading={isLoadingTableData}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Subjects for Re-Print"
          listTitleKey="sponsor_subject_id"
        />
      </div>
      <Modal
        containerClassName="bg-transparent max-h-full !h-full top-0 max-w-full !w-full"
        closeBtnClassName="bg-white rounded-full hover:scale-125 transition-all duration-200 right-8"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onClose={() => onCloseModal}>
        <div className="h-full w-full mt-6">
          {isLoading ? (
            <div className="h-[85vh] flex items-center justify-center">
              <Spinner size="large" />{" "}
            </div>
          ) : (
            <PDFViewer className="w-full h-[85vh]">
              <ReprintReportPdf
                data={[]}
              />
            </PDFViewer>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ListTable;
