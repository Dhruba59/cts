import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useEffect, useState } from "react";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  register: any;
  Controller: any;
  control: any;
  reset: any;
}
export function SearchForm({
  isAdvancedOpen,
  register,
  Controller,
  control,
  reset
}: SearchFormProps) {

  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Site Name: " className="hidden lg:block" />
        <Input
          name="siteName"
          placeholder="Enter site name"
          className="md:w-48"
          {...register("siteName")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Site Code: " className="hidden lg:block" />
        <Input
          name="siteCode"
          placeholder="Enter site code"
          className="md:w-48"
          {...register("siteCode")}
        />
      </div>
      <div className={`flex gap-3 ${isAdvancedOpen ? 'hidden' : 'block'}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="submit" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export function AdvanceSearchForm({ frequencyDropDown, register, Controller, control, reset }: any) {

  const [frequencyTypeOptions, setFrequencyTypeOptions] = useState<SelectOptionType[]>([]);
  useEffect(() => {
    console.log(frequencyDropDown);
    setFrequencyTypeOptions(convertTypeToSelectOption(frequencyDropDown?.countries));
    console.log(frequencyTypeOptions);

  }, [frequencyDropDown])

  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* <div>
          <Input
            label="Site Name"
            placeholder="Enter site name"
            {...register("siteName", {
              required: "Site name is required!"
            })}
          />
        </div>
        <div>
          <Input
            label="Site Code"
            placeholder="Enter site code"
            {...register("siteCode", {
              required: "Site code is required!"
            })}
          />

        </div> */}
        <div>
          <Controller
            control={control}
            name='frequencyTypeId'
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select onChange={onChange} label="Country" options={frequencyTypeOptions} value={value} />
            )}
          />

        </div>
        <div>
          <Input
            label="City"
            placeholder="Enter city code"
            {...register("city")}
          />

        </div>
        <div>
          <Input
            label="State"
            placeholder="Enter state code"
            {...register("state")}
          />

        </div>
        <div>
          <Input
            label="State Zip"
            placeholder="Enter zip code"
            {...register("siteZip")}
          />

        </div>
        <div>
          <Input
            label="Address one"
            placeholder="Enter address one code"
            {...register("address1")}
          />

        </div>
        <div>
          <Input
            label="Address two"
            placeholder="Enter address two code"
            {...register("address2")}
          />

        </div>
        <div>
          <Input
            label="Primary Contact Phone"
            placeholder="Enter primary contact phone"
            {...register("primaryContactPhone")}
          />

        </div>
        <div>
          <Input
            label="Primary Contact Name"
            placeholder="Enter primary contact name"
            {...register("primaryContactName")}
          />

        </div>
        <div>
          <Input
            label="Primary Contact Email"
            placeholder="Enter primary contact email"
            {...register("primaryContactEmail")}
          />

        </div>
        <div>
          <Input
            label="Location ID"
            placeholder="Enter LocationID"
            {...register("locationId")}
          />

        </div>
        <div>
          <Input
            label="PI Name"
            placeholder="Enter PI name"
            {...register("piname")}
          />

        </div>
        <div className="flex flex-row items-center">
          <Controller
            name="Partial Date Allowed"
            control={control}
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Checkbox className="" onChange={onChange} value={value} checked={value} />}
          />
          <Label label="Partial Date Allowed" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-8 md:mt-14">
        <Button type="submit" className="px-8">Search</Button>
        <Button type="submit" className="px-8" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
}
