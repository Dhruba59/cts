import { useEffect, useMemo, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { Indication, IndicationQuery } from "@/model/indication";
import Pagination from "@/components/pagination";
import { getIndicationCodeTypes, getIndications } from "@/service/indication-service";
import { SortingState } from "@tanstack/react-table";

import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useQuery } from "react-query";
import { MainContainer } from "@/components/style-container";
import { useGetIndications } from "@/hooks/rq-hooks/indication-hooks";
import { ChangeRequestReprintQuery } from "@/model/change-request";
import { useChangeRequestReprint } from "@/hooks/rq-hooks/change-request-hooks";

const ChangeRequestReprintList = () => {

  const [queryData, setQueryData] = useState<ChangeRequestReprintQuery>();
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([
    //{ id: "indicationName", desc: false }
  ]);

  const { data: _data, error, isLoading, refetch: refetch
  } = useChangeRequestReprint(queryData);
  

  console.log(queryData);
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
    setQueryData((data) => ({
      ...data,
      OrderBy: typeof orderby != 'undefined' && orderby ? orderby : null
    }));
  }, [sorting]);

  return (
    <main>
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={_data?.data?.items} sorting={sorting} setSorting={setSorting} isLoadingTableData={isLoading} />
      <Pagination
        currentPage={_data?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={_data?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default ChangeRequestReprintList;
