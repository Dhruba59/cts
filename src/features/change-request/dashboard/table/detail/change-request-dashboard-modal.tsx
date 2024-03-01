import React, { useEffect, useState } from "react";
import { ChangeRequestReviewDetailQuery } from "@/model/change-request";
import { useViewChangeRequestDetail } from "@/hooks/rq-hooks/change-request-hooks";
import ChangeRequestDetailListTable from "./change-request-detail-list-table";

const ChangeRequestReviewDetailModal = ({ requestId, onAccept, onReject, isSysAdmin }: any) => {

  //const [requestId, setRequestId] = useState<number>(0);
  const [queryData, setQueryData] = useState<ChangeRequestReviewDetailQuery>({
    changeRequestId: requestId
  });


  const { data: _data, error, isLoading, refetch: refetch
  } = useViewChangeRequestDetail(queryData);

  useEffect(() => {
    // console.log(`RequestId: ${requestId}`);
  }, [requestId])
  
  useEffect(() => {
    // console.log(_data);
  }, [_data])


  return (
    <ChangeRequestDetailListTable data={_data?.data} isLoading={isLoading}/>
  );
};

export default ChangeRequestReviewDetailModal;
