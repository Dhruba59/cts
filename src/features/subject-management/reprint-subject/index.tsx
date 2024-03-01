"use client";

import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/list-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { SortingState } from "@tanstack/react-table";
import { useQuery } from "react-query";
import Pagination from "@/components/pagination";
import { getLastReprintSubjects } from "@/service/subject-service";
import { LastReprintSubjectsParams } from "@/model/subject";
import { initialDefaultQuery } from "@/utils/helpers";

const SubjectReprint = () => {
  const [queryData, setQueryData] = useState<LastReprintSubjectsParams>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: subjectList, isLoading: isLoadingSubjectList } = useQuery({
    queryFn: getLastReprintSubjects,
    queryKey: ['lastReprintSubjects', queryData]
  });

  const setCurrentPageNumber = (page: number) => {
    setQueryData((data: any) => {
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
    const orderby: any = sorting.map((s) => `${s.id} ${s.desc ? 'desc' : 'asc'}`).join(',');
    setQueryData((data) => ({
      ...data as any,
      orderBy: typeof orderby != 'undefined' && orderby ? orderby : null
    }));
  }, [sorting]);

  // useEffect(() => {
  //   setQueryData((data) => ({
  //     ...data as any,
  //     OrderBy: 'DateEntered ASC'
  //   }));
  // }, []);

  useEffect(() => {
    setQueryData((data) => ({
      ...data as any,
      pageSize: pageSize
    }));
  }, [pageSize]);

  return (
    <main>
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={subjectList?.data?.items ?? []} sorting={sorting} setSorting={setSorting} isLoadingTableData={isLoadingSubjectList}/>
      <Pagination
        currentPage={subjectList?.data?.pageNumber ?? 1}
        lastPage={subjectList?.data?.totalPages ?? 0}
        maxLength={7}
        setCurrentPage={setCurrentPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </main>
  );
};

export default SubjectReprint;
