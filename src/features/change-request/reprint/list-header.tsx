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
import { changeRequestReprintDefaultValue } from "../utils";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);
 
  const { data: session } = useSession();
  // @ts-ignore
  const { data: reprintDropdowns } = useChangeRequestReprintDropdowns();
  const { data: dropdowns } = useChangeRequestDashboardDropdowns();

  const form = useForm<ChangeRequestReprintQuery>({
    defaultValues: changeRequestReprintDefaultValue
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
        <div className="flex justify-between items-center px-0 sm:px-6 py-3">
          <h4 className=" text-neutral-black">Search</h4>
          <div className="flex items-center">
            <div className="flex flex-row justify-end items-center gap-2 ">
              {/* <h4 className=" text-neutral-black">Search for Request & Reprint</h4> */}
              <div className="">
                <SearchForm
                  isAdvancedOpen={isChecked}
                  form={form}
                  dropdownsData={dropdowns?.data}
                  setQueryData={setQueryData}
                />
              </div>
              <Toggle
                prefixLabel="More: "
                className="hidden lg:block"
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </div>
          </div>
        </div>

        <hr className="" />
        {isChecked && (
          <AdvanceSearchForm
            form={form}
            dropdownsData={reprintDropdowns?.data}
            setQueryData={setQueryData}
          />
        )}
      </form>
    </div>
  );
};

export default ListHeader;
