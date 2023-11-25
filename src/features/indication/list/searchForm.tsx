import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { get_indication_code_types } from "@/service/indication-service";
import { useEffect, useState } from "react";

interface SearchFormProps {
  codeTypes: SelectOptionType[];
  register: any;
  Controller: any;
  control: any;
  reset: any;
}
export function SearchForm({
  codeTypes,
  register,
  Controller,
  control,
  reset
}: SearchFormProps) {

  const defaultValues = {
    codeType: { value: "ICD-10", label: "ICD-10" },
    code: '',
    indicationName: '',
    description: '',
    isRequireDetails: null
  };

  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Code: " className="hidden lg:block" />
        <Input
          name="code"
          placeholder="Enter indication code"
          className="md:w-48"
          {...register("code")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Code Type: " className="hidden lg:block" />
        <div className="w-32">
          <Controller
            control={control}
            name="codeType"
            defaultValue={""}
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} label="" options={codeTypes} />}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button className="" variant="outline" onClick={() => reset(defaultValues)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export function AdvanceSearchForm({ register, Controller, control, reset }: any) {
  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="flex flex-row items-center gap-5">
        <Input
          name="indicationName"
          label="Indication name"
          placeholder="Enter Indication name"
          className="md:w-72"
          {...register("indicationName")}
        />
        <Input
          name="description"
          label="Description"
          placeholder="Enter description"
          wrapperClassName="md:w-full"
          {...register("description")}
        />
      </div>

      <div className="flex flex-row items-center">
        <Controller
          name="isRequireDetails"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) =>
            <Checkbox className="" onChange={onChange} />}
        />
        <Label label="Require Details" />
      </div>
      {/* <div className="flex items-center justify-center gap-4 !mt-2">
        <Button className="px-8" variant="outline">
          Cancel
        </Button>
        <Button className="">Advance Search</Button>
      </div> */}
    </div>
  );
}
