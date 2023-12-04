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
  register: any;
  Controller: any;
  control: any;
  reset: any;
}
export function SearchForm({
  isAdvancedOpen,
  register,
  Controller,
  control,
  reset
}: SearchFormProps) {

  const [codeTypeOptions, setCodeTypeOptions] = useState<SelectOptionType[]>([]);

  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Study Compound name: " className="hidden lg:block" />
        <Input
          name="studyCompoundName"
          label=""
          placeholder="Enter study compound name"
          className="md:w-72"
          {...register("studyCompoundName")}
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
      <div className="flex flex-row items-center gap-5">
        <Input
          name="studyCompoundName"
          label="Study Compound name"
          placeholder="Enter study compound name"
          className="md:w-72"
          {...register("studyCompoundName")}
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
