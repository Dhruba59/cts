import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { get_indication_code_types } from "@/service/indication-service";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export function SearchForm({ codeTypes }: any) {
  const onChange = () => {};
  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Indication Code: " className="hidden lg:block" />
        <Input placeholder="Enter indication code" className="md:w-48" />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Code Type: " className="hidden lg:block" />
        <Select
          onChange={onChange}
          label=""
          options={codeTypes}
          className="md:w-48"
          placeholder="Select type"
        />
      </div>
      <Button className="!h-10 mb-[1px]">Search</Button>
    </div>
  );
}

export function AdvanceSearchForm() {
  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="flex flex-row items-center gap-5">
        <Input
          label="Indication name"
          placeholder="Enter Indication name"
          className="md:w-72 lg:w-96"
        />
        <Input
          label="Description"
          placeholder="Enter description"
          wrapperClassName="md:w-full"
        />
      </div>
      <Checkbox id="details">Require Details</Checkbox>
      {/* <div className="flex items-center justify-center gap-4 !mt-2">
        <Button className="px-8" variant="outline">
          Cancel
        </Button>
        <Button className="">Advance Search</Button>
      </div> */}
    </div>
  );
}
