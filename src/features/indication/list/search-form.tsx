
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SelectOptionType } from "@/model/drop-down-list";
import { IndicationTabSearchBarContentProps, SearchFormProps } from "@/model/indication";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { Fragment, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export function SearchForm({
  codeTypeDropDown,
  form
}: SearchFormProps) {
  const { register, control } = form;
  const [codeTypeOptions, setCodeTypeOptions] = useState<SelectOptionType[]>([]);
  
  useEffect(() => {
    setCodeTypeOptions(convertTypeToSelectOption(codeTypeDropDown?.codeTypes));
  }, [codeTypeDropDown])

  return (
    <Fragment>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Code: " className="hidden lg:block" />
        <Input
          placeholder="Indication code"
          className="w-32 xl:w-48"
          {...register("code")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Code Type: " className="hidden lg:block" />
        <div className="w-32 xl:w-48">
          <Controller
            control={control}
            name="codeType"
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={codeTypeOptions} value={value} isClearable/>}
          />
        </div>
      </div>
    </Fragment>
  );
}

export function AdvanceSearchForm({ form }: BasicTabSearchBarContentsProps) {
 const { register, control } = form;

  return (
    <Fragment>
      <Input
        label="Indication name"
        placeholder="Enter Indication name"
        className="md:w-48 lg:w-72"
        {...register("indicationName")}
      />
      <Textarea
        label="Description"
        placeholder="Enter description"
        className="md:w-48 lg:w-72 !min-h-[20px] h-10"
        {...register("description")}
      />
      <div className="flex flex-col justify-start md:gap-6 items-start md:items-start w-64 h-full">
        <Label label="Require Details"/>
          <Controller
            name="isRequireDetails"
            control={control}
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Checkbox onChange={onChange} value={value} checked={value} />}
          />
      </div>
    </Fragment>
  );
}


export const TabSearchBarContent = ( { form, codeTypeOptions }: IndicationTabSearchBarContentProps) => {
  const { control, register } = form;
  
  return (
    <Fragment>
      <Input placeholder="Enter indication code" {...register("code")} />
      <Controller
        control={control}
        name="codeType"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            onChange={onChange}
            options={codeTypeOptions}
            value={value}
            isClearable
          />
        )}
      />
      <Input
        placeholder="Enter Indication name"
        {...register("indicationName")}
      />
      <Textarea
        placeholder="Enter description"
        className="!min-h-[20px] h-10"
        {...register("description")}
      />
      <div className="flex gap-3 ml-3">
        <Label label="Require Details" />
        <Controller
          name="isRequireDetails"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Checkbox onChange={onChange} value={value} checked={value} />
          )}
        />
      </div>
    </Fragment>
  );
}
