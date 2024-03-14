"use client";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import InputFieldWithRegexValidation from "@/components/ui/inputfield-with-regex";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SelectOptionType } from "@/model/drop-down-list";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

export interface SearchFormProps extends BasicTabSearchBarContentsProps{
  protocolOptions: SelectOptionType[];
};

export interface AdvancedSearchFormProps extends BasicTabSearchBarContentsProps {
  regionGroupOptions: SelectOptionType[];
  siteOptions: SelectOptionType[];
};

export interface TabSearchProps extends SearchFormProps, AdvancedSearchFormProps {};

const SearchForm: React.FC<SearchFormProps> = ({ form, protocolOptions }) => {
  const { register, control, reset } = form;

  return (
    <Fragment>
      <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden xl:block" />
        <Controller
          control={control}
          name='StudyId'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select className="md:w-40" onChange={onChange} label="" options={protocolOptions} value={value} placeholder="Select Protocol"/>
          )}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Subject ID: " className="hidden xl:block" />
        <Input
          placeholder="Enter Subject ID"
          className="md:w-36  xl:w-48"
          {...register("SubjectId")}
        />
      </div>
    </Fragment>
  );
};

export default SearchForm;

const AdvanceSearchForm = ({ form, regionGroupOptions, siteOptions }: AdvancedSearchFormProps) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Fragment>
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-2">
        <Controller
          control={control}
          name="RegionGroup"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={onChange}
              label="Region Group"
              options={regionGroupOptions}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="SiteId"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={onChange}
              label="Site Name"
              options={siteOptions}
              value={value}
            />
          )}
        />
        <div className="flex flex-col items-start justify-between gap-1">
          <Label label="Subject Initials" className="" />
          <div className="flex justify-between gap-1 w-full">
            <Controller
              control={control}
              name="FirstInit"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  placeholder="F"
                  maxLength={1}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
             <Controller
              control={control}
              name="MiddleInit"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  placeholder="M"
                  maxLength={1}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
            <Controller
              control={control}
              name="LastInit"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  placeholder="L"
                  maxLength={1}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
          </div>
          {(errors.FirstInit || errors.MiddleInit || errors.LastInit) && (
            <span className="text-red-500">
              One alphabetic character allowed
            </span>
          )}
        </div>
        <Controller
          control={control}
          name="DateOfBirth"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
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
          name="FromDate"
          rules={{}}
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
          name="ToDate"
          rules={{}}
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
      </div>
    </Fragment>
  );
};


const TabSearchForm = ({
  form,
  regionGroupOptions,
  siteOptions,
  protocolOptions,
}: TabSearchProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <Fragment>
      <Controller
        control={control}
        name="StudyId"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="md:w-auto"
            onChange={onChange}
            label=""
            options={protocolOptions}
            value={value}
            placeholder="Select Protocol"
          />
        )}
      />

      <Input
        placeholder="Enter Subject ID"
        className="md:w-36  xl:w-48"
        {...register("SubjectId")}
      />
        <Controller
          control={control}
          name="RegionGroup"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={onChange}
              placeholder="Select Region Group"
              options={regionGroupOptions}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="SiteId"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={onChange}
              placeholder="Select Site"
              options={siteOptions}
              value={value}
            />
          )}
        />
        <div className="flex flex-col items-start justify-between gap-2 mt-1">
          <Label label="Subject Initials" className="hidden lg:block" />
          <div className="flex justify-around gap-2 w-full">
            <Controller
              control={control}
              name="FirstInit"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  className="md:w-10 xl:w-16"
                  placeholder="F"
                  maxLength={1}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
            <Controller
              control={control}
              name="MiddleInit"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  className="md:w-10 xl:w-16"
                  placeholder="M"
                  maxLength={1}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
            <Controller
              control={control}
              name="LastInit"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  className="md:w-10 xl:w-16"
                  placeholder="L"
                  maxLength={1}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
          </div>
          {(errors.FirstInit || errors.MiddleInit || errors.LastInit) && (
            <span className="text-red-500">
              One alphabetic character allowed
            </span>
          )}
        </div>
        <Controller
          control={control}
          name="DateOfBirth"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              value={value}
              onChange={onChange}
              placeholder="Select Date of Birth"
              useRange={false}
              asSingle
            />
          )}
        />
        <Controller
          control={control}
          name="FromDate"
          rules={{}}
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
          name="ToDate"
          rules={{}}
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
};

export { AdvanceSearchForm, SearchForm, TabSearchForm };
