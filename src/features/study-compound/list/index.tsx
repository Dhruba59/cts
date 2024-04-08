import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { StudyCompoundQuery } from "@/model/study-compound";
import Pagination from "@/components/pagination";
import { SortingState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useGetStudyCompounds } from "@/hooks/rq-hooks/study-compound-hooks";
import { initialDefaultQuery } from "@/utils/helpers";

const StudyCompoundList = () => {

  const [queryData, setQueryData] = useState<StudyCompoundQuery>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: studyCompoundData, isLoading, refetch } = useGetStudyCompounds(queryData)

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
      <ListTable data={studyCompoundData?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading} refetch={refetch}/>
      <Pagination
        currentPage={studyCompoundData?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={studyCompoundData?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default StudyCompoundList;
