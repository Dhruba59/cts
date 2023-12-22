
import { getUserTrainings, getQuizByTrainingId 
} from "@/service/user-training-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetUserTrainings = () => useQuery({
  queryFn: getUserTrainings,
  queryKey: ['user-training'],
})
export const useGetQuizByTrainingId = (id :any) => useQuery({
  queryFn: getQuizByTrainingId,
  queryKey: ['TrainingId', { TrainingId: id }],
  enabled: !!id
})

export const useAddTrainingMaterial = () => useMutation({
  //mutationFn: addTrainingMaterial,
})

