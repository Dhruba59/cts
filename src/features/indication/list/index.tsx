import { useEffect, useMemo, useState } from "react";
import ListHeader from "./listHeader";
import ListTable from "./table/listTable";
import { Indication, IndicationQuery } from "@/model/indication";
import Pagination from "@/components/pagination";
import { get_indication_code_types, get_indications } from "@/service/indication-service";
import { SortingState } from "@tanstack/react-table";

import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useQuery } from "react-query";
import {MainContainer, PaginationContainer} from "@/components/style-container";

const IndicationList = () => {

  const [queryData, setQueryData] = useState<IndicationQuery>();
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([
    //{ id: "indicationName", desc: false }
  ]);

  const { data: studyData } = useQuery({
    queryFn: get_indications,
    queryKey: ['sort', queryData],
  });

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
      OrderBy: typeof orderby!='undefined' && orderby ? orderby : null  
    }));
  }, [sorting]);

  return (
    <MainContainer >
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={studyData?.data?.items} sorting={sorting} setSorting={setSorting} />
      <PaginationContainer>
        <Pagination
          currentPage={studyData?.data?.pageNumber}
          setCurrentPage={setCurrentPageNumber}
          lastPage={studyData?.data?.totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          maxLength={7}
        />
      </PaginationContainer>
    </MainContainer>
  );
};

export default IndicationList;
