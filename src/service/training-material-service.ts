import { DeleteTrainingMaterialPayload, TrainingMaterial, TrainingMaterialQuery 
} from "@/model/training-material";
import { request } from "./axios-config";


export const getTrainingMaterialById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'TrainingMaterial/GetById', method: 'GET', params});
}

export const getStudyProtocols = () => {
  return request({url: 'TrainingMaterial/GetStudyProtocolDropdown', method: 'GET'});
}

export const getTrainingMaterials = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'TrainingMaterial/Get', method: 'GET', params});
}

export const addTrainingMaterial = (data: TrainingMaterial) => {
  return request({url: 'TrainingMaterial', method: 'POST', data});
}

export const editTrainingMaterial = (data: TrainingMaterial) => {
  return request({url: 'TrainingMaterial', method: 'PUT', data});
} 

export const deleteTrainingMaterial = (data: DeleteTrainingMaterialPayload) => {
  return request({url: 'TrainingMaterial', method: 'DELETE', data});
}
