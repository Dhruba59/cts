import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { SelectOptionType } from "@/model/drop-down-list";
import { TrainingtTabSearchBarContentProps } from "@/model/training-material";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { Fragment, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface SearchFormProps {
  studyProtocolDropDown: any;
  form: UseFormReturn;
}
export function SearchForm({ studyProtocolDropDown, form }: SearchFormProps) {
  const [studyProtocolOptions, setStudyProtocolOptions] = useState<SelectOptionType[]>([]);
  const { control, register } = form;

  useEffect(() => {
    setStudyProtocolOptions(convertTypeToSelectOption(studyProtocolDropDown?.studyProtocols));
  }, [studyProtocolDropDown])

  return (
    <div className="flex items-end gap-2 md:gap-3 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Training Name: " className="hidden lg:block" />
        <div className="md:w-40 xl:48">
          <Controller
            control={control}
            name="trainingName"
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={studyProtocolOptions} value={value} isClearable/>}
          />
        </div>
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="File Name: " className="hidden lg:block" />
        <Input
          placeholder="Enter file name"
          className="md:w-40 xl:48"
          {...register("fileName")}
        />
      </div>
    </div>
  );
}

export function AdvanceSearchForm({ form }: any) {
  const { control, register } = form;
  return (
    <div className="flex gap-8 items-start">
      <div>
        <Input
          label="File Path"
          placeholder="Enter  file path"
          {...register("filePath")}
        />
      </div>
      <div className="flex flex-col justify-start mt-1 gap-5">
        <Label label="Pre Screen" />
        <Controller
          name="preScreen"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Checkbox
              className=""
              onChange={onChange}
              value={value}
              checked={value}
            />
          )}
        />
      </div>
    </div>
  );
};


export const TabSearchBarContent = ( { form, studyProtocolOptions }: TrainingtTabSearchBarContentProps) => {
  const { control, register } = form;
  return (
    <Fragment>
      <div>
        <Controller
          control={control}
          name="trainingName"
          render={({ field: { onChange, onBlur, value } }: any) =>
            <Select onChange={onChange} options={studyProtocolOptions} value={value} placeholder="Select Training"/>}
        />
      </div>
      <div className="">
        <Input
          placeholder="Enter file name"
          {...register("fileName")}
        />
      </div>
      <div>
        <Input
          placeholder="Enter  file path"
          {...register("filePath")}
        />
      </div>
      <div className="flex flex-row items-center">
        <Controller
          name="preScreen"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) =>
            <Checkbox className="" onChange={onChange} value={value} checked={value} />}
        />
        <Label label="Pre Screen" />
      </div>
    </Fragment>
  );
}
