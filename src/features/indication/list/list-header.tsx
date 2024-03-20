"use client";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";

const defaultValues: IndicationQuery = {
  code: null,
  indicationName: null,
  codeType: null,
  description: null,
  isRequireDetails: null,
};

const ListHeader = ({ setQueryData }: any) => {

  const { data: codeTypeDropDown } = useGetIndicationCodeTypes();

  const form = useForm<IndicationQuery>({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      codeType: value?.codeType?.value,
    };
    //delete params.date;
    setQueryData(params);
  };

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  };

  const tabFormContent = (
    <TabSearchBarContent
      codeTypeOptions={convertTypeToSelectOption(
        codeTypeDropDown?.data?.codeTypes
      )}
      form={form}
    />
  );

  return (
    <div>
      <Breadcrumbs title="Indication" subTitle="Indication List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar formContent={tabFormContent} onReset={onReset} />
        <DesktopSearchBar
          title="Search"
          searchFormContents={
            <SearchForm codeTypeDropDown={codeTypeDropDown?.data} form={form} />
          }
          advanceSearchFormContents={<AdvanceSearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;




    {/* <Breadcrumbs title="Indication" subTitle="Indication List" />
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
      </form> */}