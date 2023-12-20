
import { getUserTrainings, getTrainingMaterialById, 
  getStudyProtocols, addTrainingMaterial, editTrainingMaterial, deleteTrainingMaterial 
} from "@/service/user-training-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetUserTrainings = () => useQuery({
  queryFn: getUserTrainings,
  queryKey: ['user-training'],
})
export const useGetTrainingMaterialById = (id :any) => useQuery({
  queryFn: getTrainingMaterialById,
  queryKey: ['TrainingId', { TrainingId: id }],
  enabled: !!id
})

export const useAddTrainingMaterial = () => useMutation({
  mutationFn: addTrainingMaterial,
})


export const useEditTrainingMaterial = () => useMutation({
  mutationFn: editTrainingMaterial,
})

export const useGetStudyProtocols = () => useQuery({
  queryFn: getStudyProtocols,
})

export const useDeleteTrainingMaterial = () => useMutation({
  mutationFn: deleteTrainingMaterial
})
