"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { UserQuery } from "@/model/user";
import { initialDefaultQuery } from "@/utils/helpers";

const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);


  // const defaultValues: UserQuery = {
  //   // userId: 0,
  //   // linkId: 0,
  //   userName: '',
  //   firstName: '',
  //   middleName: '',
  //   lastName: '',
  //   email: '',
  //   active: undefined,
  //   lastLoginTime: '',
  //   inactiveOver: '',
  //   inactiveMonth: null
  // }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UserQuery>({
    // defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      inactiveMonth: value?.inactiveMonth?.value
    }

    setQueryData(params);
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="Dormant User" subTitle="Dormant User List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm  isAdvancedOpen={isChecked} register={register} Controller={Controller} control={control}  reset={onReset}/>
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className="">Search Dormant User</h4>
            <div className="">
              <SearchForm isAdvancedOpen={isChecked} register={register} Controller={Controller} control={control} reset={onReset}/>
            </div>
            {/* <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            /> */}
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm  register={register} Controller={Controller} control={control} reset={onReset}/>}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
