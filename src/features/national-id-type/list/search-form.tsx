import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SelectOptionType } from "@/model/drop-down-list";
import { IdsTabSearchBarContentProps } from "@/model/national-id-type";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

interface SearchFormProps extends BasicTabSearchBarContentsProps{
  countryOptions: SelectOptionType[];
}
export function SearchForm({ form, countryOptions }: SearchFormProps) {
  const { register, control } = form;

  return (
    <Fragment>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="NationalID Type Name: " className="hidden lg:block" />
        <Input
          placeholder="Enter Type Name"
          className="md:w-48"
          {...register("typeName")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Country: " className="hidden lg:block" />
        <div className="w-32">
          <Controller
            control={control}
            name="countryId"
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={countryOptions} value={value} isClearable/>}
          />
        </div>
      </div>
    </Fragment>
  );
}

export function AdvanceSearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register } = form;

  return (
    <Fragment>
      <Input
        label="Description"
        placeholder="Enter description"
        {...register("description")}
      />
    </Fragment>
  );
}


export const TabSearchBarContent = ( { form, countryOptions }: IdsTabSearchBarContentProps) => {
  const { control, register } = form;
  return (
    <Fragment>
        <Input
          placeholder="Enter Type Name"
          className="md:w-48"
          {...register("typeName")}
        />
        <Controller
          control={control}
          name="countryId"
          render={({ field: { onChange, onBlur, value } }: any) =>
            <Select onChange={onChange} options={countryOptions} value={value} isClearable/>}
        />
        <Input
          placeholder="Enter description"
          // wrapperClassName="md:w-full"
          {...register("description")}
        />
    </Fragment>
  );
}
