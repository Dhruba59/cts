"use client";
import { cn } from "@/libs/utils";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSubjectForm from "./add-subject-form";
import SearchSubjectForm from "./search-subject-form";
import { FormProps, UseFormReturn } from "react-hook-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { SearchLastSubjectsParams } from "@/model/subject";
import ListTable from "../table/list-table";
import { ChangeReqSubjectIdProps } from "@/model/change-request";
import { useSession } from "next-auth/react";
import { USER_ROLE_ENUM } from "@/model/enum";

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
  setSelectedProtocol: Dispatch<SetStateAction<SelectOptionType | undefined>>;
  ids: ChangeReqSubjectIdProps | undefined;
  setStudyType: Dispatch<SetStateAction<SelectOptionType | undefined>>;
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  protocolList: any;
  isLoadingSearch: boolean;
}

const SubjectEntrySelectionTab = ({ currentTab, setCurrentTab, isPreScreen, subjectEntryFormat, protocolId, setSelectedProtocol,protocolList, dropdowns, setQueryParams, ids, setStudyType, userId, setUserId, isLoadingSearch }
  : SelectionTabProps) => {

  const { data: session } = useSession();
  // @ts-ignore
  const isAdmin = session?.user.currentRole.roleId == USER_ROLE_ENUM.SYSTEM_ADMIN;

  useEffect(() => {
    if (isPreScreen || isPreScreen === undefined) {
      setCurrentTab("add");
    }
  }, [isPreScreen])

  return (
    <div>
      {/* @ts-ignore */}
      {/* {session?.user?.currentRole?.roleId == USER_ROLE_ENUM.SITE_USER && protocolId &&
        <AddSubjectForm dropdowns={dropdowns} protocolId={protocolId} subjectIdFormat={subjectEntryFormat} setSelectedProtocol={setSelectedProtocol} ids={ids} /> :
        <> */}
          <h5 className="mt-10 mb-4">What you want to do ?</h5>
          <div className="flex gap-4 items-center">
            {isAdmin}
            <button
              className={cn("subject-entry", {
                "subject-entry-active": currentTab === "add",
              })}
              type="button"
              onClick={() => setCurrentTab("add")}
            >
              Add New <br /> Subject
            </button>
            {!isPreScreen && (
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
            {/* {currentTab === "add" ? <AddSubjectForm setIsReportModalOpen={} dropdowns={dropdowns} protocolId={protocolId} subjectIdFormat={subjectEntryFormat} setSelectedProtocol={setSelectedProtocol} protocolList={protocolList} ids={ids} setStudyType={setStudyType} userId={userId} setUserId={setUserId}/>
              : <SearchSubjectForm setQueryParams={setQueryParams} protocolId={protocolId} isLoadingSearch={isLoadingSearch}/>
            } */}
          </div>
        {/* </> */}
      {/* } */}

    </div>
  );
};

export default SubjectEntrySelectionTab;
