import { StudyCompound, DeleteStudyCompoundPayload 
} from "@/model/study-compound";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getStudyCompoundById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'StudyCompound/GetById', method: 'GET', params});
}

export const getStudyCompounds = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'StudyCompound/Get', method: 'GET', params});
}

export const addStudyCompound = (data: StudyCompound) => {
  return requestAxios({url: 'StudyCompound', method: 'POST', data});
}

export const editStudyCompound = (data: StudyCompound) => {
  return requestAxios({url: 'StudyCompound', method: 'PUT', data});
} 


export const deleteStudyCompound = (data: DeleteStudyCompoundPayload) => {
  return requestAxios({url: 'StudyCompound', method: 'DELETE', data});
}
