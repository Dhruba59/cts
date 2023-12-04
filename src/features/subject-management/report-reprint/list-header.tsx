"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";
import { useState } from "react";
import { AdvanceSearchForm, SearchForm } from "./search-form";

const ListHeader = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <Breadcrumbs
        title="Subject Management"
        subTitle="Re-Print Match Reports"
      />
      <div className="md:hidden">
        <SearchForm />
      </div>
      <section className="hidden md:block wrapper">
        <div className="flex flex-row items-center justify-between px-6 py-3">
          <h4 className=" text-neutral-black divide-y-2 divide-red-400">
            Search Last Subject Entry
          </h4>
          <div className="">
            <SearchForm />
          </div>
          <Toggle
            prefixLabel="Advanced: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr />
        {isChecked && <AdvanceSearchForm />}
      </section>
    </div>
  );
};

export default ListHeader;
