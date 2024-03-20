"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useEffect, useState } from "react";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { ChangeRequestAuditFields, ChangeRequestAuditQuery } from "@/model/change-request";
import { useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { useRequestTypeDropdown } from "@/hooks/rq-hooks/change-request-hooks";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";


const defaultValues: ChangeRequestAuditFields = {
  requestStatus: '',
  sponsorSubjectId: '',
  fromDate: {
    startDate: null,
    endDate: null
  },
  toDate: {
    startDate: null,
    endDate: null
  },
}

const ListHeader = ({ setQueryData }: any) => {
  const {data: requestTypeDropDown} = useRequestTypeDropdown();
  const requestTypeOptions = convertTypeToSelectOption(requestTypeDropDown?.data ?? []);

  const form = useForm<ChangeRequestAuditFields>({
    defaultValues: defaultValues
  });
  const { handleSubmit, reset } = form;

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      requestStatus: value?.requestStatus?.value,
      fromDate:  value?.fromDate?.startDate ?? null,
      toDate:  value?.toDate?.startDate ?? null,
    }
    setQueryData(params);
  }
    
  return (
    <div>
      <Breadcrumbs title="Change Request Audit" subTitle="Change Request Audit List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<TabSearchBarContent form={form} requestTypeOptions={requestTypeOptions}/>}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search"
          searchFormContents={<SearchForm form={form} requestTypeOptions={requestTypeOptions}/>}
          advanceSearchFormContents={<AdvanceSearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
