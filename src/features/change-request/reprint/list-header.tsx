"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { ChangeRequestReprintQuery } from "@/model/change-request";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const {data: codeTypeDropDown} = useGetIndicationCodeTypes();

  const defaultValues: ChangeRequestReprintQuery = {
    regionGroup: 0,
    siteId: 0,
    siteStudyId: 0,
    subjectId: '',
    sirstInit: '',
    middleInit: '',
    lastInit: '',
    dateOfBirth: '',
    fromDate: '',
    toDate: '',
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ChangeRequestReprintQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      codeType: value?.codeType?.value
    }
    setQueryData(params);
  }

  return (
    <div>
      <Breadcrumbs title="Change Request & Reprint" subTitle="Change Request & Reprint List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} codeTypeDropDown={codeTypeDropDown?.data} register={register} Controller={Controller} control={control}  reset={reset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className=" text-neutral-black">Search for Request & Reprint</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  codeTypeDropDown={codeTypeDropDown?.data}  register={register} Controller={Controller} control={control} reset={reset}/>
            </div>
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm  register={register} Controller={Controller} control={control} reset={reset}/>}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
