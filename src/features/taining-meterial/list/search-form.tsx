import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useEffect, useState } from "react";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  codeTypeDropDown: any;
  register: any;
  Controller: any;
  control: any;
  reset: any;
}
export function SearchForm({
  isAdvancedOpen,
  codeTypeDropDown,
  register,
  Controller,
  control,
  reset
}: SearchFormProps) {

  const [codeTypeOptions, setCodeTypeOptions] = useState<SelectOptionType[]>([]);

  useEffect(() => {

    setCodeTypeOptions(convertTypeToSelectOption(codeTypeDropDown?.codeTypes));

  }, [codeTypeDropDown])

  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Study Protocol: " className="hidden lg:block" />
        <div className="w-32">
          <Controller
            control={control}
            name="codeType"
            isClearable
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={codeTypeOptions} value={value} />}
          />
        </div>
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="File Name: " className="hidden lg:block" />
        <Input
          name="code"
          placeholder="Enter indication code"
          className="md:w-48"
          {...register("code")}
        />
      </div>

      <div className={`flex gap-3 ${isAdvancedOpen ? 'hidden' : 'block'}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="submit" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export function AdvanceSearchForm({ register, Controller, control, reset }: any) {
  const defaultValues = {

    codeType: { value: "", label: "Select " },

  };

  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      <div>
        <Input
          label="File Path"
          placeholder="Enter PI name"
          {...register("piname", {
            required: "PI name is required!"
          })}
        />

      </div>
      <div className="flex flex-row items-center">
        <Controller
          name="Partial Date Allowed"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) =>
            <Checkbox className="" onChange={onChange} value={value} checked={value} />}
        />
        <Label label="Partial Date Allowed" />
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-8 md:mt-14">
      <Button type="submit" className="px-8">Submit</Button>
      <Button className="px-8" variant="outline" onClick={() => reset()}>
        Reset
      </Button>
    </div>
  </div>
  );
}
