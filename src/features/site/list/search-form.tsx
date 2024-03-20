import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SiteAdvanceSearchProps } from "@/model/site";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

export function SearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register } = form;

  return (
    <Fragment>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Site Name: " className="hidden lg:block" />
        <Input
          placeholder="Enter site name"
          className="md:w-48"
          {...register("siteName")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Site Code: " className="hidden lg:block" />
        <Input
          placeholder="Enter site code"
          className="md:w-48"
          {...register("siteCode")}
        />
      </div>
    </Fragment>
  );
}

export function AdvanceSearchForm({
  frequencyDropDownOptions,
  form,
}: SiteAdvanceSearchProps) {
  const { register, control } = form;

  return (
    <Fragment>
      <Controller
        control={control}
        name="frequencyTypeId"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-40"
            onChange={onChange}
            label="Country"
            options={frequencyDropDownOptions}
            value={value}
          />
        )}
      />
      <Input className="w-40" label="City" placeholder="Enter city code" {...register("city")} />
      <Input
        className="w-40" 
        label="State"
        placeholder="Enter state code"
        {...register("state")}
      />
      <Input
        className="w-40" 
        label="State Zip"
        placeholder="Enter zip code"
        {...register("siteZip")}
      />
      <Input
        className="w-40" 
        label="Address one"
        placeholder="Enter address one code"
        {...register("address1")}
      />
      <Input
        className="w-40" 
        label="Address two"
        placeholder="Enter address two code"
        {...register("address2")}
      />
      <Input
        className="w-40" 
        label="Primary Contact Phone"
        placeholder="Enter primary contact phone"
        {...register("primaryContactPhone")}
      />
      <Input
        className="w-40" 
        label="Primary Contact Name"
        placeholder="Enter primary contact name"
        {...register("primaryContactName")}
      />
      <Input
        className="w-40" 
        label="Primary Contact Email"
        placeholder="Enter primary contact email"
        {...register("primaryContactEmail")}
      />
      <Input
        className="w-40" 
        label="Location ID"
        placeholder="Enter LocationID"
        {...register("locationId")}
      />
      <Input
        className="w-40" 
        label="PI Name"
        placeholder="Enter PI name"
        {...register("piname")}
      />
      <div className="flex flex-row items-center pt-5 mt-auto mb-auto">
        <Controller
          name="Partial Date Allowed"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Checkbox
              className=""
              onChange={onChange}
              value={value}
              checked={value}
            />
          )}
        />
        <Label label="Partial Date Allowed" />
      </div>
    </Fragment>
  );
}


export const TabSearchBarContent = ( { form, frequencyDropDownOptions }: SiteAdvanceSearchProps) => {
  const { control, register } = form;
  return (
    <Fragment>
     <Input
        placeholder="Enter site name"
        className=""
        {...register("siteName")}
      />
      <Input
        placeholder="Enter site code"
        className=""
        {...register("siteCode")}
      />
      <Controller
        control={control}
        name="frequencyTypeId"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            placeholder="Select Country"
            onChange={onChange}
            options={frequencyDropDownOptions}
            value={value}
          />
        )}
      />
      <Input placeholder="Enter city code" {...register("city")} />
      <Input
        placeholder="Enter state code"
        {...register("state")}
      />
      <Input
        placeholder="Enter zip code"
        {...register("siteZip")}
      />
      <Input
        placeholder="Enter address one code"
        {...register("address1")}
      />
      <Input
        placeholder="Enter address two code"
        {...register("address2")}
      />
      <Input
        placeholder="Enter primary contact phone"
        {...register("primaryContactPhone")}
      />
      <Input
        placeholder="Enter primary contact name"
        {...register("primaryContactName")}
      />
      <Input
        placeholder="Enter primary contact email"
        {...register("primaryContactEmail")}
      />
      <Input
        placeholder="Enter LocationID"
        {...register("locationId")}
      />
      <Input
        placeholder="Enter PI name"
        {...register("piname")}
      />
      <div className="flex flex-row items-center">
        <Controller
          name="partialDateAllowed"
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Checkbox
              className=""
              onChange={onChange}
              value={value}
              checked={value}
            />
          )}
        />
        <Label label="Partial Date Allowed" />
      </div>
    </Fragment>
  );
}