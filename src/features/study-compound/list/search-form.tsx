import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { Fragment, useEffect, useState } from "react";

export function SearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register} = form;

  return (
      <div className="flex-none col-span-2 md:flex items-center gap-2">
        <Label label="Study Compound name: " className="hidden lg:block" />
        <Input
          label=""
          placeholder="Enter study compound name"
          className="md:w-72"
          {...register("studyCompoundName")}
        />
      </div>
  );
}

export function AdvanceSearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register } = form;
  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="flex flex-row items-center gap-5">
        {/* <Input
          label="Study Compound name"
          placeholder="Enter study compound name"
          className="md:w-72"
          {...register("studyCompoundName")}
        /> */}
        <Input
          label="Description"
          placeholder="Enter description"
          wrapperClassName="md:w-full"
          {...register("description")}
        />
      </div>
    </div>
  );
}
