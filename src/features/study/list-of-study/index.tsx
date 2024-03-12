'use client';
import React, { useEffect, useState } from 'react'
import ListHeader from './list-header'
import ListTable from './list-table'
import Pagination from '@/components/pagination'
import { useQuery } from 'react-query'
import { getStudyList } from '@/service/study-service';
import { DEFAULT_PAGE_SIZE } from '@/constants/common'
import { StudyListQueryData } from '@/model/study'
import { SortingState } from '@tanstack/react-table';
import { initialDefaultQuery } from '@/utils/helpers';

const StudyListFeature = () => {
  const [queryData, setQueryData] = useState<StudyListQueryData>(initialDefaultQuery);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: studyData, isLoading } = useQuery({
    queryFn: getStudyList,
    queryKey: ['sort', queryData],
  });

  const setCurrentPageNumber = (page: number) => {
    setQueryData((data) => {
      if (data) {
        return {
          ...data,
          pageNumber: page
        }
      } else {
        return { pageNumber: page };
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
    <main className='space-y-2'>
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={studyData?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
      <Pagination
        currentPage={studyData?.data?.pageNumber ?? 1}
        setCurrentPage={setCurrentPageNumber}
        lastPage={studyData?.data?.totalPages ?? 0}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  )
}

export default StudyListFeature