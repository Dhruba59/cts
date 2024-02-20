"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";
import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { Controller, useForm } from "react-hook-form";
import { SponsorQuery } from "@/model/sponsor";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const defaultValues: SponsorQuery = {
    sponsorId: 0,
    sponsorName: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    zip: '',
    state: '',
    active: null,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SponsorQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    const params = {
      ...value
    }
    setQueryData(params);
  }

  return (
    <div>
      <Breadcrumbs title="Sponsor" subTitle="Sponsor List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked}  register={register} Controller={Controller} control={control}  reset={reset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className="">Search Sponsor</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked}  register={register} Controller={Controller} control={control} reset={reset}/>
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
