"use client";
import { cn } from "@/libs/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddSubjectForm from "./add-subject-form";
import SearchSubjectForm from "./search-subject-form";
import { FormProps, UseFormReturn } from "react-hook-form";
import { DropDownItem } from "@/model/drop-down-list";
import { SearchLastSubjectsParams } from "@/model/subject";

interface SelectionTabProps {
  protocolId: string | undefined;
  dropdowns: { [key: string]: DropDownItem[] };
  setQueryParams: Dispatch<SetStateAction<SearchLastSubjectsParams>>;
}

const SubjectEntrySelectionTab = ({ protocolId, dropdowns, setQueryParams }: SelectionTabProps) => {
  const [currentTab, setCurrentTab] = useState<"add" | "last">("add");
  return (
    <div>
      <h5 className="mt-10 mb-4">What you want to do ?</h5>
      <div className="flex gap-4 items-center">
        <button
          className={cn("subject-entry", {
            "subject-entry-active": currentTab === "add",
          })}
          type="button"
          onClick={() => setCurrentTab("add")}
        >
          Add New <br /> Subject
        </button>
        <button
          className={cn("subject-entry", {
            "subject-entry-active": currentTab === "last",
          })}
          type="button"
          onClick={() => setCurrentTab("last")}
        >
          Last Subject <br /> Contact
        </button>
      </div>
      <div className="my-6">
        {currentTab === "add" ? <AddSubjectForm dropdowns={dropdowns} protocolId={protocolId} /> : <SearchSubjectForm setQueryParams={setQueryParams} protocolId={protocolId} />}
      </div>
    </div>
  );
};

export default SubjectEntrySelectionTab;
