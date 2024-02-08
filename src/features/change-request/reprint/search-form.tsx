"use client";
import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import InputFieldWithRegexValidation from "@/components/ui/inputfield-with-regex";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { ChangeRequestReprintQuery } from "@/model/change-request";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { DateValueType } from "react-tailwindcss-datepicker";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  form: UseFormReturn;
  dropdownsData: {[key: string]: DropDownItem[]}
  setQueryData: Dispatch<SetStateAction<ChangeRequestReprintQuery>>;
}

interface AdvancedSearchFormProps extends Omit<SearchFormProps, 'isAdvancedOpen'> {
  // dropDownList: any;
}

const SearchForm: React.FC<SearchFormProps> = ({ isAdvancedOpen, form, dropdownsData, setQueryData }) => {
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = form;

  const onReset = () => {
    reset();
    reset({
      DateOfBirth: {
        startDate: null,
        endDate: null,
      },
      FromDate: {
        startDate: null,
        endDate: null,
      },
      ToDate: {
        startDate: null,
        endDate: null,
      },
    });
    setQueryData({});
  }

  useEffect(() => {
    setProtocolOptions(convertTypeToSelectOption(dropdownsData?.protocols));
  }, [dropdownsData]);

  return (
    <div className="flex justify-start gap-2 md:gap-3">
      <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden xl:block" />
        <Controller
          control={control}
          name='StudyId'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select className="md:w-auto" onChange={onChange} label="" options={protocolOptions} value={value} placeholder="Select Protocol"/>
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
      <div className="flex gap-1">
        <Button className={`mb-[1px] w-fit ${isAdvancedOpen ? 'hidden' : 'block'}`} type="submit">Search</Button>
        <Button className={`mb-[1px] w-fit ${isAdvancedOpen ? 'hidden' : 'block'}`} onClick={() => onReset()} variant='outline' type="button">Reset</Button>
      </div>
    </div>
  );
};

export default SearchForm;

const AdvanceSearchForm = ({ form, dropdownsData, setQueryData }: AdvancedSearchFormProps) => {

  const [regionGroupOptions, setRegionGroupOptions] = useState<SelectOptionType[]>([]);
  const [siteOptions, setSiteOptions] = useState<SelectOptionType[]>([]);
  const {
    register,
    control,
    formState: { errors },
    reset,
  } = form;


  const onReset = () => {
    reset();
    setQueryData({});
  }

  useEffect(() => {
    setRegionGroupOptions(convertTypeToSelectOption(dropdownsData?.regionGroups));
    setSiteOptions(convertTypeToSelectOption(dropdownsData?.sites));
  }, [dropdownsData]);

  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-2">
        <Controller
          control={control}
          name="RegionGroup"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              //className="md:w-36  xl:w-48"
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
              //className="md:w-36  xl:w-48"
              onChange={onChange}
              label="Site Name"
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
            {/* <Input
              placeholder="F"
              className="md:w-10 xl:w-16"
              {...register("FirstInit", {
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              })}
              maxLength={1}
              type="text"
            /> */}
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
            {/* <Input
              placeholder="M"
              className="md:w-10 xl:w-16"
              {...register("MiddleInit", {
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              })}
              maxLength={1}
              type="text"
            /> */}
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
            {/* <Input
              placeholder="L"
              className="md:w-10 xl:w-16"
              {...register("LastInit", {
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              })}
              maxLength={1}
              type="text"
            /> */}
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
          name="FromDate"
          rules={{}}
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
          name="ToDate"
          rules={{}}
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
          <Button type="button" variant="outline" onClick={() => onReset()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AdvanceSearchForm, SearchForm };
