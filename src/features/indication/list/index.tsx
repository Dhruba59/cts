import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { IndicationQuery } from "@/model/indication";
import Pagination from "@/components/pagination";
import { SortingState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useGetIndications } from "@/hooks/rq-hooks/indication-hooks";
import { initialDefaultQuery } from "@/utils/helpers";

const IndicationList = () => {
  
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [queryData, setQueryData] = useState<IndicationQuery>(initialDefaultQuery);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: studyData, isLoading } = useGetIndications(queryData);

  const setCurrentPageNumber = (page: number) => {
    setQueryData((data) => {
      if (data) {
        return {
          ...data,
          PageNumber: page
        }
      } else {
        return { PageNumber: page };
      }
    });
  };

  useEffect(() => {
      setQueryData((data) => {
        if (data) {
          return {
            ...data,
            pageSize: pageSize
          }
        } else {
          return { pageSize: pageSize };
        };
      });
  }, [pageSize]);

  useEffect(() => {
    const orderby: any = sorting.map((s) => `${s.id} ${s.desc ? 'desc' : 'asc'}`).join(',');
    setQueryData((data) => ({
      ...data,
      orderBy: typeof orderby != 'undefined' && orderby ? orderby : null
    }));
  }, [sorting])

  return (
    <main className="space-y-2">
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={studyData?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      <Pagination
        currentPage={studyData?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={studyData?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default IndicationList;
