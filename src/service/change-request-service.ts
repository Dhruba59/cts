
import { request } from "./axios-config";

export const getRequestTypeDropdown = () => {
  //const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/request-type-dropdown', method: 'GET'});
}

export const getDashboardDropdown = () => {
  //const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/dashboard-dropdowns', method: 'GET'});
}

export const getChangeRequestReprint = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/reprint', method: 'GET', params});
}

export const getSubjectDetails = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/subject-details', method: 'GET', params});
}

export const getChangeRequestDashboard = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/dashboard', method: 'GET', params});
}

export const getChangeRequestDashboardDropdows = () => {
  return request({url: 'ChangeRequest/dashboard-dropdowns', method: 'GET'});
}

export const getChangeRequestReprintDropdowns = () => {
  return request({url: 'ChangeRequest/reprint-dropdowns', method: 'GET'});
}

export const getChangeRequestAudit = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/audit', method: 'GET', params});
}

export const getChangeRequestAuditDetail = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/audit-detail', method: 'GET', params});
}

export const getChangeRequestBySubject = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/by-subject', method: 'GET', params});
}

export const getIndicationCodeTypes = () => {
  return request({url: 'ChangeRequest/GetIndicationCodeTypes', method: 'GET'});
}

export const getIndications = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/Get', method: 'GET', params});
}

export const addChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest', method: 'POST', data});
}

export const changeOperation = (data: any) => {
  return request({url: 'ChangeRequest/change-operation', method: 'POST', data});
}

export const getChangeRequestVisitTypes = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/visit-types', method: 'GET' , params});
}

export const acceptChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest/accept', method: 'POST', data});
}
export const saveChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest/save', method: 'POST', data});
}

export const editChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest', method: 'PUT', data});
} 

export const rejectChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest/reject', method: 'DELETE', data});
}

export const viewChangeRequestDetail = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/view-detail', method: 'GET', params});
}

export const reprintMatchReportRequest = (data: any) => {
  return request({url: 'ChangeRequest/request-match-reprint', method: 'POST', data});
}