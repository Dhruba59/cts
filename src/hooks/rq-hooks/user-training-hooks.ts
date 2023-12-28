
import { getUserTrainings, getQuizByTrainingId, addQuizAnswer 
} from "@/service/user-training-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetUserTrainings = () => useQuery({
  queryFn: getUserTrainings,
  queryKey: ['user-training'],
})
export const useGetQuizByTrainingId = (trainigId :any) => useQuery({
  queryFn: getQuizByTrainingId,
  queryKey: ['trainigId', { TrainingId: trainigId }],
  enabled: !!trainigId
})

export const useAddQuizAnswer = () => useMutation({
  mutationFn: addQuizAnswer,
})

