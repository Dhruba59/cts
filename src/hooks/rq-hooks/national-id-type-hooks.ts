
import { getNationalIdTypes, getNationalIdTypeById, addNationalIdType, 
  editNationalIdType, deleteNationalIdType, getFrequencyTypes 
} from "@/service/national-id-type-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";



export const useGetNationalIdTypes = () => useQuery({
  queryFn: getNationalIdTypes,
})
export const useNationalIdTypeById = () => useQuery({
  queryFn: getNationalIdTypeById,
})

export const useAddNationalIdType = () => useMutation({
  mutationFn: addNationalIdType,
})

export const useEditNationalIdType = () => useMutation({
  mutationFn: editNationalIdType,
})

export const useDeleteNationalIdType = () => useMutation({
  mutationFn: deleteNationalIdType
})

export const useGetFrequencyTypes = () => useQuery({
  queryFn: getFrequencyTypes,
})
