
import {
  getNationalIdTypes, getNationalIdTypeById, addNationalIdType,
  editNationalIdType, deleteNationalIdType, getFrequencyTypes
} from "@/service/national-id-type-service";
import { useMutation, useQuery } from "react-query";

export const useGetNationalIdTypes = (queryData: any) => useQuery({
  queryFn: getNationalIdTypes,
  queryKey: ['nationalIdType', queryData],
  retry: false
})

export const useGetNationalIdTypeById = (id: any) => useQuery({
  queryFn: getNationalIdTypeById,
  queryKey: ['nationalIdType', { nationalTypeId: id }],
  enabled: !!id,
  cacheTime: 0,
  retry: false
})

export const useGetFrequencyTypes = () => useQuery('getFrequencyTypes',{
  queryFn: getFrequencyTypes,
  retry: false
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

