"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useState } from "react";
import SearchForm from "./searchForm";

const ListHeader = () => {
  
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <Breadcrumbs title="Indication" subTitle="Indication List" />
      <div className="md:hidden">
        <SearchForm />
      </div>
      <section className="hidden md:block wrapper">
        <div className="flex flex-row items-center justify-between px-3 py-3">
          <h4 className=" text-neutral-black">Search Indication</h4>
          <div className="">
            <SearchForm />
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr />
      </section>
    </div>
  );
};

export default ListHeader;
