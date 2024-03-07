
import { TrainingCertificateQueryParams } from "@/model/training";
import { getUserTrainings, getQuizByTrainingId, addQuizAnswer, getUserTrainingCertificate 
} from "@/service/user-training-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

export const useGetUserTrainings = () => useQuery({
  queryFn: getUserTrainings,
  queryKey: ['user-training'],
  retry: false
})

export const useGetUserTrainingCertificate = (queryData: TrainingCertificateQueryParams) => useQuery({
  queryFn: getUserTrainingCertificate,
  queryKey: ['user-training-certificate', queryData],
  retry: false
})

export const useGetQuizByTrainingId = (trainigId :any) => useQuery({
  queryFn: getQuizByTrainingId,
  queryKey: ['trainigId', { TrainingId: trainigId }],
  enabled: !!trainigId,
  cacheTime: 0,
  retry: false
})

export const useAddQuizAnswer = () => useMutation({
  mutationFn: addQuizAnswer,
})

