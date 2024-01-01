"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { ChangeRequestReprintQuery } from "@/model/change-request";
import { SelectOptionType } from "@/model/drop-down-list";
import { StudyListQueryData } from "@/model/study";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Control, Controller, ControllerProps, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { DateValueType } from "react-tailwindcss-datepicker";

interface SearchFormProps {
  register: UseFormRegister<ChangeRequestReprintQuery>;
  Controller: React.ElementType;
  control: Control<ChangeRequestReprintQuery>;
  isAdvancedOpen: boolean;
  reset: any;
}

interface AdvancedSearchFormProps extends Omit<SearchFormProps, 'isAdvancedOpen'> {
  dropDownList: any;
}

const initialSearchFormValues = {
  StudyName: '',
  ProtocolNumber: '',
  SponsorId: '',
  Phase: '',
  MaxSubjects: '',
  SubjectIdentryFormat: '',
  date: {
    startDate: null,
    endDate: null
  },
  Sr: false,
  PreScreen: false,
  Active: false
}

const SearchForm: React.FC<SearchFormProps> = ({ isAdvancedOpen, register, Controller, control, reset }) => {
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  return (
    <div className="flex justify-start gap-2 md:gap-3">
      <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden xl:block" />
        <Controller
          control={control}
          name='siteStudyId'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select className="md:w-36 xl:w-48" onChange={onChange} label="" options={sponsorOptions} value={value} />
          )}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Subject ID: " className="hidden lg:block" />
        <Input
          placeholder="Enter Subject ID"
          className="md:w-36  xl:w-48"
          {...register("subjectId")}
        />
      </div>
      <div>
        <Button className={`mb-[1px] w-fit ${isAdvancedOpen ? 'hidden' : 'block'}`} type="submit">Search</Button>
      </div>
    </div>
  );
};

export default SearchForm;

const AdvanceSearchForm = ({ dropDownList, register, Controller, control, reset }: AdvancedSearchFormProps) => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [phaseOptions, setPhaseOptions] = useState<SelectOptionType[]>([]);
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };

  useEffect(() => {
    setPhaseOptions(convertTypeToSelectOption(dropDownList?.phases));
    setSponsorOptions(convertTypeToSelectOption(dropDownList?.sponsors));
  }, [dropDownList])

  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-2">
        <Controller
          control={control}
          name='regionGroup'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              //className="md:w-36  xl:w-48" 
              onChange={onChange} label="Region Group" options={sponsorOptions} value={value} />
          )}
        />
        <Controller
          control={control}
          name='siteId'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              //className="md:w-36  xl:w-48" 
              onChange={onChange} label="Site Name" options={sponsorOptions} value={value} />
          )}
        />
        <div className="flex flex-col items-start justify-between gap-2 mt-1">
          <Label label="Subject Initials" className="hidden lg:block" />
          <div className="flex justify-around w-full">
            <Input
              placeholder="F"
              className="md:w-10 xl:16"
              {...register("firstInit")}
            />
            <Input
              placeholder="M"
              className="md:w-10 xl:16"
              {...register("middleInit")}
            />
            <Input
              placeholder="L"
              className="md:w-10 xl:16"
              {...register("lastInit")}
            />
          </div>
        </div>
        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              // containerClassName="md:w-36 xl:w-48"
              label="Date Of Birth"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
        <Controller
          control={control}
          name='fromDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              // containerClassName="md:w-36 xl:w-48"
              label="From Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
        <Controller
          control={control}
          name='toDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              // containerClassName="md:w-36 xl:w-48"
              label="To Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
      </div>

      <div className="flex items-center justify-end gap-4 !mt-10">
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
};

export { AdvanceSearchForm, SearchForm };
