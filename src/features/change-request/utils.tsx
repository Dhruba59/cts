import { ChangeRequestReprintQuery } from "@/model/change-request";


export const changeRequestReprintDefaultValue = {
  RegionGroup: null,
  SiteId: null,    
  StudyId: null,
  SubjectId: null,
  FirstInit: null,
  MiddleInit: null,
  LastInit: null,
  DateOfBirth: {
    startDate: null,
    endDate: null,
  },
  FromDate: {
    startDate: null,
    endDate: null,
  },
  ToDate: {
    startDate: null,
    endDate: null,
  },
}