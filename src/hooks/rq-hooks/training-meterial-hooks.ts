
import { getTrainingMeterials, getTrainingMeterialById, 
  getStudyProtocols, addTrainingMeterial, editTrainingMeterial, deleteTrainingMeterial 
} from "@/service/training-meterial-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetTrainingMeterials = (queryData : any) => useQuery({
  queryFn: getTrainingMeterials,
  queryKey: ['sort', queryData],
})
export const useGetTrainingMeterialById = (id :any) => useQuery({
  queryFn: getTrainingMeterialById,
  queryKey: ['TrainingMeterialId', { indicationId: id }],
  enabled: !!id
})

export const useAddTrainingMeterial = () => useMutation({
  mutationFn: addTrainingMeterial,
})


export const useTrainingMeterial = () => useMutation({
  mutationFn: editTrainingMeterial,
})

export const useGetIndicationCodeTypes = () => useQuery({
  queryFn: getStudyProtocols,
})

export const useDeleteIndication = () => useMutation({
  mutationFn: deleteTrainingMeterial
})
