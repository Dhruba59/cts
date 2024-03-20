import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { NationalIdTypeQuery } from "@/model/national-id-type";
import Pagination from "@/components/pagination";
import { SortingState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useGetNationalIdTypes } from "@/hooks/rq-hooks/national-id-type-hooks";
import { initialDefaultQuery } from "@/utils/helpers";

const NationalIdTypeList = () => {

  const [queryData, setQueryData] = useState<NationalIdTypeQuery>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: nationalIdTypeData, isLoading, refetch: refetchNationalIdType } = useGetNationalIdTypes(queryData);

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
      <ListTable data={nationalIdTypeData?.data?.items} sorting={sorting} setSorting={setSorting} refetchNationalIdType={refetchNationalIdType} isLoading={isLoading}/>
      <Pagination
        currentPage={nationalIdTypeData?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={nationalIdTypeData?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default NationalIdTypeList;
