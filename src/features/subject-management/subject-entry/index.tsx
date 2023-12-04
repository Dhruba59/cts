'use client';

import Breadcrumbs from "@/components/ui/breadcrumbs";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import React from "react";
import SubjectEntrySelectionTab from "./subject-tab/subject-entry-selection-tab";
import ListTable from "./table/list-table";

const SubjectEntryForm = () => {
  return (
    <main>
      <Breadcrumbs title="Subject Management" subTitle="Entry Study Subject" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">Subject Entry</h4>
        <hr />
        <div className="w-full lg:w-2/3 px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-6 md:gap-y-0">
            <div className="flex gap-2 md:items-center flex-col md:flex-row">
              <Label
                label="Study Type"
                className="text-sm md:text-base mr-2 md:font-medium"
              />
              <Select wrapperClassName="grow" />
            </div>
            <div className="flex gap-2 md:items-center flex-col md:flex-row md:col-span-2">
              <Label
                label="Select a protocol"
                className="text-sm md:text-base mr-2 md:font-medium"
              />
              <Select wrapperClassName="grow" />
            </div>
          </div>
          <SubjectEntrySelectionTab />
        </div>
      </section>
      <ListTable />
    </main>
  );
};

export default SubjectEntryForm;
