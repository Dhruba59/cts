"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useEffect, useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { useGetUserDropdowns } from "@/hooks/rq-hooks/user-hooks";
import { convertTypeToSelectOption } from "@/utils/helpers";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const [userTypeOptions, setUserTypeOptions] = useState<SelectOptionType[]>([]);
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  const [suppressMatchTypeOptions, setSuppressMatchTypeOptions] = useState<SelectOptionType[]>([]);
  const [sitesOptions, setSitesOptions] = useState<SelectOptionType[]>([]);
  const { data: dropdowns, isLoading: isDropdownDataLoading } = useGetUserDropdowns();
  
  const form = useForm<any>({});
  const { handleSubmit } = form;

  const onSubmit = (value: any) => {
    //console.log(value);
    const params = {
      ...value,
      codeType: value?.codeType?.value,
      sponsor:value?.sponsor?.value,
      UserType: value?.userType?.value,
      SuppressMatchType: value?.SuppressMatchType?.value,
      Site: value?.site?.value
    }
    //delete params.date;
    //console.log(params);
    setQueryData(params);
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
        <div className="flex flex-row items-center justify-between gap-2 md:px-6 py-3">
          <h4 className="hidden lg:block text-neutral-black">
            Search Users
          </h4>
          <div className="">
          <SearchForm isAdvancedOpen={isChecked} form={form}/>
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr className="" />
        {isChecked && <AdvanceSearchForm 
              form={form} 
              userTypeOptions={userTypeOptions} 
              sponsorOptions={sponsorOptions} 
              suprressMatchTypeOptions={suppressMatchTypeOptions} 
              siteOptions={sitesOptions}
            />}
      </form>
      {/* <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm isAdvancedOpen={isChecked} form={form}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className=" text-neutral-black">Search Users</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked} form={form}/>
            </div>
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <hr />
          {isChecked && 
            <AdvanceSearchForm 
              form={form} 
              userTypeOptions={userTypeOptions} 
              sponsorOptions={sponsorOptions} 
              suprressMatchTypeOptions={suppressMatchTypeOptions} 
              siteOptions={sitesOptions}
            />}
        </section>
      </form> */}
    </div>
  );
};

export default ListHeader;
