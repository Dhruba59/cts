"use client";
import { cn } from "@/libs/utils";
import React, { useState } from "react";
import AddSubjectForm from "./add-subject-form";
import SearchSubjectForm from "./search-subject-form";

const SubjectEntrySelectionTab = () => {
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
        {currentTab === "add" ? <AddSubjectForm /> : <SearchSubjectForm />}
      </div>
    </div>
  );
};

export default SubjectEntrySelectionTab;
