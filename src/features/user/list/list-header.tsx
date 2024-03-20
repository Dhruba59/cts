"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";

import { useEffect, useState } from "react";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { SelectOptionType } from "@/model/drop-down-list";
import { useForm } from "react-hook-form";
import { useGetUserDropdowns } from "@/hooks/rq-hooks/user-hooks";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { TabSearchBar } from "@/components/others/tab-searchbar";


const ListHeader = ({ setQueryData }: any) => {
  const [userTypeOptions, setUserTypeOptions] = useState<SelectOptionType[]>([]);
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  const [suppressMatchTypeOptions, setSuppressMatchTypeOptions] = useState<SelectOptionType[]>([]);
  const [sitesOptions, setSitesOptions] = useState<SelectOptionType[]>([]);
  const { data: dropdowns, isLoading: isDropdownDataLoading } = useGetUserDropdowns();
  
  const form = useForm<any>({});
  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      codeType: value?.codeType?.value,
      sponsor:value?.sponsor?.value,
      UserType: value?.userType?.value,
      SuppressMatchType: value?.SuppressMatchType?.value,
      Site: value?.Site?.value
    }
    setQueryData(params);
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  useEffect(() => {
    if (dropdowns) {
      setUserTypeOptions(convertTypeToSelectOption(dropdowns?.data?.userTypes));
      setSponsorOptions(convertTypeToSelectOption(dropdowns?.data?.sponsors));
      setSitesOptions(convertTypeToSelectOption(dropdowns?.data?.sites));
      setSuppressMatchTypeOptions(convertTypeToSelectOption(dropdowns?.data?.matchTypes));
    }
  }, [dropdowns])

  return (
    <div>
      <Breadcrumbs title="Users" subTitle="Users List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={
            <TabSearchBarContent
              form={form}
              userTypeOptions={userTypeOptions}
              sponsorOptions={sponsorOptions}
              suprressMatchTypeOptions={suppressMatchTypeOptions}
              siteOptions={sitesOptions}
            />
          }
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search User"
          searchFormContents={<SearchForm form={form} />}
          advanceSearchFormContents={
            <AdvanceSearchForm
              form={form}
              userTypeOptions={userTypeOptions}
              sponsorOptions={sponsorOptions}
              suprressMatchTypeOptions={suppressMatchTypeOptions}
              siteOptions={sitesOptions}
            />
          }
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
