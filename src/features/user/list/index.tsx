import { useEffect, useMemo, useState } from "react";
import ListHeader from "./list-header";
import ListTable from "./table/listTable";
import { Indication, IndicationQuery } from "@/model/indication";
import Pagination from "@/components/pagination";
import { getIndicationCodeTypes, getIndications } from "@/service/indication-service";
import { SortingState } from "@tanstack/react-table";

import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { MainContainer } from "@/components/style-container";
import { useGetUsers } from "@/hooks/rq-hooks/user-hooks";

const UserList = () => {

  const [queryData, setQueryData] = useState<IndicationQuery>();
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([
    //{ id: "indicationName", desc: false }
  ]);
  const { data: usersData, error, isLoading: isLoadingUsers, refetch: refetchUsers
  } = useGetUsers(queryData);


  
  //console.log(studyData);

  // const { data: studyData } = useQuery({
  //   queryFn: getIndications,
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
    setQueryData((data) => ({
      ...data,
      OrderBy: typeof orderby != 'undefined' && orderby ? orderby : null
    }));
  }, [sorting]);

  return (
    <main>
      <ListHeader setQueryData={setQueryData} />
      <ListTable data={usersData?.data?.items} sorting={sorting} setSorting={setSorting} />
      <Pagination
        currentPage={usersData?.data?.pageNumber}
        setCurrentPage={setCurrentPageNumber}
        lastPage={usersData?.data?.totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxLength={7}
      />
    </main>
  );
};

export default UserList;
