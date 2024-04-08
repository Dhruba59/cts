"use client";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { StudyAdvancedSearchFormProps } from "@/model/study";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

const SearchForm: React.FC<BasicTabSearchBarContentsProps> = ({ form }) => {
  const { register } = form;

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
    </div>
  );
};

export default SearchForm;

const AdvanceSearchForm = ({ phaseOptions, sponsorOptions, form }: StudyAdvancedSearchFormProps) => {
  const { register, control } = form;

  return (
    <Fragment>
      <Controller
        control={control}
        name='SponsorId'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select onChange={onChange} label="Sponsor Name" placeholder="Select Sponsor" className="w-auto md:w-40" options={sponsorOptions} value={value} />
        )}
      />

      <Controller
        control={control}
        name='Phase'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select onChange={onChange} label="Phase Name" placeholder="Select phase" className="w-auto md:w-40" options={phaseOptions} value={value} />
        )}
      />
      <Input label="Max Subject" type="number" className="w-auto md:w-40" placeholder="Max Subject" {...register('MaxSubjects')} />
      <Input label="Subject ID Entry Format" className="w-auto md:w-40" placeholder="Subject ID Entry Format" {...register('SubjectIdentryFormat')} />
      <Controller
        control={control}
        name='date'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Datepicker
          inputClassName='w-auto md:w-40'
            containerClassName="w-auto md:w-40"
            popoverDirection='down'
            value={value}
            onChange={onChange}
            placeholder="Start date  ⇀  End date"
            label="Date"
          />
        )}
      />
      {/* <div className="flex justify-between items-center mt-auto mb-auto">
        <div className="flex gap-8 items-center justify-start "> */}
          <div className="flex gap-2 justify-start w-auto md:w-40 mt-10 ml-1">
          <Controller
              name="PreScreen"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox onChange={onChange} checked={value} />
              )}
            />
            <Label label='Pre Screen' />
          </div>
          <div className="flex gap-2 justify-start w-auto md:w-40 mt-10 ml-1">
          <Controller
              name="Sr"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox onChange={onChange} checked={value} />
              )}
            />
            <Label label='Sr.com Only' />
          </div>
          <div className="flex gap-2 justify-start w-auto md:w-40 mt-10 ml-1">
          <Controller
              name="Active"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Checkbox className=" bg-red-400" onChange={onChange} checked={value} />
              )}
            />
            <Label label="Active" />
          </div>

        {/* </div>
      </div> */}
    </Fragment>
  );
};

export { AdvanceSearchForm, SearchForm };

export const TabSearchBarContent = ( { form, phaseOptions, sponsorOptions }: StudyAdvancedSearchFormProps) => {
  const { control, register } = form;

  return (
    <Fragment>
       <Input {...register('StudyName')} placeholder="Study name" />
       <Input {...register('ProtocolNumber')} placeholder="Protocol" />
       <Controller
        control={control}
        name='SponsorId'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select onChange={onChange} placeholder="Select Sponsor" options={sponsorOptions} value={value} />
        )}
      />
      <Controller
        control={control}
        name='Phase'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select onChange={onChange} placeholder="Select Phase" options={phaseOptions} value={value} />
        )}
      />
      <Input placeholder="Max subject" type="number" {...register('MaxSubjects')} />
      <Input placeholder="Subject Identity Format" {...register('SubjectIdentryFormat')} />
      <Controller
        control={control}
        name='date'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Datepicker
            popoverDirection='down'
            value={value}
            onChange={onChange}
            placeholder="Start date  ⇀  End date"
          />
        )}
      />
        <div className="ml-3 flex gap-8 items-center justify-start ">
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
    </Fragment>
  );
}
