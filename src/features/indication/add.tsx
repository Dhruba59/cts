import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import React from "react";

const AddIndication = () => {
  return (
    <main>
      <Breadcrumbs title="Indication" subTitle="Add Indication" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
          Indication Information
        </h4>
        <hr />
        <form className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16">
            <Input
              label="Indication Name"
              placeholder="Enter indication name"
            />
            <Input
              label="Indication Code"
              placeholder="Enter indication code"
            />
            <Select
              options={[]}
              label="Code Type"
              placeholder="Select code type"
            />
          </div>
          <Textarea label="Description" placeholder="Enter description here" />
          <Checkbox id="details">Require Details</Checkbox>
        </form>
      </section>
      <div className="flex justify-center gap-4 mt-8 md:mt-14">
        <Button className="px-8">Submit</Button>
        <Button className="px-8" variant="outline">
          Cancel
        </Button>
      </div>
    </main>
  );
};

export default AddIndication;
