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
  studyProtocolDropDown: any;
  register: any;
  Controller: any;
  control: any;
  reset: any;
}
export function SearchForm({
  isAdvancedOpen,
  studyProtocolDropDown,
  register,
  Controller,
  control,
  reset
}: SearchFormProps) {

  const [studyProtocolOptions, setStudyProtocolOptions] = useState<SelectOptionType[]>([]);

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
            isClearable
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={studyProtocolOptions} value={value} />}
          />
        </div>
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="File Name: " className="hidden lg:block" />
        <Input
          name="fileName"
          placeholder="Enter file name"
          className="md:w-40 xl:48"
          {...register("fileName")}
        />
      </div>

      <div className={`flex gap-2 ${isAdvancedOpen ? 'hidden' : 'block'}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
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
    </div>
    <div className="flex justify-center gap-4 mt-8 md:mt-14">
      <Button type="submit" className="px-8">Submit</Button>
      <Button type="button" className="px-8" variant="outline" onClick={() => reset()}>
        Reset
      </Button>
    </div>
  </div>
  );
}
