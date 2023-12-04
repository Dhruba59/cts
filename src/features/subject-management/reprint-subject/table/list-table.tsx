import SimpleTable from "@/components/table/simpleTable";
import { useMemo, useState } from "react";
import { LIST_COLUMN, LIST_DATA } from "./columns";
import Pagination from "@/components/pagination";
import ExpandableTable from "@/components/table/expandableTable";

const ListTable = () => {
  const columns = useMemo(() => LIST_COLUMN, []);
  const data = useMemo(() => LIST_DATA, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Last Contact Subjects
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Last Contact Subjects"
          listTitleKey="sponsor_subject_id"
        />
      </div>
      <div className="my-8 flex items-center justify-center md:justify-normal md:pl-14">
        <Pagination
          currentPage={currentPage}
          lastPage={totalPages}
          maxLength={7}
          setCurrentPage={setCurrentPage}
          pageSize={3}
          setPageSize={() => {}}
        />
      </div>
    </div>
  );
};

export default ListTable;
