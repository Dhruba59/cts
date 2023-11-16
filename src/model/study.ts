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

export interface AddStudyPayload {
  protocolNumber: string;
  studyName: string;
  studyStartDate: string;
  studyEndDate: string;
  maxSubjects: number;
  sponsorId: number;
  studyType: string;
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
