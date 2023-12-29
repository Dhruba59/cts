"use client";
import { cn } from "@/libs/utils";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSubjectForm from "./add-subject-form";
import SearchSubjectForm from "./search-subject-form";
import { FormProps, UseFormReturn } from "react-hook-form";
import { DropDownItem } from "@/model/drop-down-list";
import { SearchLastSubjectsParams } from "@/model/subject";
import ListTable from "../table/list-table";

interface SelectionTabProps {
  currentTab?: any;
  setCurrentTab?: any;
  data?: any;
  isLoading?: boolean;
  isPreScreen?: boolean;
  protocolId: string | undefined;
  dropdowns: { [key: string]: DropDownItem[] };
  subjectEntryFormat: string;
  setQueryParams: Dispatch<SetStateAction<SearchLastSubjectsParams>>;
}

const SubjectEntrySelectionTab = ({currentTab, setCurrentTab, isPreScreen, subjectEntryFormat, protocolId, dropdowns, setQueryParams }
  : SelectionTabProps) => {

  useEffect(() => {
    if (isPreScreen || isPreScreen === undefined) {
      setCurrentTab("add");
    }
  }, [isPreScreen])

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
        {!isPreScreen  && (
          <button
            className={cn("subject-entry", {
              "subject-entry-active": currentTab === "last",
            })}
            type="button"
            onClick={() => setCurrentTab("last")}
          >
            Last Subject <br /> Contact
          </button>
        )}
      </div>
      <div className="my-6">
        {currentTab === "add" ? <AddSubjectForm dropdowns={dropdowns} protocolId={protocolId} subjectIdFormat={subjectEntryFormat} />
          : <SearchSubjectForm setQueryParams={setQueryParams} protocolId={protocolId} />
        }
      </div>
    </div>
  );
};

export default SubjectEntrySelectionTab;
