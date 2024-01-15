"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useEffect, useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { ChangeRequestAuditQuery } from "@/model/change-request";
import { useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { useRequestTypeDropdown } from "@/hooks/rq-hooks/change-request-hooks";
import { convertTypeToSelectOption } from "@/utils/helpers";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const [requestTypeOptions, setRequestTypeOptions] = useState<SelectOptionType[]>([]);
  const {data: requestTypeDropDown} = useRequestTypeDropdown();

  const defaultValues: ChangeRequestAuditQuery = {
    requestStatus: '',
    sponsorSubjectId: '',
    fromDate: '',
    toDate: ''
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ChangeRequestAuditQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    //console.log(value);

    const params = {
      ...value,
      requestStatus: value?.requestStatus?.value,
      fromDate:  value?.fromDate?.value ?? null,
      toDate:  value?.toDate?.value ?? null,
    }
    console.log(params);
    setQueryData(params);
  }

    //console.log(codeTypeDropDown);
    useEffect(() => {

      setRequestTypeOptions(convertTypeToSelectOption(requestTypeDropDown?.data ?? []));
  
    }, [requestTypeDropDown])
    
  return (
    <div>
      <Breadcrumbs title="Change Request Audit" subTitle="Change Request Audit List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} requestTypeDropDown={requestTypeOptions} register={register} Controller={Controller} control={control}  reset={reset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-2 py-3">
            <h4 className=" text-neutral-black">Search Request Audit</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  requestTypeDropDown={requestTypeOptions}  register={register} Controller={Controller} control={control} reset={reset}/>
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
