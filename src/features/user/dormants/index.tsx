import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { UserQuery } from "@/model/user";
import Pagination from "@/components/pagination";
import { SortingState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useGetDormantUsers } from "@/hooks/rq-hooks/user-hooks";
import { initialDefaultQuery } from "@/utils/helpers";


const DormantUserList = () => {

  const [queryData, setQueryData] = useState<UserQuery>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: dormantUserData, error, isLoading, refetch: refetch
  } = useGetDormantUsers(queryData);

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
      <ListTable data={dormantUserData?.data?.items} pageSize={pageSize} totalPages={dormantUserData?.data?.totalPages} sorting={sorting} setSorting={setSorting}
        isLoading={isLoading} refetch={refetch} />
      <Pagination
        currentPage={dormantUserData?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={dormantUserData?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default DormantUserList;
