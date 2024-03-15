import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SelectOptionType } from "@/model/drop-down-list";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

export interface ReprintReportSearchProps extends BasicTabSearchBarContentsProps{
  protocolOptions: SelectOptionType[];
}


const SearchForm = ({ form, protocolOptions }: ReprintReportSearchProps) => {
  const { register, control } = form;

  return (
    <Fragment>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden lg:block" />
        <Controller
          control={control}
          name="protocol"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              className="w-36 xl:w-48"
              placeholder="Protocol"
              onChange={onChange}
              value={value}
              options={protocolOptions}
            />
          )}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1">
        <Label label="Subject ID: " className="hidden lg:block" />
        <Input
          placeholder="Subject Id"
          className="w-36 xl:w-48"
          {...register("subjectId")}
        />
      </div>
    </Fragment>
  );
};

const AdvanceSearchForm = ({ form }: BasicTabSearchBarContentsProps) => {
  const { control, reset } = form;
  
  return (
    <Fragment>
        <Controller
          control={control}
          name="fromDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection="down"
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="From Date"
              label="From Date"
            />
          )}
        />
        <Controller
          control={control}
          name="toDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection="down"
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="To Date"
              label="To Date"
            />
          )}
        />
    </Fragment>
  );
};


const TabSeachForm = ({ form, protocolOptions }: ReprintReportSearchProps) => {
  const { register, control, reset } = form;

  return (
    <Fragment>
      <Controller
          control={control}
          name="protocol"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              placeholder="Select Protocol"
              onChange={onChange}
              value={value}
              options={protocolOptions}
            />
          )}
        />
        <Input
          placeholder="Enter Subject Id"
          {...register("subjectId")}
        />
        <Controller
          control={control}
          name="fromDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection="down"
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="Select (From Date)"
            />
          )}
        />
        <Controller
          control={control}
          name="toDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection="down"
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="Select (To Date)"
            />
          )}
        />
    </Fragment>
  );
};


export { SearchForm, AdvanceSearchForm, TabSeachForm };
