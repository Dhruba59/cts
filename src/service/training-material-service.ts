import { DeleteTrainingMaterialPayload, TrainingMaterial, TrainingMaterialQuery 
} from "@/model/training-material";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getTrainingMaterialById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'TrainingMaterial/GetById', method: 'GET', params});
}

export const getStudyProtocols = () => {
  return requestAxios({url: 'TrainingMaterial/study-protocol-dropdown', method: 'GET'});
}

export const getTrainingMaterials = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'TrainingMaterial/Get', method: 'GET', params});
}

export const addTrainingMaterial = (data: TrainingMaterial) => {
  return requestAxios({url: 'TrainingMaterial', method: 'POST', data});
}

export const editTrainingMaterial = (data: TrainingMaterial) => {
  return requestAxios({url: 'TrainingMaterial', method: 'PUT', data});
} 

export const deleteTrainingMaterial = (data: DeleteTrainingMaterialPayload) => {
  return requestAxios({url: 'TrainingMaterial', method: 'DELETE', data});
}
