
import { getIndications, getIndicationById, getIndicationCodeTypes, addIndication, editIndication, deleteIndication 
} from "@/service/indication-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetIndications = (queryData : any) => useQuery({
  queryFn: getIndications,
  queryKey: ['sort', queryData],
})
export const useGetIndicationById = (id :any) => useQuery({
  queryFn: getIndicationById,
  queryKey: ['indication', { indicationId: id }],
  enabled: !!id
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
