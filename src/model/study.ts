import { DropDownItem } from "./drop-down-list";
import { Query } from "./query";

export interface Study {
  studyId: number;
  protocolNumber: string | null;
  studyName: string;
  studyStartDate: string | null;
  studyEndDate: string | null;
  maxSubjects: number | null;
  sponsorId: number | null;
  phase: string | null;
  preScreen: boolean;
  active: boolean;
  studyCommentType: number;
  subjectIdentryFormat: string | null;
  sr: boolean;
  studyCompound: number;
  dSLSP: number;
  minAge: number | null;
  maxAge: number | null;
  minBmi: number | null;
  maxBmi: number | null;
  assignedSites: number[];
  inclusionCriteria: number[];
  exclusionCriteria: number[];
}

export interface StudyExtendedModel extends Study {
  iEParams: E_Param[];
}

export interface E_Param {
  parameterTypeID: number;
  parameterValue: string;
}
export interface StudyQuery extends Study, Query {}

export interface StudyDropdowns {
  sponsors: DropDownItem[];
  phases: DropDownItem[];
  commentTypes: DropDownItem[];
  studyCompounds: DropDownItem[];
  sites: DropDownItem[];
  indications: DropDownItem[];
}

export interface AddUpdateStudyPayload {
  studyId?: number;
  protocolNumber: string;
  studyName: string;
  studyStartDate: string;
  studyEndDate: string;
  maxSubjects: number;
  sponsorId: number;
  studyType?: string;
  phase: string;
  preScreen: boolean;
  active?: boolean;
  studyCommentType: number;
  subjectIdentryFormat?: string;
  sr: boolean;
  studyCompound: number;
  dslsp?: number;
  minAge?: number;
  maxAge?: number;
  minBmi?: number;
  maxBmi?: number;
  assignedSites: number[];
  inclusionCriteria: number[];
  exclusionCriteria: number[];
}

export interface CriticalDataType {
  bmi: {
    minValue: number;
    maxValue: number;
  };
  age: {
    minValue: number;
    maxValue: number;
  };
  dslsp: string;
}

export interface CriticalDndItem {
  value: string;
  name: string;
  code: string;
  codeType: string;
}

export interface CriticalDndDataType {
  title: string;
  items: Array<CriticalDndItem>;
}

export interface StudyListQueryData {
  PageNumber?: number;
  PageSize?: number;
  ProtocolNumber?: string;
  StudyName?: string;
  StudyStartDate?: string;
  StudyEndDate?: string;
  MaxSubjects?: number;
  SponsorId?: number;
  Phase?: string;
  PreScreen?: boolean;
  Active?: boolean;
  SubjectIdentryFormat?: string;
  Sr?: boolean;
  OrderBy?: string;
}

export interface StudyDeletePayload {
  studyId: number;
}

export type StuyListType = {
  protocol_number: string;
  study_name: string;
  start_date: string;
  end_date: string;
  max_subject: number;
  phase: string;
  preScreen: boolean;
  sr: boolean;
  active: boolean;
  studyId: number;
};


export interface StudyListColumnsProps {
  onDelete: (studyId: number) => void;
}

export interface GetIndicationListParams {
  SearchField: number;
  SearchValue: string;
}