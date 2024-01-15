import { ChangeReqSubjectIdProps } from "./change-request";
import { Query } from "./query";

export interface Subject {
    internalSubjectID: number | null;
    userID: number | null;
    sponsorSubjectID: string | null;
    gender: string | null;
    partialID: string | null;
    firstNameInitials: string | null;
    middleNameInitials: string | null;
    lastNameInitials: string | null;
    nationalIDTypeName: string | null;
    iDType: number | null;
    dOB: string | null;
    zipcode: string | null;
    height: number | null;
    weight: number | null;
    creationDate: string | null;
    protocolID: string | null;
    siteStudyID: number | null;
    heigthUnit: string;
}

export interface SubjectQuery extends Subject, Query{

}
export interface SubjectHeader {
    subjectId: number;
    firstDateEntered: string;
    firstInit: string | null;
    gender: string | null;
    height: number;
    thirdInit: string | null;
    secondInit: string | null;
    siteName: string | null;
    protoColNumber: string | null;
    indicationDetails: string | null;
    social: string | null;
    nationalIdTypeName: string | null;
    userName: string | null;
    weight: number;
    heigthUnit: string | null;
    dateOfBirth: string;
    lastSubjectEntryDate: string;
    preScreen: boolean;
    isPartial: boolean;
    sponsorSubjectID: string | null;
}

export interface UserMatchType {
    userId: number;
    matchTypeName: number;
}

export interface Protocol {
    isPreScreen: boolean,
    protocolNumber: string;
    studyId: number;
    trainingIncomplete: boolean;
  }

  export interface SearchLastSubjectsParams {
    UserId?: string;
    StudyId?: string;
    SponsorSubjectId?: string;
    FirstInitial?: string;
    MiddleInitial?: string;
    LastInitial?: string;
    DateOfBirth?: string;
    FromDate?: string;
    ToDate?: string;
  }
  
  export interface LastReprintSubjectsParams extends Query{
    UserId?: string;
    StudyId?: string;
    UserName?: string;
    ProtocolNumber?: string;
    SponsorSubjectId?: string;
    FirstInitial?: string;
    MiddleInitial?: string;
    LastInitial?: string;
    DateOfBirth?: string;
    FromDate?: string;
    ToDate?: string;
  }

  export interface SubjectEntryEditForm {
    ids?: ChangeReqSubjectIdProps;
  }