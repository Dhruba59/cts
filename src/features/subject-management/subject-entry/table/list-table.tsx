import { useMemo, useState } from "react";
import { LIST_COLUMN } from "./columns";
import Pagination from "@/components/pagination";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";

const ListTable = ({ data, isLoading }: any) => {
  const columns = useMemo(() => LIST_COLUMN, []);
  // const data = useMemo(() => LIST_DATA, []);

  const [currentPage, setCurrentPage] = useState(1);
//console.log(data);
  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Last Subjects
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} isLoading={isLoading}/>
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Last Subjects"
          listTitleKey="user_name"
        />
      </div>
      {/* <div className="my-8 flex items-center justify-center md:justify-normal md:pl-14">
        <Pagination
          currentPage={currentPage}
          lastPage={5}
          pageSize={5}
          setPageSize={() => {}}
          maxLength={7}
          setCurrentPage={setCurrentPage}
        />
      </div> */}
    </div>
  );
};

export default ListTable;
