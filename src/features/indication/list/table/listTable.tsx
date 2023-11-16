"use client";
import Pagination from "@/components/pagination";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { useEffect, useMemo, useState } from "react";
import { LIST_COLUMN } from "./columns";
import { Indication, IndicationQuery } from "@/model/indication";
import { get_indications } from "@/service/indication-service";

export const dynamic = "force-dynamic";

const ListTable = () => {
  const columns = useMemo(() => LIST_COLUMN, []);
  //const data = useMemo(() => LIST_DATA, []);
  let indiationQuery = {} as IndicationQuery;

  let indiations = [] as Indication[];

  const [currentPage, setCurrentPage] = useState(3);
  const [data, setData] = useState<Indication[]>(indiations);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchData = async (query: IndicationQuery) => {
    console.log(query);
    
    const { data, error }: any = await get_indications(query);
    console.log(data);
    setData(data.items);
    setCurrentPage(data.pageNumber);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchData(indiationQuery);
  }, []);
  
  useEffect(() => {
    indiationQuery.pageNumber = currentPage;
    indiationQuery.pageSize = pageSize;

    console.log(`useef:${indiationQuery.pageNumber}`);
    fetchData(indiationQuery);
  }, [currentPage, pageSize]);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Indication
      </h4>

      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of Indication"
          listTitleKey="indication_name"
        />
      </div>

      <div className="my-8 flex items-center justify-center md:justify-normal md:pl-14" >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          maxLength={7}
        />
      </div>
    </div>
  );
};

export default ListTable;
