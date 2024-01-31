"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useEffect, useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { ChangeRequestDashboardQuery } from "@/model/change-request";
import { useDashboardDropdown } from "@/hooks/rq-hooks/change-request-hooks";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const {data: _dropDown} = useDashboardDropdown();

  const defaultValues: ChangeRequestDashboardQuery = {
    userTypeId: null,
    protocolNumber: '',
    requestStatus: '',
    fromDate: null,
    toDate: null   
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ChangeRequestDashboardQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    const params = {
      userTypeId: value?.userTypeId?.value,
      protocolNumber: value?.protocolNumber?.label,
      requestStatus: value?.requestStatus?.value,
      toDate: value?.toDate?.startDate,
      fromDate: value?.fromDate?.startDate
    }
    setQueryData(params);
  }

  useEffect(() => {
    //console.log({"_dropDown" : _dropDown});
  }, [_dropDown])

  return (
    <div>
      <Breadcrumbs title="Change Request Dashboard" subTitle="Change Request Dashboard List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper py-2 md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} dropDown={_dropDown?.data} register={register} Controller={Controller} control={control}  reset={reset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className=" text-neutral-black">Search Change Request</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  dropDown={_dropDown?.data}  register={register} Controller={Controller} control={control} reset={reset}/>
            </div>
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm  dropDown={_dropDown?.data} register={register} Controller={Controller} control={control} reset={reset}/>}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
