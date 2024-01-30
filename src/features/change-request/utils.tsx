import { ChangeRequestReprintQuery } from "@/model/change-request";


export const changeRequestReprintDefaultValue: ChangeRequestReprintQuery = {
  regionGroup: null,
  siteId: null,    
  studyId: null,
  subjectId: '',
  firstInit: '',
  middleInit: '',
  lastInit: '',
  dateOfBirth: null,
  fromDate: null,
  toDate: null,
}