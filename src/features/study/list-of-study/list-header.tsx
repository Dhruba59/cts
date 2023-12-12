"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AdvanceSearchForm, SearchForm } from "./search-form";
import { StudyListQueryData } from "@/model/study";
import { Controller, useForm } from "react-hook-form";
import { useGetStudyDropdownsList } from "@/hooks/rq-hooks/study-hooks";

interface ListHeaderProps {
  setQueryData: Dispatch<SetStateAction<StudyListQueryData | undefined>>;
}

const ListHeader = ({ setQueryData }: ListHeaderProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const { data: StudydropdownList, error, isLoading, refetch } = useGetStudyDropdownsList();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<StudyListQueryData>();

  const onSubmit = (value: any) => {

    const params = {
      ...value,
      StudyStartDate: value?.date?.startDate,
      StudyEndDate: value?.date?.endDate,
      SponsorId: value?.SponsorId?.value,
      Phase: value?.Phase?.value
    }
    delete params.date;
    console.log(params);
    setQueryData(params);
  }

  return (
    <div className="sm:wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs title="Study Information" subTitle="Study List" />
        <div className="flex flex-row items-center justify-between gap-2 md:px-6 py-3">
          <h4 className="hidden lg:block text-neutral-black">
            Search Study
          </h4>
          <div className="">
            <SearchForm isAdvancedOpen={isChecked} register={register} reset={reset} Controller={Controller} control={control} />
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr className="" />
        {isChecked && <AdvanceSearchForm dropDownList={StudydropdownList?.data} register={register} reset={reset} Controller={Controller} control={control} />}
      </form>
    </div>
  );
};

export default ListHeader;
