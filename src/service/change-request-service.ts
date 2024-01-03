
import { request } from "./axios-config";


export const getChangeRequestReprint = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/reprint', method: 'GET', params});
}
export const getChangeRequestDashboard = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'ChangeRequest/dashboard', method: 'GET', params});
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

export const editChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest', method: 'PUT', data});
} 

export const deleteChangeRequest = (data: any) => {
  return request({url: 'ChangeRequest', method: 'DELETE', data});
}
