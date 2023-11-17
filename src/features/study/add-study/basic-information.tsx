"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Checkbox from "@/components/ui/checkbox";
import Datepicker2 from "@/components/ui/datepicker";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { calculateDaysBetweenDates } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";

type DropdownList = {
  [key: string]: DropDownItem[];
};

interface BasicInformationFormProps {
  register: any;
  errors: any;
  Controller: any;
  control: any;
  dropdownList: DropdownList;
}

const BasicInformation = ({ dropdownList, register, errors, control, Controller }: BasicInformationFormProps) => {
  const [commentOptions, setCommentOptions] = useState<SelectOptionType[]>([]);
  const [phaseOptions, setPhaseOptions] = useState<SelectOptionType[]>([]);
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>([]);
  const [studyCompoundOptions, setStudyCompoundOptions] = useState<SelectOptionType[]>([]);
  const [studyDuration, setStudyDuration] = useState<number>(0);

  const convertTypeToSelectOption = (data: DropDownItem[]): SelectOptionType[] => (
    data?.map((item: DropDownItem) => ({
      label: item.text,
      value: item.value,
    }))
  );

  const calculateStudyDuration = (date: DateValueType) => {
    if(date?.endDate && date?.startDate) {
      setStudyDuration(calculateDaysBetweenDates(date?.startDate, date?.endDate));
    }
  }

  useEffect(() => {
    setCommentOptions(convertTypeToSelectOption(dropdownList?.commentTypes))
    setPhaseOptions(convertTypeToSelectOption(dropdownList?.phases));
    setStudyCompoundOptions(convertTypeToSelectOption(dropdownList?.studyCompounds));
    setSponsorOptions(convertTypeToSelectOption(dropdownList?.sponsors));
  }, [dropdownList])

  return (
    <section>
      <Breadcrumbs title="Study Information" subTitle="Add Study" />
      <div className="wrapper">
        <h4 className=" px-6 py-4">Study Information</h4>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8 p-8">
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
              {...register("study_id_format", {
                required: "Study id format is required!"
              })}
            />
            {errors.study_id_format && (
              <span className="text-red-500 -mt-10">{errors.study_id_format.message as string}</span>
            )}
          </div>

          <div>
            <Input
              label="Study Duration"
              disabled
              value={studyDuration}
              placeholder="Enter study duration"
              {...register("study_duration", {
                // required: "Study duration is required!"
              })}
            />
            {errors.study_duration && (
              <span className="text-red-500 -mt-10">{errors.study_duration.message as string}</span>
            )}
          </div>

          <div>
            <Input
              label="Protocol"
              placeholder="Example"
              {...register("protocolNumber", {
                required: "Protocol is required!"
              })}
            />
            {errors.protocolNumber && (
              <span className="text-red-500 -mt-10">{errors.protocolNumber.message as string}</span>
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
                <Select onChange={onChange} label="Comment type" options={commentOptions} />
              )}
            />
            {errors.studyCommentType && (
              <span className="text-red-500 -mt-10">{errors.studyCommentType.message as string}</span>
            )}
          </div>

          <div>
            <Input type="number" label="Max Subjects" placeholder="Max subjects" {...register('maxSubjects', { required: 'max subject required!' })} />
            {errors.maxSubjects && (
              <span className="text-red-500 -mt-10">{errors.maxSubjects.message as string}</span>
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
                <Select onChange={onChange} label="Phase" options={phaseOptions} />
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
                <Select onChange={onChange} label="Sponsor" options={sponsorOptions} />
              )}
            />
            {errors.sponsor && (
              <span className="text-red-500 -mt-10">{errors.sponsor.message as string}</span>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name='date'
              rules={{
                required: "Date is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
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
            <Controller
              name="studyCompound"
              control={control}
              rules={{
                required: "Study compound is required!",
              }}
              render={({ field: { onChange, onBlur } }: any) => (
                <Select onChange={onChange} label="Study Compound" options={studyCompoundOptions} />
              )}
            />
            {errors.studyCompound && (
              <span className="text-red-500 -mt-10">{errors.studyCompound.message as string}</span>
            )}

          </div>

          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-2 ml-2 items-center">
              <Label label='Pre Screen' />
              <input
                id="pre"
                name="preScreen"
                type="radio"
                {...register("preScreen")}
              />
            </div>
            <div className="flex flex-col gap-2 ml-2 items-center">
              <Label label='Sr.com Only' />
              <input
                name="sr"
                id="sr"
                type="radio"
                {...register("sr")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center ml-2 items-start">
            <Label label="Active" className="inline-block mb-2" />
           
            <Controller
              name="active"
              control={control}
              rules={{
                // required: true,
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox className="-mt-2" onChange={onChange} />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;
