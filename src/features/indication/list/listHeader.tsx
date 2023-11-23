"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./searchForm";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";

const ListHeader = ({ codeTypes }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <Breadcrumbs title="Indication" subTitle="Indication List" />
      <form className="">
        <div className="md:hidden">
          <SearchForm codeTypes={codeTypes} />
        </div>
        <section className="hidden md:block wrapper">
          <div className="flex flex-row items-center justify-between px-3 py-3">
            <h4 className=" text-neutral-black">Search Indication</h4>
            <div className="">
              <SearchForm codeTypes={codeTypes} />
            </div>
            <Toggle
              prefixLabel="More: "
              className="hidden lg:block"
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <hr />
          {isChecked && <AdvanceSearchForm />}
        </section>
      </form>
    </div>
  );
};

export default ListHeader;
