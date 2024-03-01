"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { initialDefaultQuery } from "@/utils/helpers";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const {data: codeTypeDropDown} = useGetIndicationCodeTypes();

  const defaultValues: IndicationQuery = {
    code: '',
    indicationName: '',
    codeType: '',
    description: '',
    isRequireDetails: undefined   
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IndicationQuery>({
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

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="Indication" subTitle="Indication List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} codeTypeDropDown={codeTypeDropDown?.data} register={register} Controller={Controller} control={control}  reset={onReset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className="">Search Indication</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  codeTypeDropDown={codeTypeDropDown?.data}  register={register} Controller={Controller} control={control} reset={onReset}/>
            </div>
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm  register={register} Controller={Controller} control={control} reset={onReset}/>}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
