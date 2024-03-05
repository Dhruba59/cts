import { StudyCompound, DeleteStudyCompoundPayload 
} from "@/model/study-compound";
import { request } from "./axios-config";


export const getStudyCompoundById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'StudyCompound/GetById', method: 'GET', params});
}

export const getStudyCompounds = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'StudyCompound/Get', method: 'GET', params});
}

export const addStudyCompound = (data: StudyCompound) => {
  return request({url: 'StudyCompound', method: 'POST', data});
}

export const editStudyCompound = (data: StudyCompound) => {
  return request({url: 'StudyCompound', method: 'PUT', data});
} 


export const deleteStudyCompound = (data: DeleteStudyCompoundPayload) => {
  return request({url: 'StudyCompound', method: 'DELETE', data});
}
