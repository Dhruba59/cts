import View from "@/components/icons/view";
import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import React, { useEffect, useState } from "react";
import { ChangeRequestAuditDetailQuery, ChangeRequestAuditQuery, ChangeRequestReviewDetailQuery } from "@/model/change-request";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { SortingState } from "@tanstack/react-table";
import Pagination from "@/components/pagination";
import { useChangeRequestAuditDetail, useViewChangeRequestDetail } from "@/hooks/rq-hooks/change-request-hooks";
import ChangeRequestDetailListTable from "./change-request-detail-list-table";

const ChangeRequestReviewDetailModal = ({ requestId, onAccept, onReject, isSysAdmin }: any) => {

  //const [requestId, setRequestId] = useState<number>(0);
  const [queryData, setQueryData] = useState<ChangeRequestReviewDetailQuery>({
    changeRequestId: requestId
  });


  const { data: _data, error, isLoading, refetch: refetch
  } = useViewChangeRequestDetail(queryData);

  useEffect(() => {
    console.log(`RequestId: ${requestId}`);
  }, [requestId])
  
  useEffect(() => {
    console.log(_data);
  }, [_data])


  return (
    <ChangeRequestDetailListTable data={_data?.data} isLoading={isLoading}/>
  );
};

export default ChangeRequestReviewDetailModal;
