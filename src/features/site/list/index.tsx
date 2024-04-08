import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { SiteQuery } from "@/model/site";
import Pagination from "@/components/pagination";
import { SortingState } from "@tanstack/react-table";

import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useGetSites } from "@/hooks/rq-hooks/site-hooks";
import { initialDefaultQuery } from "@/utils/helpers";

const SiteList = () => {

  const [queryData, setQueryData] = useState<SiteQuery>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: siteData, isLoading, refetch } = useGetSites(queryData);

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
      <ListTable data={siteData?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading} refetch={refetch}/>
      <Pagination
        currentPage={siteData?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={siteData?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default SiteList;
