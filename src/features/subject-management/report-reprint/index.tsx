"use client";

import { useEffect, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/list-table";
import { SortingState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { getReprintMatchReports, searchLastSubjects } from "@/service/subject-service";
import { useQuery } from "react-query";
import Pagination from "@/components/pagination";

export interface ReprintMatchReportsType {
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: string;
  Protocol?: number;
  SponsorSubjectId?: string;
  FromDate?: string;
  ToDate?: string;
}

const ReprintReport = () => {
  const [queryData, setQueryData] = useState<ReprintMatchReportsType>();
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: reports, isLoading: isLoadingReports } = useQuery({
    queryFn: getReprintMatchReports,
    queryKey: ['reprintReports', queryData]
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
    setQueryData((data) => {
      if (data) {
        return {
          ...data,
          PageSize: pageSize
        }
      } else {
        return { PageSize: pageSize };
      };
    });
  }, [pageSize]);

  return (
    <main>
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={reports?.data?.items} isLoadingTableData={isLoadingReports}/>
      <Pagination
        currentPage={reports?.data?.pageNumber ?? 1}
        lastPage={reports?.data?.totalPages ?? 0}
        maxLength={7}
        setCurrentPage={setCurrentPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </main>
  );
};

export default ReprintReport;
