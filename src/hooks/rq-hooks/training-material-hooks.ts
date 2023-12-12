
import { getTrainingMaterials, getTrainingMaterialById, 
  getStudyProtocols, addTrainingMaterial, editTrainingMaterial, deleteTrainingMaterial 
} from "@/service/training-material-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetTrainingMaterials = (queryData : any) => useQuery({
  queryFn: getTrainingMaterials,
  queryKey: ['sort', queryData],
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
