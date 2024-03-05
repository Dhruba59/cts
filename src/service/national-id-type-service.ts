import { NationalIdType, NationalIdTypeQuery, DeleteNationalIdTypePayload 
} from "@/model/national-id-type";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getNationalIdTypeById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'NationalIdType/GetById', method: 'GET', params});
}

export const getFrequencyTypes = () => {
  return requestAxios({url: 'NationalIdType/country-dropdown', method: 'GET'});
}

export const getNationalIdTypes = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'NationalIdType/Get', method: 'GET', params});
}

export const addNationalIdType = (data: NationalIdType) => {
  return requestAxios({url: 'NationalIdType', method: 'POST', data});
}

export const editNationalIdType = (data: NationalIdType) => {
  return requestAxios({url: 'NationalIdType', method: 'PUT', data});
} 


export const deleteNationalIdType = (data: DeleteNationalIdTypePayload) => {
  return requestAxios({url: 'NationalIdType', method: 'DELETE', data});
}
