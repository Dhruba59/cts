import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { SearchFormProps } from "@/model/sponsor";
import { getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useEffect, useState } from "react";


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
        <Label label="Sponsor Name: " className="hidden lg:block" />
        <Input
          name="sponsorName"
          placeholder="Enter sponsor name"
          className="md:w-48"
          {...register("sponsorName")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Zip: " className="hidden lg:block" />
        <Input
          name="zip"
          placeholder="Enter zip code"
          className="md:w-48"
          {...register("zip")}
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

export function AdvanceSearchForm({ register, Controller, control, reset }: any) {

  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="flex flex-row items-center gap-5">
        <Input
          name="city"
          label="City"
          placeholder="Enter city"
          className="md:w-72"
          {...register("city")}
        />
        <Input
          name="state"
          label="State"
          placeholder="Enter state"
          wrapperClassName="md:w-full"
          {...register("state")}
        />
      </div>

      <div className="flex flex-row items-center gap-5">
      <Textarea  label="Address One"/>
      <Textarea label="Address Two"/>
      </div>
      <div className="flex gap-3">
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
