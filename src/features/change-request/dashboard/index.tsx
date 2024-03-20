import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import Pagination from "@/components/pagination";
import { SortingState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useChangeRequestDashboard } from "@/hooks/rq-hooks/change-request-hooks";
import { ChangeRequestDashboardQuery } from "@/model/change-request";
import { initialDefaultQuery } from "@/utils/helpers";

const ChangeRequestDashboardList = () => {

  const [queryData, setQueryData] = useState<ChangeRequestDashboardQuery>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: _data, error, isLoading, refetch: refetch
  } = useChangeRequestDashboard(queryData);
  

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
  }

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
  }, [sorting]);

  return (
    <main className="space-y-2">
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={_data?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading} refetch={refetch}/>
      <Pagination
        currentPage={_data?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={_data?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default ChangeRequestDashboardList;
