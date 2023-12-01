
import { getIndications, getIndicationById, getIndicationCodeTypes, addIndication, editIndication, deleteIndication } from "@/service/indication-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetIndications = () => useQuery({
  queryFn: getIndications,
})
export const useGetIndicationById = () => useQuery({
  queryFn: getIndicationById,
})

export const useAddIndication = () => useMutation({
  mutationFn: addIndication,
})


export const useEditIndication = () => useMutation({
  mutationFn: editIndication,
})

export const useGetIndicationCodeTypes = () => useQuery({
  queryFn: getIndicationCodeTypes,
})

export const useDeleteIndication = () => useMutation({
  mutationFn: deleteIndication
})

// export const useGetStudyIndicationList = ( options: UseQueryOptions) => useQuery({
//   queryFn: getIndicationList,
//   ...options
// })