"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { SelectOptionType } from "@/model/drop-down-list";
import { StudyListQueryData } from "@/model/study";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Control, ControllerProps, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { DateValueType } from "react-tailwindcss-datepicker";

interface SearchFormProps {
  register: UseFormRegister<StudyListQueryData>;
  Controller: React.ElementType;
  control: Control<StudyListQueryData>;
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

const SearchForm: React.FC<SearchFormProps> = ({ isAdvancedOpen, register, reset }) => {
  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Study Name: " className="hidden xl:block" />
        <Input {...register('StudyName')} placeholder="Study name" />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden xl:block" />
        <Input {...register('ProtocolNumber')} placeholder="Protocol" />
      </div>
      <div className={`flex gap-3 ${isAdvancedOpen ? 'hidden' : 'block'}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;

const AdvanceSearchForm = ({ dropDownList, register, reset, Controller, control }: AdvancedSearchFormProps) => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [phaseOptions, setPhaseOptions] = useState<SelectOptionType[]>([]);
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    setPhaseOptions(convertTypeToSelectOption(dropDownList?.phases));
    setSponsorOptions(convertTypeToSelectOption(dropDownList?.sponsors));
  }, [dropDownList])

  return (
    <div className="hidden lg:block p-6 space-y-10">
      <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-8">
        <Controller
          control={control}
          name='SponsorId'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select onChange={onChange} label="Sponsor Name" options={sponsorOptions} value={value} />
          )}
        />

        <Controller
          control={control}
          name='Phase'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select onChange={onChange} label="Phase Name" placeholder="Pre screen phase" options={phaseOptions} value={value} />
          )}
        />


        <Input label="Max Subject" placeholder="example" {...register('MaxSubjects')} />
        <Input label="Subject ID Entry Format" placeholder="example" {...register('SubjectIdentryFormat')} />
        <Controller
          control={control}
          name='date'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection='down'
              value={value}
              onChange={(date) => {
                onChange(date);
                handleValueChange(date);
              }}
              placeholder="Start date  ⇀  End date"
              label="Date"
            />
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-8 items-start justify-start ">
          <div className="flex flex-col justify-start gap-2 items-start md:items-center h-full">
            <Label label='Pre Screen' />
            <Controller
              name="PreScreen"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox className="" onChange={onChange} checked={value} />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-start md:items-center h-full">
            <Label label='Sr.com Only' />
            <Controller
              name="Sr"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox className="" onChange={onChange} checked={value} />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-start md:items-center w-fit h-full">
            <Label label="Active" />
            <Controller
              name="Active"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox onChange={onChange} checked={value} />
              )}
            />
          </div>

        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-8 md:mt-14">
        <Button type="submit" className="px-8">Search</Button>
        <Button type="button" className="px-8" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export { AdvanceSearchForm, SearchForm };
