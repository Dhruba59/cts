"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";
import { Dispatch, SetStateAction, useState } from "react";
import { AdvanceSearchForm, SearchForm } from "./search-form";
import { useForm } from "react-hook-form";
import { SearchLastSubjectsParams } from "@/model/subject";
import { ReprintMatchReportsType } from ".";

interface ListHeaderProps {
  setQueryData: Dispatch<SetStateAction<any | undefined>>;
}

const ListHeader = ({ setQueryData }: ListHeaderProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const form = useForm<any>();
  const { handleSubmit } = form;

  const onSubmit = (values: any) => {
    console.log(values);
    const params: ReprintMatchReportsType = {
      Protocol: values?.protocol?.value,
      SponsorSubjectId: values.subjectId,
      FromDate: values.fromDate?.startDate,
      ToDate: values.toDate?.startDate
    }
    setQueryData((data: ReprintMatchReportsType) => ({...data, ...params}));
  }

  return (
    <div className="sm:wrapper">
      <Breadcrumbs
        title="Subject Management"
        subTitle="Re-Print Match Reports"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs title="Study Information" subTitle="Study List" />
        <div className="flex flex-row items-center justify-between gap-2 md:px-6 py-3">
          <h4 className="hidden lg:block text-neutral-black">
            Search Study
          </h4>
          <div className="">
            <SearchForm isAdvancedOpen={isChecked} form={form} />
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr className="" />
        {isChecked && <AdvanceSearchForm form={form} />}
      </form>
    </div>
  );
};

export default ListHeader;
