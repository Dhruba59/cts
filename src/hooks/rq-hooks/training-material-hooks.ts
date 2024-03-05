
import { getTrainingMaterials, getTrainingMaterialById, 
  getStudyProtocols, addTrainingMaterial, editTrainingMaterial, deleteTrainingMaterial 
} from "@/service/training-material-service";
import { useMutation, useQuery } from "react-query";

export const useGetTrainingMaterials = (queryData : any) => useQuery({
  queryFn: getTrainingMaterials,
  queryKey: ['training', queryData],
  retry: false
})

export const useGetTrainingMaterialById = (id :any) => useQuery({
  queryFn: getTrainingMaterialById,
  queryKey: ['trainingId', { TrainingId: id }],
  enabled: !!id,
  cacheTime: 0,
  retry: false
})

export const useGetStudyProtocols = () => useQuery({
  queryFn: getStudyProtocols,
  retry: false
})

export const useAddTrainingMaterial = () => useMutation({
  mutationFn: addTrainingMaterial,
})

export const useEditTrainingMaterial = () => useMutation({
  mutationFn: editTrainingMaterial,
})

export const useDeleteTrainingMaterial = () => useMutation({
  mutationFn: deleteTrainingMaterial
})
