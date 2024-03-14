import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { SelectOptionType } from "@/model/drop-down-list";
import { Fragment } from "react";
import Datepicker from "@/components/ui/datepicker";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { Controller } from "react-hook-form";

interface SearchFormProps extends BasicTabSearchBarContentsProps{
  requestTypeOptions: SelectOptionType[];
}

export function SearchForm({ requestTypeOptions, form }: SearchFormProps) {
  const { register, control } = form;

  return (
    <Fragment>
      <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Request For: " className="hidden lg:block" />
        <Controller
          control={control}
          name='requestStatus'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select className="md:w-32 xl:w-36" onChange={onChange} label="" options={requestTypeOptions} value={value} />
          )}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Subject Name: " className="hidden lg:block" />
        <Input
          placeholder="Sponsor Subject ID"
          className="md:w-32  xl:w-36"
          {...register("sponsorSubjectId")}
        />
      </div>
    </Fragment>
  );
}


export function AdvanceSearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { control } = form;

  return (
    <Fragment>
        <Controller
          control={control}
          name='fromDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
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
              label="To Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
    </Fragment>
  );
}

export const TabSearchBarContent = ( { form, requestTypeOptions }: SearchFormProps) => {
  const { control, register } = form;

  return (
    <Fragment>
      <Controller
          control={control}
          name='requestStatus'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select className="md:w-32 xl:w-36" onChange={onChange} placeholder="Select Request Status" options={requestTypeOptions} value={value} />
          )}
        />
        <Input
          placeholder="Sponsor Subject ID"
          className="md:w-32  xl:w-36"
          {...register("sponsorSubjectId")}
        />
         <Controller
          control={control}
          name='fromDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              value={value}
              onChange={onChange}
              placeholder="Select (From Date)"
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
              value={value}
              onChange={onChange}
              placeholder="Select (To Date)"
              useRange={false}
              asSingle
            />
          )}
        />
    </Fragment>
  );
}