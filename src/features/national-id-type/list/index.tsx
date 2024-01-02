import { useEffect, useMemo, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { NationalIdType, NationalIdTypeQuery } from "@/model/national-id-type";
import Pagination from "@/components/pagination";
import { getFrequencyTypes, getNationalIdTypes } from "@/service/national-id-type-service";
import { SortingState } from "@tanstack/react-table";

import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useQuery } from "react-query";
import { MainContainer } from "@/components/style-container";
import { useGetNationalIdTypes } from "@/hooks/rq-hooks/national-id-type-hooks";

const NationalIdTypeList = () => {

  const [queryData, setQueryData] = useState<NationalIdTypeQuery>();
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([
    //{ id: "indicationName", desc: false }
  ]);

  const { data: nationalIdTypeData, refetch: refetchNationalIdType } = useGetNationalIdTypes(queryData)
  // const { data: nationalIdTypeData, refetch: refetchNationalIdType } = useQuery({
  //   queryFn: getNationalIdTypes,
  //   queryKey: ['sort', queryData],
  // });

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
          PageSize: pageSize
        }
      } else {
        return { PageSize: pageSize };
      };
    });
  }, [pageSize]);

  useEffect(() => {
    const orderby: any = sorting.map((s) => `${s.id} ${s.desc ? 'desc' : 'asc'}`).join(',');
    //console.log(orderby)

    setQueryData((data) => ({
      ...data,
      OrderBy: typeof orderby != 'undefined' && orderby ? orderby : null
    }));
  }, [sorting]);

  return (
    <main>
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={nationalIdTypeData?.data?.items} sorting={sorting} setSorting={setSorting} refetchNationalIdType={refetchNationalIdType}/>
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
