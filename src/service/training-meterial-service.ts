import { DeleteTrainingMeterialPayload, TrainingMeterial, TrainingMeterialQuery 
} from "@/model/training-meterial";
import { request } from "./axios-config";


export const getTrainingMeterialById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'TrainingMeterial/GetById', method: 'GET', params});
}

export const getStudyProtocols = () => {
  return request({url: 'TrainingMeterial/GetStudyProtocolDropdown', method: 'GET'});
}

export const getTrainingMeterials = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'TrainingMeterial/Get', method: 'GET', params});
}

export const addTrainingMeterial = (data: TrainingMeterial) => {
  return request({url: 'TrainingMeterial', method: 'POST', data});
}

export const editTrainingMeterial = (data: TrainingMeterial) => {
  return request({url: 'TrainingMeterial', method: 'PUT', data});
} 

export const deleteTrainingMeterial = (data: DeleteTrainingMeterialPayload) => {
  return request({url: 'TrainingMeterial', method: 'DELETE', data});
}
