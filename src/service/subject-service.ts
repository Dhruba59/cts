import { API_ROUTE_CONSTANT } from "@/constants/api-route";
import { request } from "./axios-config";
import { AddUpdateStudyPayload, GetIndicationListParams, StudyDeletePayload } from "@/model/study";

interface NewSubjectPayload {
  UserId: string,
  SponsorSubjectID: string,
  ProtocolNumber: number,
  FirstNameInitials: string,
  MiddleNameInitial: string,
  LastNameInitials: string,
  IDType: number,
  PartialID: string,
  DateOfBirth: string,
  Height: number,
  Weight: number,
}

interface DetailRequirementPayload {
  StudyId: string;
}

interface ValidateSponsorSubjectPayload {
  studyId: string | number;
  sponsorSubjectId: string | number;
}

interface VerifySocialCode {
  SocialCode: string;
}

interface UpdateVisitInfo {
  studyId: number;
  protocolNumber: string;
  sponsorSubjectId: string;
  subjectId: number;
  nationalTypeId: number;
  visitTypeId: number;
  lastSubjectEntryDate: string;
}


export const getStudyType = () => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/get-study-types`, method: "get" });
};

export const getProtocolsByStudyId = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/get-protocols-by-study-type`, method: "get", params });
};

export const getAssignedProtocols = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/GetAssignedProtocols`, method: "get", params });
};

export const getProtocolByUserId = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/GetProtocolByUserId`, method: "get", params });
};

export const getSubjectDropdowns = () => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/get-necessary-dropdowns`, method: "get" });
};

export const addNewSubject = (data: NewSubjectPayload) => {
  return request({ url: API_ROUTE_CONSTANT.SUBJECT, method: "post", data });
};

export const checkDetailRequirement = (data: DetailRequirementPayload) => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/check-detail-requirement`, method: "post", data });
};

export const validateSponsorSubjectId = (data: ValidateSponsorSubjectPayload) => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/validate-sponsor-subject-id`, method: "post", data });
};

export const verifySocialCode = (data: VerifySocialCode) => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/verify-social-code`, method: "post", data });
};

export const updateVisitInfo = (data: UpdateVisitInfo) => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/update-visit-info`, method: "post", data });
};

export const searchLastSubjects = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/search-last-subjects`, method: "get", params });
};

export const getReprintMatchReports = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/GetReprintMatchReports`, method: "get", params });
};

export const getLastReprintSubjects = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/GetLastSubjectReprint`, method: "get", params });
};

export const getUsersDropdownList = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/get-user-dropdown`, method: "get", params });
};

export const getLastSubjectReport = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/last-subject-report`, method: "get", params });
};

// non pre-screen
export const getVisitTypes = () => {
  return request({ url: `${API_ROUTE_CONSTANT.SUBJECT}/visit-types`, method: "get" });
}
