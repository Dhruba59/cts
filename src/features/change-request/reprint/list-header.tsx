"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { useState } from "react";
import { SearchForm, AdvanceSearchForm, TabSearchForm } from "./search-form";
import { useForm } from "react-hook-form";
import { ChangeRequestReprintQuery } from "@/model/change-request";
import { useChangeRequestReprintDropdowns } from "@/hooks/rq-hooks/change-request-hooks";
import { useSession } from "next-auth/react";
import { changeRequestReprintDefaultValue } from "../utils";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";


const ListHeader = ({ setQueryData }: any) => {
  const { data: reprintDropdowns } = useChangeRequestReprintDropdowns();
  
  const protocolsOptions = convertTypeToSelectOption(reprintDropdowns?.data?.protocols)
  const regionOptions = convertTypeToSelectOption(reprintDropdowns?.data?.regionGroups);
  const siteOptions = convertTypeToSelectOption(reprintDropdowns?.data?.sites);
  
  const form = useForm<ChangeRequestReprintQuery>({
    defaultValues: changeRequestReprintDefaultValue
  });
  const { handleSubmit, reset } = form;

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  const onSubmit = (values: any) => {
    const params = {
      studyId: values?.StudyId?.value,
      regionGroup: values?.RegionGroup?.value,
      siteId: values?.SiteId?.value,
      fromDate: values?.FromDate?.startDate,
      toDate: values?.ToDate?.startDate,
      dateOfBirth: values?.DateOfBirth?.startDate,
      SubjectId: values?.SubjectId,
      FirstInit: values?.FirstInit,
      MiddleInit: values?.MiddleInit,
      LastInit: values?.LastInit,
    }
    setQueryData(params);
  }

  return (
    <div>
      <Breadcrumbs title="Change Request" subTitle="Reprint List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<TabSearchForm form={form} protocolOptions={protocolsOptions}regionGroupOptions={regionOptions} siteOptions={siteOptions} />}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search"
          searchFormContents={<SearchForm form={form} protocolOptions={protocolsOptions} />}
          advanceSearchFormContents={<AdvanceSearchForm form={form} regionGroupOptions={regionOptions} siteOptions={siteOptions} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
