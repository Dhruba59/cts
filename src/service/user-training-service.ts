import { TrainingMaterial 
} from "@/model/training";
import { request } from "./axios-config";


export const getTrainingMaterialById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'TrainingMaterial/GetById', method: 'GET', params});
}

export const getStudyProtocols = () => {
  return request({url: 'TrainingMaterial/study-protocol-dropdown', method: 'GET'});
}

export const getUserTrainings = () => {
  //const [key, params ] = queryKey as any;
  return request({url: 'UserTraining/trainings', method: 'GET'});
}

export const addTrainingMaterial = (data: TrainingMaterial) => {
  return request({url: 'TrainingMaterial', method: 'POST', data});
}

export const editTrainingMaterial = (data: TrainingMaterial) => {
  return request({url: 'TrainingMaterial', method: 'PUT', data});
} 

export const deleteTrainingMaterial = (data: any) => {
  return request({url: 'TrainingMaterial', method: 'DELETE', data});
}
