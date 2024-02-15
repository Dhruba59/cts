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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div>
        <Input
          name="city"
          label="City"
          placeholder="Enter city"
          className=""
          {...register("city")}
        />
        </div>
        <div>
        <Input
          name="state"
          label="State"
          placeholder="Enter state"
          wrapperClassName=""
          {...register("state")}
        />
        </div>
        <div>
           <Textarea label="Address One" placeholder="Enter address one"  {...register("address1",{
              })} />
        </div>
        <div>
           <Textarea label="Address Two" placeholder="Enter address two"  {...register("address2",{
              })} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-8 md:mt-14">
          <Button type="submit" className="px-8">
            Search
          </Button>
          <Button type="submit" className="px-8" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
      </div>
    </div>
  );
}
