
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "./query";

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

}
export interface ChangeRequestReprintQuery extends Query {
  regionGroup?: number;
  siteId?: number;
  siteStudyId?: number;
  subjectId?: string;
  firstInit?: string;
  middleInit?: string;
  lastInit?: string;
  dateOfBirth?: string;
  fromDate?: string;
  toDate?: string;
}

export interface CodeType {

  text: string;
  value: string;

}
  export interface getIndicationListProps {
    searchField: string;
    searchValue: string;
  }