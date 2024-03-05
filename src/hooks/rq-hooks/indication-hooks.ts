
import { getIndications, getIndicationById, getIndicationCodeTypes, addIndication, editIndication, deleteIndication 
} from "@/service/indication-service";
import { useMutation, useQuery } from "react-query";

export const useGetIndications = (queryData : any) => useQuery({
  queryFn: getIndications,
  queryKey: ['indication', queryData],
  retry: false
})
export const useGetIndicationById = (id :any) => useQuery({
  queryFn: getIndicationById,
  queryKey: ['indication', { indicationId: id }],
  enabled: !!id,
  cacheTime: 0,
  retry: false
})

export const useGetIndicationCodeTypes = () => useQuery({
  queryFn: getIndicationCodeTypes,
  retry: false
})

export const useAddIndication = () => useMutation({
  mutationFn: addIndication,
})

export const useEditIndication = () => useMutation({
  mutationFn: editIndication,
})

export const useDeleteIndication = () => useMutation({
  mutationFn: deleteIndication
})
