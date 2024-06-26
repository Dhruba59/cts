// import { TrainingMaterial } from "@/model/training";
import { request } from "./axios-config";

export const getUserTrainings = () => {
  //const [key, params ] = queryKey as any;
  return request({url: 'UserTraining/trainings', method: 'GET'});
}

export const getUserTrainingCertificate = ({ queryKey }: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'UserTraining/certificate', method: 'GET', params});
}

export const getQuizByTrainingId = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Quiz/quiz-by-training-id', method: 'GET', params});
}

export const addQuizAnswer = (data: any) => {
  return request({url: 'Quiz/answer-quiz', method: 'POST', data});
}

// export const addTrainingMaterial = (data: TrainingMaterial) => {
//   return request({url: 'TrainingMaterial', method: 'POST', data});
// }

// export const editTrainingMaterial = (data: TrainingMaterial) => {
//   return request({url: 'TrainingMaterial', method: 'PUT', data});
// } 

// export const deleteTrainingMaterial = (data: any) => {
//   return request({url: 'TrainingMaterial', method: 'DELETE', data});
// }
