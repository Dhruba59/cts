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

const StudyListFeature = () => {
  const [queryData, setQueryData] = useState<StudyListQueryData>();
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: studyData } = useQuery({
    queryFn: getStudyList,
    queryKey: ['sort', queryData],
  });

  const setCurrentPageNumber = (page: number) => {
    setQueryData((data) => {
      if(data) {
        return {
          ...data,
          PageNumber: page
        }
      } else {
        return {PageNumber: page};
      }
    });
  }

  useEffect(() => {
    setQueryData((data) => {
      if(data) {
        return {
          ...data,
          PageSize: pageSize
        }
      } else {
        return {PageSize: pageSize};
      };
    });
  }, [pageSize]);

  useEffect(() => {
    sorting?.map((item) => {
      setQueryData((data) => ({
        ...data,
        OrderBy: `${item.id} ${item.desc ? 'desc' : 'asc'}`
      }));
    });
    
  }, [sorting]);

  return (
    <main className='w-full'>
      <ListHeader setQueryData={setQueryData}/>
      <ListTable data={studyData?.data?.items} sorting={sorting} setSorting={setSorting}/>
      <div className="flex items-center justify-center mb-20" >
        <Pagination
          currentPage={studyData?.data?.pageNumber ?? 1}
          setCurrentPage={setCurrentPageNumber}
          lastPage={studyData?.data?.totalPages ?? 0}
          pageSize={pageSize}
          setPageSize={setPageSize}
          maxLength={7}
        />
      </div>
    </main>
  )
}

export default StudyListFeature