import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import React from "react";

const AddSubjectForm = () => {
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
      <div>
        <Label label="Last 4 SSN/National ID" className="inline-block mb-2" />
        <div className="grid grid-cols-3 gap-x-6">
          <Input />
          <Select placeholder="Select ID Type" wrapperClassName="col-span-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Select label="Sex" />
        <Input label="Zip Code" placeholder="Enter zip" />
      </div>
      <div>
        <Label label="Height" className="inline-block mb-2" />
        <div className="grid grid-cols-2 gap-x-6">
          <Input placeholder="Enter Height" />
          <Select placeholder="cm" />
        </div>
      </div>

      <div>
        <Label label="Weight" className="inline-block mb-2" />
        <div className="grid grid-cols-2 gap-x-6">
          <Input placeholder="Enter weight" />
          <Select placeholder="kg" />
        </div>
      </div>

      <div className="flex items-center justify-center mt-10 gap-4 col-span-full">
        <Button className="px-8">Submit</Button>
        <Button className="px-8" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddSubjectForm;
