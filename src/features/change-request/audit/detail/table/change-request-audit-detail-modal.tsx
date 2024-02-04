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
import AuditDetailListTable from "./audit-detail-list-table";

const ChangeRequestAuditDetailModal = ({ subjectId, regionGroupsId, onHideDetail}: any) => {

  const [open, setOpen] = useState<boolean>(true);
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

  // useEffect(() => {
  //   //console.log(_data);
  //   //console.log(open);
  // }, [subjectId])
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
      open={open}
      onClose={() => {
        setOpen(false);
        onHideDetail();
      }} 
      title="Changed Request Audit Detail!"
      containerClassName="flex flex-1 flex-col mx-10"
      renderFooter={{
        cancelButtonName: "Close",
        cancelButtonOnly: true
      }}
    >
      <div className="flex flex-col gap-2">

        <AuditDetailListTable data={_data?.data?.items} sorting={sorting} setSorting={setSorting} isLoading={isLoading} />
        <Pagination
          currentPage={_data?.data?.pageNumber}
          setCurrentPage={setCurrentPageNumber}
          lastPage={_data?.data?.totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          maxLength={7}
        />
      </div>
    </Modal>
  );
};

export default ChangeRequestAuditDetailModal;
