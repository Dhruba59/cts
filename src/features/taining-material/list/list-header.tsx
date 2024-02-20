"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetStudyProtocols } from "@/hooks/rq-hooks/training-material-hooks";
import { TrainingMaterialQuery } from "@/model/training-material";


const ListHeader = ({ setQueryData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const { data: studyProtocolDropDown } = useGetStudyProtocols();

  //console.log(studyProtocolDropDown);

  const defaultValues: TrainingMaterialQuery = {
    trainingId: null,
    trainingName: '',
    passMarks: null,
    displayOrder: null,
    materialId: null,
    fileName: '',
    filePath: '',
    preScreen: null,
    active: null 
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TrainingMaterialQuery>({
    defaultValues: defaultValues
  });

  const onSubmit = (value: any) => {
    //console.log(value);
    const params = {
      ...value,
      trainingName: value?.trainingName?.value
    }

    setQueryData(params);
  }

  return (
    <div>
      <Breadcrumbs title="Training Meterial" subTitle="Training Meterial List" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:hidden">
          <SearchForm isAdvancedOpen={isChecked} studyProtocolDropDown={studyProtocolDropDown?.data} register={register} Controller={Controller} control={control} reset={reset} />
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between gap-1 px-2 py-2">
            <div className="flex-none md:w-24 xl:w-32">
              <h4 className="">Search Training Meterial</h4>
            </div>
            <div className="md:flex-none">
              <SearchForm isAdvancedOpen={isChecked} studyProtocolDropDown={studyProtocolDropDown?.data} register={register} Controller={Controller} control={control} reset={reset} />
            </div>
            <div className="flex-none w-22  hidden lg:block">
              <Toggle
                prefixLabel="More: "
                className="hidden lg:block"
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </div>
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm register={register} Controller={Controller} control={control} reset={reset} />}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
