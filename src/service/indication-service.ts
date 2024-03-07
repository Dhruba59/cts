import { Indication } from "@/model/indication";
import { request } from "./axios-config";

export const getIndicationById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Indication/GetById', method: 'GET', params});
}

export const getIndicationCodeTypes = () => {
  return request({url: 'Indication/GetIndicationCodeTypes', method: 'GET'});
}

export const getIndications = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Indication/Get', method: 'GET', params});
}

export const addIndication = (data: Indication) => {
  return request({url: 'Indication', method: 'POST', data});
}

export const editIndication = (data: Indication) => {
  return request({url: 'Indication', method: 'PUT', data});
} 

export interface DeleteIndicationPayload {
  id: number;
}
export const deleteIndication = (data: DeleteIndicationPayload) => {
  return request({url: 'Indication', method: 'DELETE', data});
}
