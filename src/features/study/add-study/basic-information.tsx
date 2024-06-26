"use client";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { calculateDaysBetweenDates } from "@/utils/helpers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { DateValueType } from "react-tailwindcss-datepicker";

type DropdownList = {
  [key: string]: DropDownItem[];
};

interface BasicInformationFormProps {
  register: any;
  errors: any;
  setError: any;
  control: any;
  dropdownList: DropdownList;
  setValue: any;
  isPreScreen: boolean;
  setIsPreScreen: Dispatch<SetStateAction<boolean>>;
}

const BasicInformation = ({ dropdownList, register, setValue, errors, control, setError, isPreScreen, setIsPreScreen }: BasicInformationFormProps) => {
  const [commentOptions, setCommentOptions] = useState<SelectOptionType[]>([]);
  const [phaseOptions, setPhaseOptions] = useState<SelectOptionType[]>([]);
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  const [studyCompoundOptions, setStudyCompoundOptions] = useState<SelectOptionType[]>([]);

  const convertTypeToSelectOption = (data: DropDownItem[]): SelectOptionType[] => (
    data?.map((item: DropDownItem) => ({
      label: item.text,
      value: item.value,
    }))
  );

  const calculateStudyDuration = (date: DateValueType) => {
    if (date?.endDate && date?.startDate) {
      setValue('study_duration', calculateDaysBetweenDates(date?.startDate, date?.endDate))
    } else {
      setValue('study_duration', 0)
    }
  }

  useEffect(() => {
    setCommentOptions(convertTypeToSelectOption(dropdownList?.commentTypes))
    setPhaseOptions(convertTypeToSelectOption(dropdownList?.phases));
    setStudyCompoundOptions(convertTypeToSelectOption(dropdownList?.studyCompounds));
    setSponsorOptions(convertTypeToSelectOption(dropdownList?.sponsors));
  }, [dropdownList]);

  return (
    <section>
      <div className="wrapper">
        <h4 className=" px-6 py-4">Study Information</h4>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-4 p-8">
          <div>
            <Input
              label="Study Name"
              placeholder="Enter study name"
              {...register("studyName", {
                required: "Study name is required!"
              })}
            />
            {errors.studyName && (
              <span className="text-red-500 -mt-10">{errors.studyName.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="Study ID Entry Format"
              placeholder="Enter study format"
              {...register("subjectIdentryFormat", {
                required: isPreScreen ? false : "Study id format is required!"
              })}
            />
            {errors.subjectIdentryFormat && (
              <span className="text-red-500 -mt-10">{errors.subjectIdentryFormat.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="Protocol"
              placeholder="Protocol"
              {...register("protocolNumber", {
                required: "Protocol is required!"
              })}
            />
            {errors.protocolNumber && (
              <span className="text-red-500 -mt-10">{errors.protocolNumber.message as string}</span>
            )}
          </div>
          
          <div>
            <Input type="number" label="Max Subjects" placeholder="Max subjects" {...register('maxSubjects', { required: 'Max subject required!' })} />
            {errors.maxSubjects && (
              <span className="text-red-500 -mt-10">{errors.maxSubjects.message as string}</span>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name='date'
              rules={{
                required: "Date is required!",
                validate: (val: any) => {
                  if (!val.startDate || !val.endDate) {
                    setError("date", { type: 'custom', message: "Date is required!" });
                    return "Date is required!";
                  }
                  return true;
                }
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  popoverDirection='down'
                  value={value}
                  onChange={(date) => {
                    onChange(date);
                    calculateStudyDuration(date);
                  }}
                  placeholder="Start date   ⇀   End date"
                  label="Date"
                />
              )}
            />
            {errors.date && (
              <span className="text-red-500 -mt-10">{errors.date.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="Study Duration"
              disabled
              placeholder="Enter study duration"
              {...register("study_duration")}
            />
            {errors.study_duration && (
              <span className="text-red-500 -mt-10">{errors.study_duration.message as string}</span>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name='studyCommentType'
              rules={{
                required: 'Comment is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select onChange={onChange} label="Comment type" options={commentOptions} value={value}/>
              )}
            />
            {errors.studyCommentType && (
              <span className="text-red-500 -mt-10">{errors.studyCommentType.message as string}</span>
            )}
          </div>         
          <div>
            <Controller
              control={control}
              name='phase'
              rules={{
                required: 'Phase is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select onChange={onChange} label="Phase" options={phaseOptions} value={value} />
              )}
            />
            {errors.phase && (
              <span className="text-red-500 -mt-10">{errors.phase.message as string}</span>
            )}
          </div>
          
          <div>
            <Controller
              control={control}
              name='sponsor'
              rules={{
                required: "Sponsore is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select onChange={onChange} label="Sponsor" options={sponsorOptions} value={value}/>
              )}
            />
            {errors.sponsor && (
              <span className="text-red-500 -mt-10">{errors.sponsor.message as string}</span>
            )}
          </div>
          <div>
            <Controller
              name="studyCompound"
              control={control}
              rules={{
                required: "Study compound is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select onChange={onChange} label="Study Compound" options={studyCompoundOptions} value={value} />
              )}
            />
            {errors.studyCompound && (
              <span className="text-red-500 -mt-10">{errors.studyCompound.message as string}</span>
            )}
          </div>
          <div className="flex gap-8 items-start justify-start">
            <div className="flex flex-col justify-start gap-6 items-start md:items-center h-full">
              <Label label='Pre Screen' />
              <Controller
                name="preScreen"
                control={control}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Checkbox 
                    onChange={(e) => {
                      onChange(e);
                      setIsPreScreen(e.target.checked);
                    }} 
                    value={value} 
                    checked={value} 
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-6 justify-start items-start md:items-center h-full">
              <Label label='Sr.com Only' />
              <Controller
                name="sr"
                control={control}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Checkbox onChange={onChange} value={value} checked={value}/>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 justify-start items-start md:items-center w-fit h-full">
            <Label label="Active" />
            <Controller
              name="active"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox onChange={onChange} value={value} checked={value} />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;
