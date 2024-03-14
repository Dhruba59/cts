
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "./query";
import { number } from 'yup';
import { DateRangeType, DateType } from "react-tailwindcss-datepicker";
import { SelectOptionType } from "./drop-down-list";
import { BasicTabSearchBarContentsProps } from "./common";

export interface ChangeRequestReprintModel {
  userName?: string,
  subjectId?: number,
  sponsorSubjectId?: string,
  isPartialDate?: boolean,
  dateOfBirth?: string,
  gender?: string,
  social?: string,
  firstInit?: string,
  secondInit?: string,
  thirdInit?: string,
  nationalTypeId?: number,
  screenedDate?: Date,
  indicationDetail?: string,
  zipCode?: string,
  height?: number,
  weight?: number,
  dateEntered?: string,
  visitTypeId?: number,
  siteStudyId?: number,
  protocolNumber?: string,
  firstDateEntered?: string,
  siteName?: string,
  nationalIdTypeName?: string,
  heightUnit?: string,
  lastSubjectEntryDate?: string,
  preScreen? :boolean,
  isPartial? :boolean,
  active? :boolean,
  frequencyTypeId?: number
  visitTypeIdForBusinessLogic?: number;
}
export interface ChangeRequestReprintQuery extends Query {
  RegionGroup?: number | null;
  SiteId?: number | null;
  StudyId?: number | null;
  SubjectId?: string | null;
  FirstInit?: string | null;
  MiddleInit?: string | null;
  LastInit?: string | null;
  DateOfBirth?: DateRangeType;
  FromDate?: DateRangeType;
  ToDate?: DateRangeType;
}

export interface CodeType {

  text: string;
  value: string;

}
  export interface getIndicationListProps {
    searchField: string;
    searchValue: string;
  }


  export interface ChangeRequestAuditQuery extends Query {
    requestStatus?: string;
    sponsorSubjectId?: string;
    fromDate?: string;
    toDate?: string;
  }

  export interface ChangeRequestAuditModel {
    subjectId?: number,
    requestId?: number;
    nationalTypeId?: number,
    siteName?: string,
    studyName?: string,
    protocolNumber?: string,
    sponsorSubjectId?: string,
    firstInit?: string,
    secondInit?: string,
    thirdInit?: string,
    isPartialDate?: boolean,
    dateOfBirth?: string,
    approvedDate?: string,
    approver?: string,
    requestStatus?: string,
    regionGroupsId?: number
  }


  export interface ChangeRequestAuditDetailQuery extends Query {
    subjectId?: number;
    RequestId?: number;
    regionGroupsId?: string;
  }

  export interface ChangeRequestAuditDetailModel {
    subjectId?: number,
    subjectInitial?: string,
    isPartialDate?: boolean,
    dateOfBirth?: string,
    social?: string,
    gender?: string,
    sponsorSubjectId?: string,
    modifyDate?: string,
    actionStatus?: number,
    nationalTypeId?: number,
    nationalIDTypeName?: string,
    height?: number,
    weight?: number,
    DateEntered?: string
  }




  export interface ChangeRequestDashboardQuery extends Query {
    userTypeId?: number | null;
    protocolNumber?: string;
    requestStatus?: string;
    fromDate?: string | null | DateRangeType;
    toDate?: string | null | DateRangeType;
  }

  export interface ChangeRequestDashboardFieldValues {
    userTypeId?: number | null;
    protocolNumber?: string;
    requestStatus?: string;
    fromDate?: DateRangeType;
    toDate?: DateRangeType;
  }

  export interface ChangeRequestDashboardModel{
    requestId?: number,
    protocolNumber?: string,
    subjectId?: number,
    sponsorSubjectId?: string,
    isPartialDate?: boolean,
    dateOfBirth?: string,
    gender?: string,
    social?: string,
    nationalTypeId?: number,
    firstInit?: string,
    secondInit?: string,
    thirdInit?: string,
    zipCode?: string,
    height?: number,
    weight?: number,
    dateEntered?: string,
    siteStudyId?: number,
    requestedNote?: string,
    requestedDate?: string,
    approvedDate?: string,
    approvedUserId?: number,
    requestedUserName?: string,
    requestedUserId?: number,
    userTypeId?: number,
    requestStatus?: string,
    isEditDelete? : boolean,
    lastSubjectEntryDate?: string,
    visitTypeId?: number,
    indicationDetail?: string,
    deleteType?: number,
    isReqForLastSubjectEntry? : boolean,
  }

  export interface ChangeRequestReviewDetailQuery {
    changeRequestId?: number,
  }
  export interface ChangeRequestReviewDetailModel {
    rowOrder?: number,
    columnName?: string,
    old?: boolean,
    new?: string,
    // social?: string,
    // gender?: string,
    // sponsorSubjectId?: string,
    // modifyDate?: string,
    // actionStatus?: number,
    // nationalTypeId?: number,
    // nationalIDTypeName?: string,
    // height?: number,
    // weight?: number,
    // DateEntered?: string
  }
  export interface SubjectDetailsParams {
    SubjectId: string;
    NationalTypeId?: string;
  }

  
  export interface ChangeReqSubjectIdProps {
    subjectId: string;
    nationalIdType: string;
  }

  export interface ChangeReqDashboardSearchFormProps extends BasicTabSearchBarContentsProps {
    userTypeOptions: SelectOptionType[];
    protocolOptions: SelectOptionType[];
  }

  export interface ChangeReqAdvanceSearchProps extends BasicTabSearchBarContentsProps{
    requestStatusesOptions: SelectOptionType[];
  }
  export interface ChangeReqTabSearchProps extends BasicTabSearchBarContentsProps{
    userTypeOptions: SelectOptionType[];
    protocolOptions: SelectOptionType[];
    requestStatusesOptions: SelectOptionType[];
  }