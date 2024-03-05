import { TrainingMaterial 
} from "@/model/training";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getUserTrainings = () => {
  //const [key, params ] = queryKey as any;
  return requestAxios({url: 'UserTraining/trainings', method: 'GET'});
}

export const getUserTrainingCertificate = ({ queryKey }: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'UserTraining/certificate', method: 'GET', params});
}

export const getQuizByTrainingId = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Quiz/quiz-by-training-id', method: 'GET', params});
}

export const addQuizAnswer = (data: any) => {
  return requestAxios({url: 'Quiz/answer-quiz', method: 'POST', data});
}

// export const addTrainingMaterial = (data: TrainingMaterial) => {
//   return requestAxios({url: 'TrainingMaterial', method: 'POST', data});
// }

// export const editTrainingMaterial = (data: TrainingMaterial) => {
//   return requestAxios({url: 'TrainingMaterial', method: 'PUT', data});
// } 

// export const deleteTrainingMaterial = (data: any) => {
//   return requestAxios({url: 'TrainingMaterial', method: 'DELETE', data});
// }
