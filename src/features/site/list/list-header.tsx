"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { SiteQuery } from "@/model/site";
import { useGetFrequencyTypes } from "@/hooks/rq-hooks/site-hooks";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const {data: frequencyDropDown} = useGetFrequencyTypes();

  const defaultValues: SiteQuery = {
    siteId: 0,
    siteName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    siteNumber: '',
    siteZip: '',
    siteCode: '',
    sponsorId: 0,
    frequencyTypeId: 0,
    primaryContactPhone: '',
    primaryContactName: '',
    primaryContactEmail: '',
    locationId: '',
    piname: '',
    active: undefined   
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SiteQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    //console.log(value);
    const params = {
      ...value,
      codeType: value?.codeType?.value
    }

    setQueryData(params);
  }

  return (
    <div>
      <Breadcrumbs title="Site" subTitle="Site List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} register={register} Controller={Controller} control={control}  reset={reset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className="">Search Site</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  register={register} Controller={Controller} control={control} reset={reset}/>
            </div>
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm  frequencyDropDown={frequencyDropDown?.data} register={register} Controller={Controller} control={control} reset={reset}/>}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
