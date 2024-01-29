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
import { useChangeRequestDashboard, useChangeRequestDashboardDropdowns, useChangeRequestReprintDropdowns } from "@/hooks/rq-hooks/change-request-hooks";
import { useSession } from "next-auth/react";
import { USER_ROLE_ENUM } from "@/model/enum";
import { QueriesObserver } from "react-query";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);
 
  const { data: session } = useSession();
  // @ts-ignore
  const { data: reprintDropdowns } = useChangeRequestReprintDropdowns();
  const { data: dropdowns } = useChangeRequestDashboardDropdowns();

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
  const form = useForm<ChangeRequestReprintQuery>({
    defaultValues: defaultValues
  });
  const { handleSubmit } = form;

  const onSubmit = (values: any) => {
    const params = {
      ...values,
      SiteStudyId: values?.SiteStudyId?.value,
      RegionGroup: values?.RegionGroup?.value,
      SiteId: values?.SiteId?.value,
      FromDate: values?.FromDate?.startDate,
      ToDate: values?.ToDate?.startDate,
      DateOfBirth: values?.DateOfBirth?.startDate
    }
    setQueryData(params);
  }

  return (
    <div className="sm:wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs title="Study Information" subTitle="Reprint List" />
        <div className="flex flex-row items-center justify-between gap-2 px-0 sm:px-6 py-3">
          <h4 className=" text-neutral-black">Search for Request & Reprint</h4>
          <div className="">
            <SearchForm isAdvancedOpen={isChecked} form={form} dropdownsData={dropdowns?.data}/>
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr className="" />
        {isChecked && <AdvanceSearchForm form={form} dropdownsData={reprintDropdowns?.data}/>}
      </form>
    </div>
    // <div className="sm:wrapper">
    //   <form className="" onSubmit={handleSubmit(onSubmit)}>
    //     <Breadcrumbs title="Change Request & Reprint" subTitle="Change Request & Reprint List" />
    //     <div className="md:hidden">
    //       <SearchForm isAdvancedOpen={isChecked}  register={register} Controller={Controller} control={control} reset={reset} />
    //     </div>

    //     <div className="flex flex-row items-center justify-between md:px-2 lg:px-3 py-3 gap-1">
    //       <h4 className=" text-neutral-black">Search for Request & Reprint</h4>
    //       <div className="">
    //         <SearchForm isAdvancedOpen={isChecked} register={register} Controller={Controller} control={control} reset={reset} />
    //       </div>
    //       <div className="ml-4">
    //         <Toggle
    //           prefixLabel="More: "
    //           className="hidden lg:block"
    //           isChecked={isChecked}
    //           setIsChecked={setIsChecked}
    //         />
    //       </div>
    //     </div>
    //     <hr />
    //     {isChecked && <AdvanceSearchForm dropDownList={codeTypeDropDown?.data} register={register} Controller={Controller} control={control} reset={reset} />}

    //   </form>
    // </div>
  );
};

export default ListHeader;
