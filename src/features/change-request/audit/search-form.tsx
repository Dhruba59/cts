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

  //console.log(codeTypeDropDown);
  useEffect(() => {

    setCodeTypeOptions(convertTypeToSelectOption(codeTypeDropDown?.codeTypes));

  }, [codeTypeDropDown])

  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Code Type: " className="hidden lg:block" />
        <div className="w-32">
          <Controller
            control={control}
            name="codeType"
            isClearable
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={codeTypeOptions}  value={value}/>}
          />
        </div>
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

      <div className="flex flex-grow justify-between">
        <div className="flex flex-row items-center -mt-6">
          <Controller
            name="isRequireDetails"
            control={control}
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Checkbox className="" onChange={onChange} />}
          />
          <Label label="Require Details" className="-mt-1" />
        </div>
        <div className="flex gap-3">
          <Button type="submit" className="!h-10 mb-[1px]">
            Search
          </Button>
          <Button type="submit" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
