
import {
  getNationalIdTypes, getNationalIdTypeById, addNationalIdType,
  editNationalIdType, deleteNationalIdType, getFrequencyTypes
} from "@/service/national-id-type-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";



export const useGetNationalIdTypes = (queryData: any) => useQuery({
  queryFn: getNationalIdTypes,
  queryKey: ['sort', queryData],
})
export const useGetNationalIdTypeById = (id: any) => useQuery({
  queryFn: getNationalIdTypeById,
  queryKey: ['NationalIdType', { nationalTypeId: id }],
  enabled: !!id
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
