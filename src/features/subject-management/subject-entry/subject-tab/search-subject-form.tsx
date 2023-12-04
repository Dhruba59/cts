import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import React from "react";

const SearchSubjectForm = () => {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
      <Input label="Sponsor Subject ID" placeholder="Enter subject ID" />
      <div>
        <Label label="Subject Initials" className="inline-block mb-2" />
        <div className="grid grid-cols-3 gap-6">
          <Input placeholder="-" />
          <Input placeholder="-" />
          <Input placeholder="-" />
        </div>
      </div>

      <Datepicker
        label="Date of Birth"
        value={{ startDate: null, endDate: null }}
        onChange={() => {}}
        asSingle
        placeholder="Select Date"
        useRange={false}
      />
      <Datepicker
        label="From Date"
        value={{ startDate: null, endDate: null }}
        onChange={() => {}}
      />

      <div className="flex items-center justify-center !mt-10 gap-4 col-span-full">
        <Button className="px-8">Search</Button>
        <Button className="px-8" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SearchSubjectForm;
