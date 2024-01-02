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

  const { data: codeTypeDropDown } = useGetIndicationCodeTypes();

  const defaultValues: ChangeRequestReprintQuery = {
    regionGroup: 0,
    siteId: 0,
    siteStudyId: 0,
    subjectId: '',
    firstInit: '',
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
    <div className="sm:wrapper">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs title="Change Request & Reprint" subTitle="Change Request & Reprint List" />
        <div className="md:hidden">
          <SearchForm isAdvancedOpen={isChecked} codeTypeDropDown={codeTypeDropDown?.data} register={register} Controller={Controller} control={control} reset={reset} />
        </div>

        <div className="flex flex-row items-center justify-between md:px-2 lg:px-3 py-3 gap-1">
          <h4 className=" text-neutral-black">Search for Request & Reprint</h4>
          <div className="">
            <SearchForm isAdvancedOpen={isChecked} codeTypeDropDown={codeTypeDropDown?.data} register={register} Controller={Controller} control={control} reset={reset} />
          </div>
          <div className="ml-4">
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
        </div>
        <hr />
        {isChecked && <AdvanceSearchForm codeTypeDropDown={codeTypeDropDown?.data} register={register} Controller={Controller} control={control} reset={reset} />}

      </form>
    </div>
  );
};

export default ListHeader;
