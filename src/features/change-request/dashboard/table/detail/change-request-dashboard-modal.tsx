import View from "@/components/icons/view";
import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import React, { useEffect, useState } from "react";
import { ChangeRequestAuditDetailQuery, ChangeRequestAuditQuery } from "@/model/change-request";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { SortingState } from "@tanstack/react-table";
import Pagination from "@/components/pagination";
import { useChangeRequestAuditDetail } from "@/hooks/rq-hooks/change-request-hooks";
import ChangeRequestDetailListTable from "./change-request-detail-list-table";

const ChangeRequestReviewDetailModal = ({ requestId, subjectId, regionGroupsId, onAccept, onReject, isSysAdmin }: any) => {

  const [queryData, setQueryData] = useState<ChangeRequestAuditDetailQuery>({
    subjectId: subjectId,
    regionGroupsId: regionGroupsId
  });
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>([
    //{ id: "indicationName", desc: false }
  ]);

  const { data: _data, error, isLoading, refetch: refetch
  } = useChangeRequestAuditDetail(queryData);

  useEffect(() => {
    console.log(_data);
  }, [_data])
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
    <Modal
      triggerProp={<View />}
      title="Changed Request Detail"
      containerClassName="flex flex-1 flex-col mx-10 "
      renderFooter={{
        onSave: () => { onAccept(requestId)},
        onReject: () => { onReject(requestId)},
        submitButtonName: isSysAdmin ? "Approve" : undefined,
        rejectButtonName: isSysAdmin ? "Reject" : undefined,
        cancelButtonName: "Close",
        cancelButtonOnly: isSysAdmin ? false : true
      }}
    >
      <div className="flex flex-col gap-2">
        <ChangeRequestDetailListTable data={_data?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading}/>
      </div>
    </Modal>
  );
};

export default ChangeRequestReviewDetailModal;
