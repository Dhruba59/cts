import { Indication, IndicationQuery } from "@/model/indication";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getIndicationById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Indication/GetById', method: 'GET', params});
}

export const getIndicationCodeTypes = () => {
  return requestAxios({url: 'Indication/GetIndicationCodeTypes', method: 'GET'});
}

export const getIndications = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Indication/Get', method: 'GET', params});
}

export const addIndication = (data: Indication) => {
  return requestAxios({url: 'Indication', method: 'POST', data});
}

export const editIndication = (data: Indication) => {
  return requestAxios({url: 'Indication', method: 'PUT', data});
} 

export interface DeleteIndicationPayload {
  id: number;
}
export const deleteIndication = (data: DeleteIndicationPayload) => {
  return requestAxios({url: 'Indication', method: 'DELETE', data});
}
