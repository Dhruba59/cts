"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { NationalIdTypeQuery } from "@/model/national-id-type";
import { useGetFrequencyTypes } from "@/hooks/rq-hooks/national-id-type-hooks";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const {data: frequencyTypeDropDown} = useGetFrequencyTypes();

  const defaultValues: NationalIdTypeQuery = {
    nationalTypeId: 0,
    nationalIdtypeName: '',
    description: '',
    frequencyTypeId: 0,
    active: undefined   
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<NationalIdTypeQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    //console.log(value);
    const params = {
      ...value,
      codeType: value?.codeType?.value
    }
    //delete params.date;
    //console.log(params);
    setQueryData(params);
  }

  return (
    <div>
      <Breadcrumbs title="NID Type" subTitle="NID Type List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} frequencyTypeDropDown={frequencyTypeDropDown?.data} register={register} Controller={Controller} control={control}  reset={reset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className="">Search NID Type</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  frequencyTypeDropDown={frequencyTypeDropDown?.data}  register={register} Controller={Controller} control={control} reset={reset}/>
            </div>
            {/* <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            /> */}
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm  register={register} Controller={Controller} control={control} reset={reset}/>}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
