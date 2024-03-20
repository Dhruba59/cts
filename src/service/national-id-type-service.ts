import { NationalIdType, DeleteNationalIdTypePayload 
} from "@/model/national-id-type";
import { request } from "./axios-config";

export const getNationalIdTypeById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'NationalIdType/GetById', method: 'GET', params});
}

export const getNidCountryDropdownOptions = () => {
  return request({url: 'NationalIdType/country-dropdown', method: 'GET'});
}

export const getNationalIdTypes = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'NationalIdType/Get', method: 'GET', params});
}

export const addNationalIdType = (data: NationalIdType) => {
  return request({url: 'NationalIdType', method: 'POST', data});
}

export const editNationalIdType = (data: NationalIdType) => {
  return request({url: 'NationalIdType', method: 'PUT', data});
} 

export const deleteNationalIdType = (data: DeleteNationalIdTypePayload) => {
  return request({url: 'NationalIdType', method: 'DELETE', data});
}
